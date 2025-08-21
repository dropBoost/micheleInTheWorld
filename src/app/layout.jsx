import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
});

export const metadata = {
  title: "GESTIONE ORDINI Michele in the World",
  description: "powered by dropboost.it",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={`${fredoka.className}`}>
        {children}
      </body>
    </html>
  );
}
