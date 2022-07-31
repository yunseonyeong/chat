import React, { FC, useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// VFC : children 쓰지않는 컴포넌트 타입, FC : children 사용
// FC 타입의 대안 :: FC타입은 제네릭을 지원하지 않고  children이 없어도 돌아가는 등의 문제로 사용하지 않는걸 권장한다고 함.
// 그래서 props에 직접 타입 정의해주며  PropsWithChildren 등의 헬퍼 타입 사용한다.

const Workspace: FC = ({ children }) => {
  const { data, error } = useSWR('http://localhost:3095/api/users', fetcher);
  const { mutate } = useSWRConfig();
  const onLogout = useCallback(() => {
    // 로그아웃 요청
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      // 로그아웃 요청 성공 시 mutate, data 값이 false가 됨
      .then(() => {
        mutate('http://localhost:3095/api/users', null);
      });
  }, []);

  if (data === null) {
    console.log(data);
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
