import {React, useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({post}) => {
  const dispatch=useDispatch();
  const {me,followLoading,unfollowLoading}=useSelector((state)=>state.user);
  const isFollwing=me && me.Followings.find((v)=>v.id==post.User.id)   //로그인이 되어있으면서 게시글 작성자가 팔로잉한 사람인지 구별

  const onClickButton=useCallback(()=>{
    if(isFollwing){
      dispatch({
        type:UNFOLLOW_REQUEST,
        data:post.User.id,
      })
    }
    else{
      dispatch({
        type:FOLLOW_REQUEST,
        data:post.User.id,
      })
    }

  },[isFollwing])
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollwing ? '언팔로우' :'팔로우'}
    </Button>
  );
};

FollowButton.propTypes={
  post:PropTypes.object.isRequired,
}
export default FollowButton;