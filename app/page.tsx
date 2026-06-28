"use client"

import { useState, useEffect } from "react"
import { convidados } from "./data/convidados"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [qrToken, setQrToken] = useState<string | null>(null)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)


  const [tempo, setTempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
  })

  useEffect(() => {
    const destino = new Date("2026-11-21T16:00:00").getTime()

    const intervalo = setInterval(() => {
      const agora = new Date().getTime()
      const diff = destino - agora

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutos = Math.floor((diff / (1000 * 60)) % 60)

      setTempo({ dias, horas, minutos, })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  async function handleConfirmar() {
  setErro("")
  setLoading(true)

  const nomeFormatado = nome.trim().toLowerCase()
  const emailFormatado = email.trim().toLowerCase()

  if (!nomeFormatado) {
    setErro("Digite seu nome")
    setLoading(false)
    return
  }

  if (!emailFormatado) {
    setErro("Digite seu email")
    setLoading(false)
    return
  }

  const convidado = convidados.find(
    (c) => c.nome.toLowerCase() === nomeFormatado
  )

  if (!convidado) {
    setErro("Você não está na lista de convidados ❌")
    setLoading(false)
    return
  }

  // Agora o QR é simplesmente o ID do convidado
  const qrToken = `JN2026-${convidado.id}`

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: convidado.nome,
        email: emailFormatado,
        codigo: qrToken,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      setErro(result.error)
      setLoading(false)
      return
    }

    setQrToken(qrToken)
  } catch {
    setErro("Erro ao enviar o email.")
  }

  setLoading(false)
}

  return (
  <main className="bg-[#F8F4EC] text-[#8A5A44]">

    {/* HERO */}
    <section
      className="h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/img/foto6.jpeg')",
      }}
    >
      <div className="w-full h-full bg-gradient-to-b from-[#8A5A44]/30 to-black/40 flex flex-col items-center justify-center px-6">

        <p className="uppercase tracking-[8px] text-[#F5E8D8] mb-4">
          Nosso Casamento
        </p>

        <h1 className="text-6xl md:text-8xl font-serif text-[#FFF8F1] drop-shadow-lg">
          Julio & Nicolli
        </h1>

        <p className="text-[#FDF8F1] text-xl mt-6">
          21 de Novembro de 2026 • 16h
        </p>

        {/* CONTAGEM */}
        <div className="flex flex-wrap justify-center gap-5 mt-10 mb-10">
          {Object.entries(tempo).map(([k, v]) => (
            <div
              key={k}
              className="bg-[#FFFDF9]/80 backdrop-blur-md border border-[#D7B16D] rounded-xl w-24 py-4 shadow-lg"
            >
              <p className="text-3xl font-bold text-[#B66A42]">{v}</p>
              <span className="uppercase text-xs tracking-widest text-[#A88A56]">
                {k}
              </span>
            </div>
          ))}
        </div>

        

      </div>
    </section>

    {/* HISTÓRIA */}
    <section className="py-28 px-6 text-center bg-[#FFFDF9]">

      <h2 className="text-5xl font-serif text-[#B66A42] mb-8">
        Nossa História
      </h2>

      <div className="w-24 h-[2px] bg-[#D7B16D] mx-auto mb-10"></div>

      <p className="max-w-3xl mx-auto leading-9 text-lg text-[#6B5B52]">
        Esse convite representa muito mais do que uma cerimônia. Ele marca o
        início de um dos capítulos mais importantes de nossas vidas.
        Queremos dividir esse momento com pessoas especiais, que fizeram parte
        da nossa caminhada e continuarão presentes em nossa história.
      </p>

    </section>

    {/* FOTO */}
    <section
  className="h-[75vh] bg-fixed bg-center bg-cover relative"
  style={{
    backgroundImage: "url('/img/Foto2.jpeg')",
  }}
>
  <div className="absolute inset-0 bg-black/45"></div>

  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

    <span className="uppercase tracking-[10px] text-[#E8C67A] text-sm mb-6">
      1 João 4:19
    </span>

    <h2 className="max-w-4xl text-5xl md:text-7xl font-serif text-white leading-tight drop-shadow-xl">
      Nós amamos
      <br />
      porque Ele nos amou primeiro.
    </h2>

    <div className="w-32 h-px bg-[#E8C67A] my-10"></div>

    <p className="text-[#F5EBDC] text-lg italic">
      Um amor fundamentado em Cristo.
    </p>

  </div>
</section>

    {/* PRESENTES */}
    <section className="py-28 text-center bg-[#F8F4EC] px-6">

      <h2 className="text-5xl font-serif text-[#B66A42] mb-6">
        Lista de Presentes
      </h2>

      <p className="text-lg text-[#6B5B52] mb-10">
        Caso deseje nos presentear, escolha um item exclusivamente pela nossa
        lista oficial da Havan.
      </p>

      <a
        href="https://lista.havan.com.br/Convidado/ItensListaPresente/890141"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#B66A42] hover:bg-[#9E5938] text-white px-8 py-4 rounded-full transition shadow-lg"
      >
        Ver Lista de Presentes
      </a>

    </section>

    {/* FOTO */}
    <section
      className="h-[70vh] bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/img/Foto3.jpeg')",
      }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black/25">

  <div className="text-center">

    <span className="text-[#E7C37A] tracking-[10px] uppercase text-sm">
      Save the Date
    </span>

    <h2 className="text-6xl font-serif text-white mt-6">
      21.11.2026
    </h2>

    <p className="text-2xl text-white/90 italic mt-6">
      "O amor nunca falha."
    </p>

    <div className="mt-10 w-40 h-px bg-[#E7C37A] mx-auto mb-10"></div>
    
    <button
          onClick={() => setModalOpen(true)}
          className="bg-[#B66A42] hover:bg-[#9E5938] text-white px-10 py-4 rounded-full shadow-xl transition duration-300"
        >
          Confirmar Presença
        </button>
       <p className="text-2xl text-[#E7C37A] italic mt-10">
       Confirme sua presença apenas se realmente puder compartilhar esse momento tão especial conosco.
