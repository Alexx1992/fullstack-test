import { join } from 'path';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

async function createSnippet() {
  const mainPagePath = join(__dirname, './client/index.html');
  try {
    const mainPage = await readFile(mainPagePath, { encoding: 'utf-8' });
    const jsFile = execSync(
      `node_modules/.bin/esbuild --minify ${join(
        __dirname,
        './client/app.ts'
      )}`,
      {
        encoding: 'utf-8',
      }
    );
    const newMainPage = mainPage.replace(
      /<script\ssrc.*><\/script>/,
      `<script>${jsFile}</script>`
    );
    await writeFile(mainPagePath, newMainPage);
  } catch (err) {
    console.error('Error is happened during create snippet: ', err);
  }
}

createSnippet();
