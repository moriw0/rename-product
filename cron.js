import cron from 'node-cron';
import { renameFunc } from './gql.js';

cron.schedule('*/5 * * * * *', () => renameFunc());


