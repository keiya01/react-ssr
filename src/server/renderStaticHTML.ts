type Tags = {
  title: string;
  meta: string;
  body: string;
  styles: string;
  preloadedState: string;
  nonce: string;
  scripts: string;
};

const escape = (str: string) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export default function renderStaticHTML({
  title,
  meta,
  body,
  styles,
  scripts,
  preloadedState,
  nonce
}: Tags) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Description" content="Sample React SSR">
        <meta property="csp-nonce" content="${nonce}">
        ${meta}
        ${title}
        <link rel="manifest" href="/manifest.webmanifest">
        <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet">
        ${styles}
      </head>
      <body>
        ${body}
        <script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(
    preloadedState
  )}"></script>
        ${scripts}
      </body>
    </html>
  `.trim();
}
