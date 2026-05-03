import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Premium Auth System",
  description: "Secure and modern authentication system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Toaster position="top-center" />
        <main className="min-h-screen flex items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
