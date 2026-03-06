#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read monospecs.yaml
const configPath = path.join(__dirname, '..', 'monospecs.yaml');
const configContent = fs.readFileSync(configPath, 'utf8');

// Parse YAML-like config (simple parsing for this use case)
const repositories = [];
const lines = configContent.split('\n');
let inRepositories = false;

for (const line of lines) {
  if (line.trim() === 'repositories:') {
    inRepositories = true;
    continue;
  }

  if (inRepositories) {
    const pathMatch = line.match(/^\s*path:\s*"(.+)"\s*$/);
    const urlMatch = line.match(/^\s*url:\s*"(.+)"\s*$/);

    if (pathMatch) {
      const currentRepo = { path: pathMatch[1] };
      repositories.push(currentRepo);
    } else if (urlMatch && repositories.length > 0) {
      repositories[repositories.length - 1].url = urlMatch[1];
    }
  }
}

const reposDir = path.join(__dirname, '..', 'repos');

// Ensure repos directory exists
if (!fs.existsSync(reposDir)) {
  fs.mkdirSync(reposDir);
}

console.log('Starting repository clone...\n');

let successCount = 0;
let failCount = 0;

for (const repo of repositories) {
  if (!repo.url || repo.url.trim() === '') {
    console.log(`[SKIP] ${repo.path} (no URL configured)`);
    continue;
  }

  const targetPath = path.join(reposDir, repo.path);

  // Check if already exists
  if (fs.existsSync(targetPath)) {
    console.log(`[EXISTS] ${repo.path} - already cloned`);
    successCount++;
    continue;
  }

  try {
    console.log(`[CLONE] ${repo.path}...`);
    execSync(`git clone "${repo.url}" "${targetPath}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log(`[DONE] ${repo.path}`);
    successCount++;
  } catch (error) {
    console.error(`[ERROR] Failed to clone ${repo.path}: ${error.message}`);
    failCount++;
  }

  console.log('');
}

console.log('========================================');
console.log(`Clone complete: ${successCount} succeeded, ${failCount} failed`);
console.log('========================================');
