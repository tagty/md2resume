import { marked } from 'marked';
import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function convertMarkdownToPdf(
  inputPath: string,
  outputPath: string
): Promise<void> {
  // Markdownファイルを読み込み
  const markdown = await readFile(inputPath, 'utf-8');

  // MarkdownをHTMLに変換
  const content = await marked(markdown);

  // CSSテンプレートを読み込み
  const cssPath = join(__dirname, '../../templates/resume.css');
  const css = await readFile(cssPath, 'utf-8');

  // 完全なHTMLドキュメントを生成
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  ${content}
</body>
</html>
  `.trim();

  // Puppeteerを起動してPDFを生成
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // PDF生成オプション
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: false
    });

    console.log(`✅ PDF generated: ${outputPath}`);
  } finally {
    await browser.close();
  }
}
