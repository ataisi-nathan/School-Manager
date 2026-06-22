import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  const emailData = await getEmailDataFromRequest(request);
  const { name, email, message } = emailData;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplate({ fullName: name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function getEmailDataFromRequest(request: Request): Promise<EmailData> {
  const formData = await request.formData();

  return {
    name: typeof formData.get('name') === 'string' ? formData.get('name') as string : '',
    email: typeof formData.get('email') === 'string' ? formData.get('email') as string : '',
    message: typeof formData.get('message') === 'string' ? formData.get('message') as string : '',
  };
}
