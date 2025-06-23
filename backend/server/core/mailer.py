import smtplib
import os
from email.message import EmailMessage
from server.core.config import Config
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()  # Garante que as variáveis de ambiente do .env sejam carregadas

def send_password_reset_email(to_email: str, temp_password: str):
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

    msg = EmailMessage()
    msg["Subject"] = "Redefinição de Senha"
    msg["From"] = Config.SMTP_USER
    msg["To"] = to_email

    html = f"""
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <title>Redefinição de Senha</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial, sans-serif; color:#374151;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px 0;">
        <tr>
        <td align="center">
            <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 40px 24px;">
            <tr>
                <td align="center" style="padding-bottom: 24px;">
                <h1 style="margin: 0; font-size: 26px; color: #dc2626; font-weight: 700;">Redefinição de Senha</h1>
                </td>
            </tr>
            <tr>
                <td style="font-size: 16px; line-height: 1.6; color: #374151;">
                <p style="margin: 0 0 16px;">Olá,</p>
                <p style="margin: 0 0 16px;">Recebemos uma solicitação para redefinir a sua senha.</p>
                <p style="margin: 0 0 16px;">Use a senha temporária abaixo para acessar sua conta:</p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 16px 0;">
                <p style="font-size: 22px; font-weight: bold; color: #111827; margin: 0;">{temp_password}</p>
                </td>
            </tr>
            <tr>
                <td style="font-size: 15px; line-height: 1.6; color: #374151; padding-bottom: 24px;">
                <p style="margin: 0;">Por motivos de segurança, recomendamos que você altere esta senha assim que fizer login no sistema.</p>
                </td>
            </tr>
            <tr>
                <td align="center">
                <a href="{frontend_url}/login" style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4f46e5;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                ">
                    Acessar sistema
                </a>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 32px; font-size: 12px; color: #9ca3af; text-align: center;">
                <p style="margin: 0;">Se você não solicitou esta redefinição, ignore este e-mail.</p>
                <p style="margin: 0;">© {datetime.now().year} Campeões. Todos os direitos reservados.</p>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
    """

    msg.set_content("Sua nova senha temporária: " + temp_password)
    msg.add_alternative(html, subtype="html")

    with smtplib.SMTP(Config.SMTP_HOST, Config.SMTP_PORT) as smtp:
        smtp.starttls()
        smtp.login(Config.SMTP_USER, Config.SMTP_PASS)
        smtp.send_message(msg)
