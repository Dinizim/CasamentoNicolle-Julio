import nodemailer from "nodemailer";
import { EmailTemplate } from "./email-template";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📧 Recebido:", body);

    const { nome, email, codigo } = body;

    if (!nome || !email || !codigo) {
      return Response.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const emailHtml = EmailTemplate({ nome, codigo });

    await transporter.sendMail({
  from: `"Julio & Nicolle" <${process.env.EMAIL_USER}>`,
  to: email,
  cc: "casamentojulionicolli@gmail.com",
  subject: "Seu Código de Presença - Casamento Julio & Nicolle",
  html: emailHtml,
});

    console.log("✅ Email enviado para:", email);

    return Response.json({
      success: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}