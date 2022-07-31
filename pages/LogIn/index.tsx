import React, { useState, useCallback } from 'react';
import { Header, Error, Form, Label, Input, LinkContainer, Button } from './styles';
import { Link, Navigate } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  //swr 장점 : 로딩 상태도 알 수 있다. 데이터가 존재하지 않으면(undefined) 로딩중임을 알 수 있음
  // data, error가 바뀌면 리렌더링된다.
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher); // 로그인 후 저장할 데이터, 해당 url을 fetcher로 옮겨준다.

  const [email, , onChangeEmail] = useInput('');
  const [password, , onChangePassword] = useInput('');
  const [loginError, setLoginError] = useState(false);
  //react router v6에서는 Redirect 지원하지 않음. useNavigate로 대체가능 하겠지?
  // const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);

      axios
        .post(
          'http://localhost:3095/api/users/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          // swr최신버전에서 revalidate 가 사라졌다. mutate가 대체한다.
          mutate(response.data, false);
        })
        .catch((error) => {
          setLoginError(error.response?.status === 401);
        })
        .finally(() => {});
    },
    [email, password, mutate],
  );

  if (data) {
    // 로그인 성공 시, 사용자 정보가 담긴 data값이 false에서 업데이트되면, Login컴포넌트가 리렌더링되고, channel로 라우팅
    return <Navigate to="/workspace/channel" />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>

        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
