import * as React from 'react';

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export function EmailTemplate({ fullName, email, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>New message from {fullName}!</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Message:</strong> {message}</p>
    </div>
  );
}