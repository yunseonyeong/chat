import React from 'react';
import Workspace from '@layouts/Workspace';

const Channel = () => {
  return (
    // Workspace 안의 content가 Workspace의 children으로 넘어감.
    <Workspace>
      <div>로그인하신 것을 축하드려요!</div>
    </Workspace>
  );
};

export default Channel;
