// Gera um PDF de convite para cada convidado de app/data/convidados.ts.
//
// Uso:
//   node scripts/gerar-convites.mjs [pasta-de-saida]
//
// Requer o Playwright com Chromium instalado (npm i -D playwright && npx playwright install chromium).
// Os arquivos saem como <Nome>_JN2026-<id>.pdf (ex.: Heloisa_JN2026-76.pdf).

import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { chromium } = require("playwright")

const saida = path.resolve(process.argv[2] ?? "convites")
fs.mkdirSync(saida, { recursive: true })

const fonte = fs.readFileSync(path.join(import.meta.dirname, "../app/data/convidados.ts"), "utf8")
const convidados = [...fonte.matchAll(/\{\s*id:\s*(\d+),\s*nome:\s*"([^"]+)"\s*\}/g)].map(
  (m) => ({ id: Number(m[1]), nome: m[2].trim() })
)

const exibir = (nome) => nome.charAt(0).toUpperCase() + nome.slice(1)
const arquivo = (nome, codigo) =>
  `${exibir(nome).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").replace(/\s+/g, "_")}_${codigo}.pdf`

const coracao = (cor, tam) =>
  `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" style="vertical-align:-3px"><path fill="${cor}" d="M12 21s-7.5-4.6-10-9.3C.3 8.2 2.3 4 6.2 4c2.3 0 3.8 1.3 4.8 2.8C12 5.3 13.5 4 15.8 4c3.9 0 5.9 4.2 4.2 7.7C19.5 16.4 12 21 12 21z"/></svg>`
const icone = {
  data: `<svg width="16" height="16" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="#fff" stroke="#c0392b" stroke-width="2"/><rect x="3" y="5" width="18" height="5" fill="#c0392b"/><rect x="7" y="2" width="2" height="5" rx="1" fill="#555"/><rect x="15" y="2" width="2" height="5" rx="1" fill="#555"/></svg>`,
  hora: `<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fff" stroke="#5b8bd6" stroke-width="2"/><path d="M12 7v5l3 2" stroke="#5b8bd6" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  local: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#e74c3c" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>`,
}

function html(nome, codigo) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
@page{size:A4;margin:0}
html,body{width:210mm;height:297mm;background:#f3ede4;font-family:Arial,Helvetica,sans-serif;color:#555}
.ola{text-align:center;color:#6b4f4f;font-size:30px;font-weight:bold;padding:24mm 0 10mm}
.card{width:150mm;margin:0 auto;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,.12)}
.topo{background:#6b4f4f;color:#fff;text-align:center;padding:34px 30px 42px}
.topo h1{font-family:Georgia,"Times New Roman",serif;font-size:40px;letter-spacing:2px;font-weight:bold}
.topo .sub{font-size:15px;letter-spacing:4px;margin-top:6px;opacity:.9}
.codigo{display:inline-block;margin-top:30px;background:#fff;border:3px dashed #d4af37;border-radius:14px;padding:16px 40px}
.codigo span{display:block;color:#c9a227;font-size:12px;letter-spacing:3px}
.codigo b{display:block;font-family:Georgia,"Times New Roman",serif;color:#6b4f4f;font-size:40px;margin-top:8px;letter-spacing:1px}
.corpo{padding:40px 50px 36px}
.msg{text-align:center;font-style:italic;font-size:17px;line-height:1.6;margin-bottom:32px}
.linha{display:flex;align-items:center;gap:14px;padding:15px 4px;border-bottom:1px solid #efe6d8;font-size:17px}
.linha:last-of-type{border-bottom:none}
.linha strong{color:#6b4f4f}
.aviso{margin-top:34px;background:#fff8e8;border-left:6px solid #d4af37;border-radius:8px;padding:24px 28px;text-align:center;font-size:15px;line-height:1.7}
.aviso h3{color:#6b4f4f;font-size:15px;letter-spacing:1px;margin-bottom:10px}
.rodape{border-top:1px solid #eee;text-align:center;padding:24px}
.rodape .n{font-family:Georgia,"Times New Roman",serif;color:#6b4f4f;font-size:19px}
.rodape .t{font-style:italic;color:#999;font-size:13px;margin-top:6px}
</style></head><body>
<div class="ola">Olá, ${exibir(nome)}! ${coracao("#f4c430", 30)}</div>
<div class="card">
  <div class="topo">
    <h1>Julio &amp; Nicolli</h1>
    <div class="sub">CONVITE DE CASAMENTO</div>
    <div class="codigo"><span>SEU CÓDIGO DE ENTRADA</span><b>${codigo}</b></div>
  </div>
  <div class="corpo">
    <p class="msg">Recebemos sua confirmação de presença e ficamos muito felizes em compartilhar esse momento especial com você!</p>
    <div class="linha">${icone.data}<span><strong>Data:</strong> 21 de Novembro de 2026</span></div>
    <div class="linha">${icone.hora}<span><strong>Horário:</strong> 16h00</span></div>
    <div class="linha">${icone.local}<span><strong>Local:</strong> Casarão Gregory Reis</span></div>
    <div class="aviso"><h3>IMPORTANTE</h3>Esse código é pessoal e intransferível. Ele será solicitado na entrada do evento.<br>Guarde este convite até o dia do casamento.</div>
  </div>
  <div class="rodape"><div class="n">Julio &amp; Nicolli ${coracao("#d4a017", 16)}</div><div class="t">Esperamos você para celebrar esse momento tão especial.</div></div>
</div>
</body></html>`
}

const browser = await chromium.launch()
const page = await browser.newPage()
for (const c of convidados) {
  const codigo = `JN2026-${c.id}`
  await page.setContent(html(c.nome, codigo))
  await page.pdf({ path: path.join(saida, arquivo(c.nome, codigo)), format: "A4", printBackground: true })
}
await browser.close()
console.log(`${convidados.length} convites gerados em ${saida}`)
