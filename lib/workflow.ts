import config from "./config";
import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qStashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

interface EmailParams {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ email, subject, message }: EmailParams) => {
  await qStashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend.token }),
    },
    body: {
      from: "Deepanshu <contact@deepanshumehra.site>",
      to: [email],
      subject,
      html: message,
    },
  });
};
