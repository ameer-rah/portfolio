import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_1fzmpoj";
const TEMPLATE_ID = "template_zznl7en";
const PUBLIC_KEY = "reg5OKtUoEIjd_ss4";

interface ErrorReportData {
  email: string;
  message: string;
  errorMessage: string;
  errorStack: string;
  componentStack: string;
  userAgent: string;
  url: string;
}

export const sendErrorReport = async (data: ErrorReportData): Promise<void> => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        message: data.message,
        error_message: data.errorMessage,
        error_stack: data.errorStack,
        component_stack: data.componentStack,
        user_agent: data.userAgent,
        url: data.url,
      },
      PUBLIC_KEY,
    );
  } catch (error) {
    console.error("Failed to send error report:", error);
    throw error;
  }
};
