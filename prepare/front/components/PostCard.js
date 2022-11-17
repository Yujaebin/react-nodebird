import { Button, Card,Avatar,Popover,List,Comment} from 'antd'
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react'
import {RetweetOutlined,HeartOutlined,MessageOutlined,EllipsisOutlined,HeartTwoTone} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePost } from '../reducers/post';
import FollowButton from './FollowButton';
function PostCard({post}) {
  const dispatch=useDispatch();
  const [liked,setLiked]=useState(false);
  const [commentFormOpen,setCommentFormOpen]=useState(false);
  
  const {me}=useSelector((state)=>state.user);
  const id = me?.id; //me.id에 값이있으면 대입 없으면 undefined로 정의


  const onToggleLike = useCallback(()=>{
    setLiked(!liked)
  },[liked])

  const onToggleComment=useCallback(()=>{
    setCommentFormOpen(!commentFormOpen)
  },[commentFormOpen])
  
  const onRemovePost = useCallback(()=>{
    dispatch(removePost(post.id))
  })

  return (
    <div style={{marginBottom:10}}>
        <Card
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="retweet"/>,
                liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                <MessageOutlined key="comment" onClick={onToggleComment}/>,
                <Popover 
                    key="more" 
                    content={(<Button.Group>
                        {id && post.User.id ===id
                        ?(
                            <>
                                <Button>수정</Button>
                                <Button onClick={onRemovePost} type='danger' >삭제</Button>
                            </>
                        ): <Button>신고</Button>}
                    </Button.Group>
                    )}>
                <EllipsisOutlined/>
                </Popover>
            
            ]}
            extra={id && <FollowButton post={post}/>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={ <PostCardContent postData={post.content}/>}
            />
        </Card>
        
        {/* 여기서부턴 댓글부분 */}
        {commentFormOpen &&( 
            <div>
                <CommentForm post={post}/>
                <List
                    header={`${[post.Comments.length]}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item)=>(
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                            />
                        </li>
                    )}
                />
            </div>)}
    </div>
  );
}

PostCard.propTypes={
    post:PropTypes.shape({
        id:PropTypes.number,
        User:PropTypes.object,
        content:PropTypes.string,
        //createdAt:PropTypes.arrayOf(PropTypes.object),
        Comments:PropTypes.arrayOf(PropTypes.object),
        Images:PropTypes.arrayOf(PropTypes.object),
    }).isRequired
}

export default PostCard