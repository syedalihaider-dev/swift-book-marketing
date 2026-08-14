import { Cormorant_Garamond, Manrope, Alex_Brush } from "next/font/google";

export const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Signature/script accent — used for the author name treatment in Portfolio.
export const signatureFont = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
  weight: ["400"],
});