import { useState } from "react";

type LocalStorageHook<T> = [T[], (value: T[]) => void, (value: T) => void];

function useLocalStorageCollection<T>(
  key: string,
  initialValue: T[] = []
): LocalStorageHook<T> {
  const [storedCollection, setStoredCollection] = useState<T[]>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving value from localStorage: ${error}`);
      return initialValue;
    }
  });

  const setStorageValue = (value: T[]) => {
    try {
      setStoredCollection(value);
      const serializedData = JSON.stringify(value);

      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error setting value in localStorage: ${error}`);
    }
  };

  const saveNewItemToCollection = (newItem: T) => {
    const updatedCollection = [...storedCollection, newItem];
    setStorageValue(updatedCollection);
  };

  return [storedCollection, setStorageValue, saveNewItemToCollection];
}

export default useLocalStorageCollection;
