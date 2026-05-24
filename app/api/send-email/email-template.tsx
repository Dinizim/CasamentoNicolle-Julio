export function EmailTemplate({ nome, qrToken }: { nome: string; qrToken: string }): string {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrToken)}`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, #f8f5f0 0%, #e8e0d5 100%);
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(107, 79, 79, 0.2);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #6b4f4f 0%, #8b6f6f 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 36px;
      margin-bottom: 10px;
      font-weight: normal;
      letter-spacing: 2px;
    }
    .header p {
      font-size: 18px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 20px;
      text-align: center;
      color: #6b4f4f;
    }
    .greeting {
      font-size: 24px;
      margin-bottom: 20px;
      color: #6b4f4f;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
      color: #555;
    }
    .qr-section {
      margin: 30px 0;
      padding: 20px;
      background: #f8f5f0;
      border-radius: 10px;
    }
    .qr-section p {
      font-size: 14px;
      color: #777;
      margin-bottom: 15px;
    }
    .qr-image {
      display: inline-block;
      padding: 10px;
      background: white;
      border-radius: 8px;
      border: 2px solid #d4af37;
    }
    .qr-image img {
      display: block;
      width: 300px;
      height: 300px;
    }
    .details {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .details p {
      font-size: 15px;
      margin: 8px 0;
      color: #666;
    }
    .detail-label {
      color: #6b4f4f;
      font-weight: bold;
    }
    .footer {
      background: #f8f5f0;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 5px 0;
    }
    .emoji {
      font-size: 24px;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Julio & Nicolli</h1>
      <p>✨ Convite de Casamento ✨</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        Oi, ${nome}! <span class="emoji">💕</span>
      </div>
      
      <div class="message">
        <p>Que alegria saber que você confirmou sua presença!</p>
        <p>Seu QR Code está pronto para o grande dia.</p>
      </div>
      
      <div class="qr-section">
        <p><strong>Este é seu QR Code de Acesso:</strong></p>
        <div class="qr-image">
          <img src="${qrCodeUrl}" alt="QR Code de Presença">
        </div>
        <p style="margin-top: 15px; font-size: 12px; color: #999;">
          ⚠️ Não compartilhe este QR Code. É seu identificador único.
        </p>
      </div>
      
      <div class="details">
        <p><span class="detail-label">📅 Data:</span> 21 de Novembro de 2026</p>
        <p><span class="detail-label">⏰ Horário:</span> 16h</p>
        <p><span class="detail-label">📍 Local:</span> Casarão Gregory Reis</p>
      </div>
      
      <div style="margin-top: 30px; font-size: 18px;">
        <p>Mal podemos esperar para celebrar este momento especial com você!</p>
        <p style="margin-top: 10px;">
          <span class="emoji">🥂</span>
          <span class="emoji">💒</span>
          <span class="emoji">🎉</span>
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>Convite pessoal e intransferível</p>
      <p>Entrada apenas com QR Code</p>
      <p style="margin-top: 10px; color: #aaa;">
        Qualquer dúvida, entre em contato conosco.
      </p>
    </div>
  </div>
</body>
</html>
  `
}
