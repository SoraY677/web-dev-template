import {copyFileSync} from 'node:fs';

copyFileSync('.env.template', '.env');
