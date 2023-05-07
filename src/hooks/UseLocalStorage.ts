import { useState } from "react";

export const useLocalStorage = (key:string, defaultValue:any=null) => {

    const storedItem = localStorage.getItem(key)
    if (storedItem !== null){
      defaultValue = JSON.parse(storedItem)
    } else {
      localStorage.setItem(key,defaultValue)
    }

    const [storedValue, setStoredValue] = useState(defaultValue);
    window.localStorage.setItem(key, JSON.stringify(storedValue));
    const setValue = (value:any) => {
      if (typeof value === 'function') {
        const newValue = value(storedValue)
        window.localStorage.setItem(key, JSON.stringify(newValue))
        setStoredValue(newValue);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      }
    }
    return [storedValue, setValue];
}