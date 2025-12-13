# md2resume

Markdown形式で書いた職務経歴書を、プロフェッショナル仕様のPDFに変換するCLIツールです。

## 特徴

- 📝 **Markdownで職務経歴書を書ける** - シンプルなMarkdown記法で構造化された履歴書を作成
- 🎨 **技術職向けの洗練されたデザイン** - Notion や TechResume に近い現代的なスタイル
- 🖨️ **ATS対応** - 採用管理システムで正しくパースされる構造化PDF
- 🇯🇵 **日本語最適化** - Noto Sans JP フォント使用で美しい日本語表示
- ⚡ **高速変換** - Node.js + Puppeteer による高速なPDF生成
- 🎯 **カスタマイズ可能** - CSSテンプレートで自由にデザイン調整

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/tagty/md2resume.git
cd md2resume

# 依存パッケージをインストール
npm install

# TypeScriptをビルド
npm run build
```

## 使い方

### 基本的な使い方

```bash
md2resume <入力ファイル.md> <出力ファイル.pdf>
```

例:
```bash
node dist/bin/md2resume.js example.md my-resume.pdf
```

### サンプルで試す

プロジェクトには `example.md` というサンプルの職務経歴書が含まれています。

```bash
npm run build
node dist/bin/md2resume.js example.md output.pdf
```

生成された `output.pdf` を開いて確認してください。

## プロジェクト構成

```
md2resume/
├── src/
│   └── convert.ts          # メイン変換ロジック（Markdown → HTML → PDF）
├── bin/
│   └── md2resume.ts        # CLIエントリーポイント
├── templates/
│   └── resume.css          # 職務経歴書用CSSテンプレート
├── dist/                   # ビルド出力先（npm run build後に生成）
├── example.md              # サンプル職務経歴書
├── package.json            # プロジェクト設定
├── tsconfig.json           # TypeScript設定
└── README.md               # このファイル
```

## 開発

### ビルド

TypeScriptをコンパイルしてJavaScriptを生成します。

```bash
npm run build
```

### ウォッチモード

ファイル変更を監視して自動的に再ビルドします。開発時に便利です。

```bash
npm run dev
```

### ローカルでテスト

```bash
npm run build
node dist/bin/md2resume.js example.md test-output.pdf
```

## Markdown記法ガイド

### 見出し

```markdown
# 大見出し（氏名など）
## 中見出し（セクション名）
### 小見出し（会社名など）
```

### 箇条書き

```markdown
- 項目1
- 項目2
  - ネストされた項目
  - ネストされた項目
```

### 表

```markdown
| スキル | 経験年数 |
|--------|----------|
| JavaScript | 5年 |
| Python | 3年 |
```

### 強調

```markdown
**太字** で重要な情報を強調
*イタリック* で補足情報
```

### リンク

```markdown
[GitHub](https://github.com/username)
```

### コード

```markdown
`inline code` や

\`\`\`javascript
// コードブロック
const hello = "world";
\`\`\`
```

### 水平線

```markdown
---
```

## CSSカスタマイズ

`templates/resume.css` を編集することで、PDFのデザインを自由にカスタマイズできます。

### デフォルト設定

- **ページ余白**: 左右 15mm、上下 20mm（日本の履歴書に適した設定）
- **フォント**: Noto Sans JP（Google Fonts）
- **フォントサイズ**: 10pt
- **行間**: 1.7
- **カラースキーム**: 青系のアクセントカラー（#2563eb）

### カスタマイズ例

#### 見出しの色を変更

```css
h1 {
  border-bottom: 3px solid #10b981; /* 緑色に変更 */
}

h3 {
  border-left: 4px solid #10b981;
}
```

#### フォントサイズを調整

```css
body {
  font-size: 11pt; /* 少し大きく */
}
```

#### 余白を調整

`src/convert.ts` の PDF生成オプションを変更:

```typescript
await page.pdf({
  path: outputPath,
  format: 'A4',
  margin: {
    top: '25mm',    // 上余白
    right: '20mm',  // 右余白
    bottom: '25mm', // 下余白
    left: '20mm'    // 左余白
  },
  printBackground: true,
  preferCSSPageSize: false
});
```

## 技術スタック

- **Node.js**: >=18.0.0（ES modulesサポート）
- **TypeScript**: ^5.3.3（型安全な開発）
- **Puppeteer**: ^21.7.0（Chromiumベースのヘッドレスブラウザ、PDF生成）
- **marked**: ^11.1.1（Markdown → HTML 変換）
- **commander**: ^11.1.0（CLI構築）

## PDFの特徴

### ATS（採用管理システム）対応

生成されるPDFは、以下の点でATS対応しています：

- セマンティックなHTML構造（h1, h2, h3, section など）
- 適切な見出し階層
- 表形式データの構造化
- テキストベースの情報（画像化されていない）

### デザインの特徴

- **モダンで洗練されたスタイル** - Notion や TechResume に近いデザイン
- **技術職向けに最適化** - スキルセット、プロジェクト経験を見やすく表示
- **印刷時も美しい** - 印刷時の余白やページ区切りを最適化
- **視認性の高い情報設計** - 重要な情報が一目でわかるレイアウト

## トラブルシューティング

### Puppeteerのインストールに失敗する

Puppeteerは初回インストール時にChromiumをダウンロードします（約100MB）。ネットワーク環境によっては時間がかかる場合があります。

```bash
# Chromiumのダウンロードをスキップしてインストール
PUPPETEER_SKIP_DOWNLOAD=true npm install

# 後から手動でChromiumをインストール
npx puppeteer browsers install chrome
```

### フォントが表示されない

PDFにはGoogle Fontsの `Noto Sans JP` が使用されます。インターネット接続が必要です。

オフライン環境で使用する場合は、ローカルフォントを指定するようCSSを変更してください：

```css
body {
  font-family: 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, sans-serif;
}
```

### PDF生成に時間がかかる

初回実行時はChromiumの起動に5-10秒程度かかる場合があります。2回目以降は高速化されます。

### TypeScriptのビルドエラー

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

## ライセンス

MIT License

## 貢献

Pull RequestやIssueを歓迎します！

## 開発ロードマップ

- [ ] npm パッケージとして公開
- [ ] 複数のCSSテーマを選択可能にする
- [ ] カスタムフォントのサポート
- [ ] CLIオプションの追加（ページサイズ、余白設定など）
- [ ] GitHub Actionsでの自動PDF生成
