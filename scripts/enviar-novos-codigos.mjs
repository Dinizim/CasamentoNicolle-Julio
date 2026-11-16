// Envia o aviso de atualização dos códigos de acesso para os convidados já confirmados.
//
// Uso:
//   EMAIL_USER=... EMAIL_PASS=... node scripts/enviar-novos-codigos.mjs destinatarios.csv [--enviar]
//
// destinatarios.csv (uma linha por convidado, com cabeçalho):
//   nome,email,codigo
//   Arlete,arlete@exemplo.com,1
//   Carol,carol@exemplo.com,24
//
// A coluna "codigo" é o número do convidado na lista (app/data/convidados.ts).
// Se ficar vazia, o script procura pelo nome (e para se o nome for repetido na lista).
// Sem --enviar, só mostra o que seria enviado (teste).

import fs from "node:fs"
import path from "node:path"
import nodemailer from "nodemailer"

const [arquivo, flag] = process.argv.slice(2)
const enviar = flag === "--enviar"
if (!arquivo) {
  console.error("Informe o arquivo CSV de destinatários.")
  process.exit(1)
}

const fonte = fs.readFileSync(path.join(import.meta.dirname, "../app/data/convidados.ts"), "utf8")
const convidados = [...fonte.matchAll(/\{\s*id:\s*(\d+),\s*nome:\s*"([^"]+)"\s*\}/g)].map(
  (m) => ({ id: Number(m[1]), nome: m[2] })
)

const linhas = fs.readFileSync(arquivo, "utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
linhas.shift()

const envios = []
for (const linha of linhas) {
  const [nome = "", email = "", codigo = ""] = linha.split(/[,;]/).map((s) => s.trim())
  let convidado
  if (codigo) {
    convidado = convidados.find((c) => c.id === Number(codigo))
  } else {
    const achados = convidados.filter((c) => c.nome.toLowerCase() === nome.toLowerCase())
    if (achados.length > 1) {
      console.error(`❌ "${nome}" aparece ${achados.length}x na lista (códigos ${achados.map((c) => c.id).join(", ")}). Preencha a coluna codigo.`)
      process.exit(1)
    }
    convidado = achados[0]
  }
  if (!convidado || !email.includes("@")) {
    console.error(`❌ Linha inválida ou convidado não encontrado: ${linha}`)
    process.exit(1)
  }
  envios.push({ nome: convidado.nome, email: email.toLowerCase(), codigo: `JN2026-${convidado.id}` })
}

function html({ nome, codigo }) {
  return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"></head>
<body style="background:#f7f3ec;font-family:Arial,Helvetica,sans-serif;padding:40px 20px;color:#555;margin:0">
<div style="max-width:650px;margin:auto;background:#fff;border-radius:20px;overflow:hidden">
<div style="background:#6b4f4f;padding:40px;text-align:center;color:#fff">
<h1 style="font-size:36px;font-weight:400;margin:0 0 8px">Julio &amp; Nicolli</h1>
<p style="margin:0;font-size:17px;opacity:.9">Atualização do código de acesso</p>
</div>
<div style="padding:40px;text-align:center;font-size:16px;line-height:1.8">
<h2 style="color:#6b4f4f;font-size:26px;margin:0 0 20px">Olá, queridos convidados! 💛</h2>
<p style="margin:0 0 18px">Devido à ausência de algumas pessoas na lista de convidados do nosso casamento, os códigos de acesso serão atualizados.</p>
<p style="margin:0 0 18px">Agradecemos pela compreensão e contamos com vocês para tornar esse momento ainda mais especial!</p>
<div style="margin:30px auto;padding:25px;border:2px dashed #d4af37;border-radius:15px;background:#faf8f3">
<span style="display:block;font-size:14px;color:#777;margin-bottom:10px">NOVO CÓDIGO DE ENTRADA — ${nome.toUpperCase()}</span>
<div style="font-size:40px;letter-spacing:4px;color:#6b4f4f;font-weight:bold">${codigo}</div>
</div>
<p style="margin:0;font-size:14px;color:#888">O código anterior não é mais válido. Guarde este e-mail até o dia do casamento.</p>
</div>
<div style="background:#f5f5f5;padding:25px;text-align:center;font-size:13px;color:#888">Julio &amp; Nicolli ❤️<br>21 de Novembro de 2026 · 16h00 · Casarão Gregory Reis</div>
</div></body></html>`
}

console.log(`${envios.length} e-mail(s):`)
for (const e of envios) console.log(`  ${e.nome.padEnd(14)} ${e.codigo.padEnd(11)} ${e.email}`)

if (!enviar) {
  console.log("\nTeste apenas. Rode de novo com --enviar para disparar.")
  process.exit(0)
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

let falhas = 0
for (const e of envios) {
  try {
    await transporter.sendMail({
      from: `"Julio & Nicolle" <${process.env.EMAIL_USER}>`,
      to: e.email,
      cc: "casamentojulionicolli@gmail.com",
      subject: "Novo Código de Acesso - Casamento Julio & Nicolle",
      html: html(e),
    })
    console.log(`✅ ${e.email}`)
  } catch (err) {
    falhas++
    console.error(`❌ ${e.email}: ${err.message}`)
  }
}
process.exit(falhas ? 1 : 0)
