import React, { useState, useCallback, Dispatch, SetStateAction, ChangeEvent } from 'react';

// type이 머가 들어올지 몰라서 generic으로 만들어줬따.
// value : T, setValue :Dispatch<SetStateAction<T>>, handler: 매개변수는 any, 리턴은 void형
// Dispatch랑 SetStateAction은 React에서 제공하는 타입이란다.
// 레오한테 ts 물어보기

type ReturnTypes<T = any> = [T, Dispatch<SetStateAction<T>>, (e: ChangeEvent<HTMLInputElement>) => void];

const useInput = <T>(initialData: T): ReturnTypes => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, setValue, handler];
};

export default useInput;
