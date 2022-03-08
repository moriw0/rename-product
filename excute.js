import { renameFunction } from './function/rename.js';
import { fetchProductId } from './function/fetch.js';

const id = await fetchProductId();
renameFunction(id);
