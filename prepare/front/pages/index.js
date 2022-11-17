import  {React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'


function index() {
  const me=useSelector((state)=>state.user.logInDone);
  const {mainPosts,hasMorePosts,loadPostsLoading}=useSelector((state)=>state.post);
  const dispatch=useDispatch();
  
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll2(){
      console.log(222222222)
    }
    console.log(onScroll2)
    
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll',onScroll);
    return ()=>{
      window.removeEventListener('scroll',onScroll);
    }
  },[hasMorePosts,loadPostsLoading])

  return (
    <AppLayout>
      {me &&<PostForm/>}
      {mainPosts.map((post)=> <PostCard key={post.id} post={post}/>)}
    </AppLayout>
  )
}

export default index