using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Device_Store.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(string toEmail, string subject, string content);
    }

    public class SendGridMailService : IMailService
    {
        private readonly IConfiguration _configuration;

        public SendGridMailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string content)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("DeviceStore.com", "DEVICESTORE.COM"));
            emailMessage.To.Add(new MailboxAddress("", toEmail));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = content
            };

            using (var client = new SmtpClient())
            {
                var password = _configuration["PasswordForEmail"];

                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate("devicestore60@gmail.com", password);
                client.Send(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
