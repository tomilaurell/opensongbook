import Dexie from 'dexie';

const db = new Dexie('opensongbook');
db.version(1).stores({ books: '++id' });
export default db;
