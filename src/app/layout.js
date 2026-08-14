import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { bodyFont, headingFont, signatureFont } from "./fonts";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import ScrollAnimations from "@/components/common/ScrollAnimations/ScrollAnimations";

export const metadata = {
  metadataBase: new URL("https://www.swiftbookmarketing.com"),
  canonical: "/",

  title: "Swift Book Marketing",
  description: "Swift Book Marketing provides professional book marketing services to help authors promote their books and reach more readers.",

   robots: {
    index: false,
    follow: false,
  },
   openGraph: {
    title: "Swift Book Marketing",
    description: "Swift Book Marketing provides professional book marketing services to help authors promote their books and reach more readers.",
    url: "https://swiftbookmarketing.com",
    siteName: "Swift Book Marketing",
    images: [
      {
        url: "https://swiftbookmarketing.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swift Book Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Book Marketing",
    description: "Swift Book Marketing provides professional book marketing services to help authors promote their books and reach more readers.",
    images: ["https://swiftbookmarketing.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs synchronously before first paint so [text-split]/[fade-up] */}
        {/* elements can start hidden in CSS with no flash of unstyled text. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className={`${bodyFont.variable} ${headingFont.variable} ${signatureFont.variable}`}>
        <Header />
        <main>
        {children}
        </main>
        <Footer />
        <ScrollAnimations />
      </body>
    </html>
  );
}
