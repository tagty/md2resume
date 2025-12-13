#!/usr/bin/env node

import { Command } from 'commander';
import { convertMarkdownToPdf } from '../src/convert.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getVersion(): Promise<string> {
  const packageJsonPath = join(__dirname, '../../package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
  return packageJson.version;
}

async function main() {
  const version = await getVersion();

  const program = new Command();

  program
    .name('md2resume')
    .description('Convert Markdown resume to professional PDF')
    .version(version)
    .argument('<input>', 'Input Markdown file')
    .argument('<output>', 'Output PDF file')
    .action(async (input: string, output: string) => {
      try {
        await convertMarkdownToPdf(input, output);
      } catch (error) {
        console.error('❌ Error:', error instanceof Error ? error.message : error);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

main();
