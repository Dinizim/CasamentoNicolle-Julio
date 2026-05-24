import nodemailer from 'nodemailer'
import { EmailTemplate } from './email-template'

const gmailUser = process.env.GMAIL_USER
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

const transporter = gmailUser && gmailAppPassword
  ? nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })
  : null

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { nome, email, qrToken } = body

    if (!nome || !email || !qrToken) {
      return Response.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    if (!transporter || !gmailUser) {
      return Response.json(
        { error: 'Configuração de Gmail ausente' },
        { status: 500 }
      )
    }

    const emailHtml = EmailTemplate({ nome, qrToken })

    await transporter.sendMail({
      from: `"Julio & Nicolle" <${gmailUser}>`,
      to: email,
      subject: 'Seu QR Code de Presença - Casamento Julio & Nicolle',
      html: emailHtml,
    })

    return Response.json(
      { success: true, message: 'Email enviado com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
