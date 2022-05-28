import MailerSend, { Recipient, EmailParams } from 'mailersend';

const mailersend = new MailerSend({
  api_key: process.env.MAILERSEND_TOKEN,
});

export const sendEmailWithTemplate =  ({ email, name, substitutions, templateId }) => {
  const recipients = [new Recipient(email, name)];

  const variables = [
    {
      email: email,
      substitutions
    },
  ];

  const emailParams = new EmailParams()
    .setFrom('support@uproyek.com')
    .setFromName('Payrollkita via uproyek.com')
    .setRecipients(recipients)
    //.setSubject(subject)
    .setTemplateId(templateId)
    .setVariables(variables);

  try {
     mailersend.send(emailParams);
  } catch (e) {
    console.log(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
};