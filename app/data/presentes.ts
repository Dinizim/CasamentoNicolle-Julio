export const PIX_CHAVE = "12982908407"
// Nome e cidade do recebedor exibidos no app do banco (máx. 25 e 15 caracteres, sem acento)
export const PIX_NOME = "JULIO E NICOLLI"
export const PIX_CIDADE = "SAO PAULO"

export type Presente = {
  descricao: string
  valor: number
  emoji: string
  // Imagem opcional em /public (ex: "/img/presentes/buque.jpg")
  imagem?: string
}

export const presentes: Presente[] = [
  { descricao: "Toma aqui uns 50 reais", valor: 50, emoji: "💸", imagem: "/img/presentes/1.jpg" },
  { descricao: "Só para não dizer que eu não dei nada", valor: 100, emoji: "🤷", imagem: "/img/presentes/2.jpg" },
  { descricao: "Lenço para a noiva não borrar a maquiagem", valor: 200, emoji: "😭", imagem: "/img/presentes/3.jpg" },
  { descricao: "Uma calça para uma jovem de 16 anos", valor: 300, emoji: "👖", imagem: "/img/presentes/4.jpg" },
  { descricao: "Aumente suas chances de pegar o buquê", valor: 400, emoji: "💐", imagem: "/img/presentes/5.jpg" },
  { descricao: "Primeiro lugar na fila do buffet", valor: 500, emoji: "🍝", imagem: "/img/presentes/6.jpg" },
  { descricao: "1 ano de corte de cabelo do noivo", valor: 600, emoji: "💈", imagem: "/img/presentes/7.jpg" },
  { descricao: "Psicólogo para os noivos não surtarem nos preparativos", valor: 700, emoji: "🧠", imagem: "/img/presentes/8.jpg" },
  { descricao: "Ajuda para pagar os boletos do casamento", valor: 800, emoji: "🧾", imagem: "/img/presentes/9.jpg" },
  { descricao: "Levar alguém que não foi convidado", valor: 900, emoji: "🙊", imagem: "/img/presentes/10.jpg" },
  { descricao: "Claro que posso pagar esse presente, meu marido tem dois empregos", valor: 1000, emoji: "💅", imagem: "/img/presentes/11.jpg" },
  { descricao: "Dei o melhor presente", valor: 1100, emoji: "🤑", imagem: "/img/presentes/12.jpg" },
]

export function formatarValor(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// Gera o "PIX copia e cola" (BR Code) com o valor já preenchido
export function gerarPixPayload(valor: number) {
  const campo = (id: string, conteudo: string) =>
    id + conteudo.length.toString().padStart(2, "0") + conteudo

  const chave = PIX_CHAVE.startsWith("+") ? PIX_CHAVE : `+55${PIX_CHAVE}`

  const payload =
    campo("00", "01") +
    campo("26", campo("00", "br.gov.bcb.pix") + campo("01", chave)) +
    campo("52", "0000") +
    campo("53", "986") +
    campo("54", valor.toFixed(2)) +
    campo("58", "BR") +
    campo("59", PIX_NOME) +
    campo("60", PIX_CIDADE) +
    campo("62", campo("05", "***")) +
    "6304"

  return payload + crc16(payload)
}

function crc16(texto: string) {
  let crc = 0xffff
  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0")
}
