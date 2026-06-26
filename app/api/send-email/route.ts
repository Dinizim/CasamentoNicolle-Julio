import { Resend } from 'resend'
import { EmailTemplate } from './email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('📧 Recebido:', body)

    const { nome, email, codigo } = body

    if (!nome || !email || !codigo) {
      console.log('❌ Dados incompletos:', { nome, email, codigo })
      return Response.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const emailHtml = EmailTemplate({ nome, codigo })
    console.log('✅ Template gerado')

    const response = await resend.emails.send({
      from: 'convites@resend.dev',
      to: email,
      subject: 'Seu QR Code de Presença - Casamento Julio & Nicolle',
      html: emailHtml,
    })

    console.log('📨 Resposta Resend:', response)

    if (response.error) {
      console.error('❌ Erro Resend:', response.error)
      return Response.json(
        { error: response.error.message },
        { status: 500 }
      )
    }

    console.log('✅ Email enviado com sucesso para:', email)
    return Response.json(
      { success: true, message: 'Email enviado com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
