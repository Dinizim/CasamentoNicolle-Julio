"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

export default function Seguranca() {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [status, setStatus] = useState<"idle" | "success">("idle")
  const [codigo, setCodigo] = useState<string | null>(null)

  useEffect(() => {
    if (status === "success") return

    const scanner = new Html5Qrcode("reader")
    scannerRef.current = scanner

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      async (decodedText) => {
        console.log("QR LIDO:", decodedText)

        // simula validação no banco
        await new Promise((resolve) => setTimeout(resolve, 800))

        setCodigo(decodedText)
        setStatus("success")

        if (scannerRef.current) {
          scannerRef.current.stop().catch(() => {})
        }
      },
      () => {}
    )

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [status])

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: status === "success" ? "#16a34a" : "#111",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {status === "idle" && (
        <>
          <h1>Leitor de QR Code</h1>
          <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
        </>
      )}

      {status === "success" && (
        <>
          <h1 style={{ fontSize: "40px" }}>✅ ENTRADA LIBERADA</h1>
          <p style={{ fontSize: "20px" }}>QR LIDO COM SUCESSO</p>
          <p style={{ marginTop: "20px" }}>
            Código: <strong>{codigo}</strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            Validado no banco com sucesso
          </p>
        </>
      )}
    </div>
  )
}