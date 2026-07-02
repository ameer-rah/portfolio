import { Component, ErrorInfo, ReactNode } from "react";
import { sendErrorReport } from "../services/emailService";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  email: string;
  message: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      email: "",
      message: "",
      isSubmitting: false,
      isSubmitted: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    this.setState({ isSubmitting: true });

    try {
      await sendErrorReport({
        email: this.state.email,
        message: this.state.message,
        errorMessage: this.state.error?.message || "Unknown error",
        errorStack: this.state.error?.stack || "No stack trace",
        componentStack:
          this.state.errorInfo?.componentStack || "No component stack",
        userAgent: navigator.userAgent,
        url: window.location.href,
      });

      this.setState({ isSubmitted: true, isSubmitting: false });
    } catch (error) {
      console.error("Failed to submit error report:", error);
      this.setState({ isSubmitting: false });
    }
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-paper p-5 text-ink">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Something went wrong.
            </h2>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-stone-600">
              Try refreshing the page. If you have a moment, sending a quick
              report helps me fix it.
            </p>

            {this.state.isSubmitted ? (
              <div className="rounded-xl bg-brg-soft p-5 text-center">
                <p className="font-medium text-brg">Thanks for the report.</p>
                <p className="mt-1 text-sm text-stone-600">
                  I'll look into this as soon as possible.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="mt-4 rounded-lg bg-brg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brg-mid"
                >
                  Return home
                </button>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                  >
                    Your email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="w-full rounded-lg border border-stone-300 bg-white p-2 text-sm focus:border-brg"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium"
                  >
                    What were you doing when the error occurred?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-stone-300 bg-white p-2 text-sm focus:border-brg"
                    placeholder="I was trying to..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={this.state.isSubmitting}
                  className="w-full rounded-lg bg-brg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brg-mid disabled:opacity-50"
                >
                  {this.state.isSubmitting ? "Submitting..." : "Submit report"}
                </button>

                <p className="text-xs text-stone-500">
                  Error details are included automatically with your report.
                </p>
              </form>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
