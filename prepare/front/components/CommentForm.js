import React, { useCallback, useEffect  } from 'react'
import {Form, Input,Button} from 'antd'
import userinput from '../hooks/userinput';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
function CommentForm({post}) {
  const [commentText,onChangeCommentText,setCommentText]=userinput('');
  const id=useSelector((state)=>state.user.me?.id) //me.id에 값이있으면 대입 없으면 undefined로 정의
  const {addCommentDone,addCommentLoading}=useSelector((state)=>state.post)

  const dispatch=useDispatch()

  useEffect(()=>{
    if (addCommentDone){
      setCommentText('');
    }
  },[addCommentDone])

  const onSubmitComment=useCallback(()=>{
    dispatch({
      type:ADD_COMMENT_REQUEST,
      data:{content:commentText, postId:post.id , userId:id}
    })
  },[commentText,id])


  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position:'relative',margin:0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{position:'absolute', right:0,bottom:-40 , zIndex:1}} type='primary' htmlType="submit" loading={addCommentLoading}>삐약</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes={
  post: PropTypes.object.isRequried,
}


export default CommentForm