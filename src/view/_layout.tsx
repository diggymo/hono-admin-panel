import type { FC } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";

export const Layout: FC<{ title: string; children: JSX.Element }> = (props) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 min-h-screen py-8">{props.children}</body>
    </html>
  );
};
