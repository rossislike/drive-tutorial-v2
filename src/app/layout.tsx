import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Drive Clone",
  description: "A Google Drive clone UI built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
