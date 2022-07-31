import loadable from '@loadable/component';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 페이지 단위로 code splitting 을 해준다.
// npm i --save-dev @types/loadable__component
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/workspace/channel" element={<Channel />}></Route>
      </Routes>
    </>
  );
};

export default App;
