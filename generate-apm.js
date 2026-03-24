import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

// Site24x7 is very picky about the key being a string and port being a number/string
const config = {
  licenseKey: String(process.env.APM_KEY || "").trim(),
  appName: "kymr",
  port: 10000 // Site24x7 expects an integer or a string; 443 is standard for their SaaS
};

if (!config.licenseKey) {
  console.error('CRITICAL: APM_KEY is missing from environment variables!');
  process.exit(1);
}

const filePath = path.join(process.cwd(), 'apminsightnode.json');

try {
  // Use sync to ensure it's finished before the next command in package.json starts
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf8');
  console.log('✅ apminsightnode.json created at:', filePath);
} catch (err) {
  console.error('❌ Failed to create config:', err);
  process.exit(1);
}