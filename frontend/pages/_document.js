import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-neutral-100 p-4 md:p-16 flex flex-col items-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
