"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import QRCode from "react-qr-code"

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
    segundos: 0,
  })

  useEffect(() => {
    const destino = new Date("2026-11-21T16:00:00").getTime()

    const intervalo = setInterval(() => {
      const agora = new Date().getTime()
      const diff = destino - agora

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutos = Math.floor((diff / (1000 * 60)) % 60)
      const segundos = Math.floor((diff / 1000) % 60)

      setTempo({ dias, horas, minutos, segundos })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  async function handleConfirmar() {
    setErro("")
    setLoading(true)

    const nomeFormatado = nome.trim().toLowerCase()
    const emailFormatado = email.trim().toLowerCase()

    const { data } = await supabase
      .from("convidados")
      .select("*")
      .ilike("nome", nomeFormatado)
      .maybeSingle()

    if (!data) {
      setErro("Você não está na lista ❌")
      setLoading(false)
      return
    }

    let token = data.qr_token

    if (data.confirmado && data.qr_token) {
      setQrToken(data.qr_token)
    } else {
      token = crypto.randomUUID()

      await supabase
        .from("convidados")
        .update({
          confirmado: true,
          qr_token: token,
          email: emailFormatado,
        })
        .eq("id", data.id)
    }

    // Enviar email com QR Code
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: emailFormatado || data.email,
          qrToken: token,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        setErro(result.error || "Não foi possível enviar o email")
      }
    } catch {
      setErro("Erro ao tentar enviar o email")
    }

    setQrToken(token)
    setLoading(false)
  }

  return (
  <main className="bg-[#f8f5f0] text-[#6b4f4f]">

    {/* HERO */}
    <section
      className="h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-center"
      style={{
  backgroundImage: "url('/img/Foto1.jpeg')",
}}
    >
      <div className="bg-black/40 w-full h-full flex flex-col items-center justify-center px-6">
        <h1 className="text-6xl font-serif text-white mb-6">
          Julio & Nicolli
        </h1>

        <p className="text-white mb-6">
          21 de Novembro de 2026 • 16h
        </p>

        {/* CONTAGEM */}
        <div className="flex gap-4 mb-8">
          {Object.entries(tempo).map(([k, v]) => (
            <div key={k} className="bg-white/20 backdrop-blur px-4 py-2 rounded text-white">
              <p className="text-xl font-bold">{v}</p>
              <span className="text-xs uppercase">{k}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Confirmar Presença
        </button>
      </div>
    </section>

    {/* HISTÓRIA */}
    <section className="py-24 text-center px-6">
      <h2 className="text-4xl mb-6 font-serif">Nossa História</h2>
      <p className="max-w-2xl mx-auto text-lg">
        Esse convite é mais que especial… é o início de um dos dias mais importantes
        da nossa vida. Queremos você presente para celebrar esse momento único,
        cheio de amor, alegria e significado.
      </p>
    </section>

    {/* PARALLAX 1 */}
    <section
      className="h-[60vh] bg-fixed bg-center bg-cover"
      style={{
  backgroundImage: "url('/img/Foto2.jpeg')",
}}
    >
      <div className="bg-black/30 w-full h-full flex items-center justify-center">
        <h2 className="text-white text-3xl font-serif">
          Um momento único ✨
        </h2>
      </div>
    </section>

    {/* PRESENTES */}
    <section className="py-24 text-center">
      <h2 className="text-4xl mb-6 font-serif">Lista de Presentes</h2>

      <p className="mb-4">
        Escolha seu presente exclusivamente pelo link oficial:
      </p>

      <a
        href="#"
        className="border border-[#d4af37] px-6 py-3 rounded hover:bg-[#d4af37] hover:text-white transition"
      >
        Ver Lista na Havan
      </a>
    </section>

    {/* PARALLAX 2 */}
    <section
      className="h-[60vh] bg-fixed bg-center bg-cover"
      style={{
      backgroundImage: "url('/img/Foto3.jpeg')",
}}
    >
      <div className="bg-black/30 w-full h-full flex items-center justify-center">
        <h2 className="text-white text-3xl font-serif">
          Esperamos você ❤️
        </h2>
      </div>
    </section>

    {/* CASAMENTO */}
    <section className="py-24 text-center px-6">
      <h2 className="text-4xl mb-6 font-serif">O Casamento</h2>

      <p>📅 21/11/2026</p>
      <p>⏰ 16h</p>
      <p>📍 Casarão Gregory Reis</p>

      <iframe
        className="mx-auto mt-6 w-full max-w-xl h-64 rounded"
        src="https://www.google.com/maps?q=Casarão+Gregory+Reis&output=embed"
      />
    </section>

    {/* RODAPÉ / CONTATO */}
    <footer className="bg-[#6b4f4f] text-white py-12 text-center">
      <h2 className="text-2xl mb-4 font-serif">Contato</h2>

      <p>📞 (12) 98100-2572</p>
      <p>📞 (12) 98826-7993</p>

      <p className="mt-6 text-sm opacity-70">
        Convite pessoal e intransferível • Entrada apenas com QR Code
      </p>
    </footer>

    {/* MODAL (mantém o seu) */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white text-black p-8 rounded-xl w-full max-w-md">

          {!qrToken ? (
            <>
              <h2 className="text-xl mb-4">Confirmar Presença</h2>

              <input
                placeholder="Nome"
                className="border p-2 w-full mb-3"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <input
                placeholder="Email"
                className="border p-2 w-full mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleConfirmar}
                disabled={loading}
                className="bg-black text-white w-full py-2 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Confirmar"}
              </button>

              {erro && <p className="text-red-500 mt-2">{erro}</p>}
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-600">Confirmado ✅</p>
              <QRCode value={qrToken} />
              <p className="text-sm mt-2">
                Apresente este QR Code na entrada
              </p>
            </div>
          )}

        </div>
      </div>
    )}
  </main>
)
}