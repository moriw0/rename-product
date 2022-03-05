import cron from 'node-cron';
import { renameFunc } from './gql.js';

console.log('start cron-job')
// cron.schedule('*/5 * * * * *', () => renameFunc());
cron.schedule('* * * * *', () => renameFunc());


