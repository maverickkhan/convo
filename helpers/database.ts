// db.ts
interface Data {
    id: string;
    title: string;
    upvotes: number;
    date: string;
  }
  
  const DB_NAME = 'appData';
  const DB_VERSION = 1;
  const STORE_NAME = 'data';
  
  export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
  
      request.onerror = () => reject(request.error);
      request.onupgradeneeded = (_) => {
        const db = request.result;
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
    });
  };
  
  export const fetchData = async (): Promise<Data[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
  
      request.onsuccess = () => {
        resolve(request.result);
        db.close();
      };
      request.onerror = () => {
        reject(request.error);
        db.close();
      };
    });
  };
  
  export const updateData = async (items: Data[]): Promise<void> => {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
  
    items.forEach(item => store.put(item));
  
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve();
        db.close();
      };
      transaction.onerror = () => {
        reject(transaction.error);
        db.close();
      };
    });
  };
  
  export const deleteData = async (id: string): Promise<void> => {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
  
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        resolve();
        db.close();
      };
      request.onerror = () => {
        reject(request.error);
        db.close();
      };
    });
  };
  