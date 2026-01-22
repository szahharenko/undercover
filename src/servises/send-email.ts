// Define the shape of the data we send
export interface EmailPayload {
  email: string;
  name: string;
  data: Record<string, unknown>;
  type: 'trial' | 'registration' | 'contact' | 'other';
  message: string;
}

// Define the shape of the response we expect from the PHP API
export interface EmailResponse {
  message: string;
  status: 'success' | 'error';
}

export class EmailService {
  private static readonly API_URL = 'https://undercover.ee/api/send-email/';

  /**
   * Sends an email by calling the backend API.
   * * @param payload - The email details (recipient, subject, message)
   * @returns Promise resolving to the API response
   */
  public static async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': 'your-secret-key'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      return {
        status: 'success',
        message: data.message,
      };

    } catch (error) {
      console.error('EmailService Error:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown network error',
      };
    }
  }
}