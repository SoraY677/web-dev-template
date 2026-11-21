import {copyFileSync, existsSync} from 'node:fs';

// copy env fie
if (!existsSync('.env')) {
  copyFileSync('.env.template', '.env');
} else {
  console.warn('env found! copy skip...')
}
