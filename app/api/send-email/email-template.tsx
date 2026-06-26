export function EmailTemplate({
  nome,
  codigo,
}: {
  nome: string
  codigo: string
}): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">

<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:#f7f3ec;
font-family:Arial, Helvetica, sans-serif;
padding:40px 20px;
color:#555;
}

.container{
max-width:650px;
margin:auto;
background:white;
border-radius:20px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
background:#6b4f4f;
padding:45px;
text-align:center;
color:white;
}

.header h1{
font-size:40px;
font-weight:400;
margin-bottom:10px;
}

.header p{
font-size:18px;
opacity:.9;
}

.content{
padding:45px;
text-align:center;
}

.content h2{
color:#6b4f4f;
margin-bottom:20px;
font-size:28px;
}

.content p{
font-size:16px;
line-height:1.8;
margin-bottom:18px;
}

.codigo{
margin:35px auto;
padding:25px;
border:2px dashed #d4af37;
border-radius:15px;
background:#faf8f3;
}

.codigo span{
display:block;
font-size:14px;
color:#777;
margin-bottom:10px;
}

.codigo h1{
font-size:42px;
letter-spacing:4px;
color:#6b4f4f;
}

.info{
margin-top:35px;
padding-top:30px;
border-top:1px solid #eee;
text-align:left;
}

.info p{
margin:10px 0;
}

.aviso{
margin-top:35px;
padding:20px;
background:#fff8e8;
border-left:5px solid #d4af37;
border-radius:8px;
font-size:15px;
}

.footer{
background:#f5f5f5;
padding:25px;
text-align:center;
font-size:13px;
color:#888;
}
</style>

</head>

<body>

<div class="container">

<div class="header">
<h1>Julio & Nicolli</h1>
<p>Convite de Casamento</p>
</div>

<div class="content">

<h2>Olá, ${nome}! 💛</h2>

<p>
Recebemos sua confirmação de presença.
Estamos muito felizes em compartilhar esse momento especial com você.
</p>

<div class="codigo">

<span>SEU CÓDIGO DE ENTRADA</span>

<h1>${codigo}</h1>

</div>

<div class="info">

<p><strong>📅 Data:</strong> 21 de Novembro de 2026</p>

<p><strong>🕓 Horário:</strong> 16h00</p>

<p><strong>📍 Local:</strong> Casarão Gregory Reis</p>

</div>

<div class="aviso">

<strong>Importante</strong>

<br><br>

Esse código é pessoal e intransferível.

Ele será solicitado na entrada do evento.

Guarde este e-mail até o dia do casamento.

</div>

</div>

<div class="footer">

Julio & Nicolli ❤️

<br><br>

Esperamos você para celebrar esse momento tão especial.

</div>

</div>

</body>

</html>
`
}