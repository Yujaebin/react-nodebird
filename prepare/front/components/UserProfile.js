import React, { useCallback } from 'react'
import {Avatar, Card,Button} from 'antd'
import {useDispatch} from 'react-redux';
import { logoutAction } from '../reducers/user';

function UserProfile() {
  const dispatch=useDispatch();

  const onLogOut=useCallback(()=>{
    dispatch(logoutAction());
  },[]);
  return (
    <Card
      actions={[
        <>
          <div key="twit">짹짹 <br></br>0</div>
          <div key="following"> 팔로워수<br></br>0</div>
          <div key="following">팔로워수<br></br>0</div>
        </>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>JB</Avatar>}
        title="Jaebin"
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  )
}


export default UserProfile