</p>
  </div>

</div>
    </section>

    {/* CASAMENTO */}
    <section className="py-28 text-center px-6 bg-[#FFFDF9]">

      <h2 className="text-5xl font-serif text-[#B66A42] mb-8">
        O Local do Casamento
      </h2>

      <div className="space-y-3 text-lg text-[#6B5B52]">
        <p>📅 21 de Novembro de 2026</p>
        <p>⏰ 16h</p>
        <p>📍 Casarão Gregory Reis</p>
      </div>

      <iframe
        className="mx-auto mt-10 w-full max-w-3xl h-80 rounded-2xl shadow-xl"
        src="https://www.google.com/maps?q=Casarão+Gregory+Reis&output=embed"
      />

    </section>

    {/* RODAPÉ */}
    <footer className="bg-[#8A5A44] text-[#FFF8F1] py-16 text-center">

      <h2 className="text-3xl font-serif mb-6">
        Contato
      </h2>

      <p className="mb-2">📞 (12) 98100-2572</p>
      <p>📞 (12) 98826-7993</p>

      <div className="w-40 h-px bg-[#D7B16D] mx-auto my-8"></div>

      <p className="text-sm opacity-80">
        Convite pessoal e intransferível.
      </p>

      <p className="text-sm opacity-80">
        O código enviado por e-mail deverá ser apresentado na entrada do evento.
      </p>

    </footer>

    {/* MODAL */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

        <div className="bg-[#FFFDF9] rounded-2xl shadow-2xl w-full max-w-md p-8">

          {!qrToken ? (
            <>
              <h2 className="text-3xl text-center font-serif text-[#B66A42] mb-6">
                Confirmar Presença
              </h2>

              <input
                placeholder="Nome Completo (igual do convite)"
                className="w-full border border-[#D7B16D] rounded-lg p-3 mb-4"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <input
                placeholder="Seu melhor e-mail"
                className="w-full border border-[#D7B16D] rounded-lg p-3 mb-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleConfirmar}
                disabled={loading}
                className="w-full bg-[#B66A42] hover:bg-[#9E5938] text-white py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Confirmar Presença"}
              </button>

              {erro && (
                <p className="text-red-600 mt-4 text-center">{erro}</p>
              )}
            </>
          ) : (
            <div className="text-center">

              <h2 className="text-3xl text-[#4CAF50] font-serif mb-4">
                Presença Confirmada ❤️
              </h2>

              <p className="text-[#6B5B52]">
                Seu código foi enviado para o e-mail informado.
              </p>

              <p className="mt-4 text-sm text-[#8A5A44]">
                Verifique também sua caixa de spam.
              </p>

            </div>
          )}

        </div>

      </div>
    )}

  </main>
)
}