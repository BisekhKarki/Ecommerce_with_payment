import * as React from "react";

interface EmailTemplateProps {
  username: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  email,
  phone,
  message,
}) => (
  <div>
    <h1>From, {username}!</h1>
    <p>Email: {email}</p>
    <p>Phone: {phone}</p>
    <p>Message: {message}</p>
  </div>
);
