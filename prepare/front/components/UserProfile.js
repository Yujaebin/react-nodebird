import React, { useCallback } from 'react'
import {Avatar, Card,Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
  const dispatch=useDispatch();
  const me=useSelector((state)=>(state.user.me))
  const {logOutLoading}=useSelector((state)=>(state.user))

  const onLogOut=useCallback(()=>{
    dispatch(logoutRequestAction());
  },[]);
  return (
    <Card
      actions={[
        <>
          <div key="twit">짹짹 <br></br>{me.Posts.length}</div>,
          <div key="followings"> 팔로워수<br></br>{me.Followings.length}</div>,
          <div key="followers">팔로워수<br></br>{me.Followers.length}</div>,
        </>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickName[0]}</Avatar>}
        title={me.nickName}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  )
}


export default UserProfile