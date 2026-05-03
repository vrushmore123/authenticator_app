import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Premium Auth System",
  description: "Secure and modern authentication system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <div className="bg-mesh" />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#f8fafc',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
            },
          }}
        />
        <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
