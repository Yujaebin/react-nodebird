import React, { useCallback } from 'react'
import {Avatar, Card,Button} from 'antd'
import PropTypes from 'prop-types';


function UserProfile({setisLoggedIn}) {
  const onLogOut=useCallback(()=>{
    setisLoggedIn(false)
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

UserProfile.propTypes={
  setisLoggedIn:PropTypes.node.isRequired,
}

export default UserProfile