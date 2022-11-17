import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';
export const initialState={
    // mainPosts:[{
    //     id:1,
    //     User:{
    //       id:1,
    //       nickname:'제로초'  
    //     },
    //     content:'첫번째 글 #해시태그 #익스프레스',
    //     Images: [{
    //         id:shortId.generate(),
    //         src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    //       }, {
    //         id:shortId.generate(),
    //         src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    //       }, {
    //         id:shortId.generate(),
    //         src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    //     }],
    //     Comments: [{
    //         id:shortId.generate(),
    //         User: {
    //           id:shortId.generate(),
    //           nickname: 'nero',
    //         },
    //         content: '우와 개정판이 나왔군요~',
    //       }, {
    //         User: {
    //           id:shortId.generate(),
    //           nickname: 'hero',
    //         },
    //         content: '얼른 사고싶어요~',
    //     }]
    // }],
    mainPosts:[],
    imagePaths:[], //이미지 업로드할시 이미지 경로저장
    hasMorePosts:true,
    loadPostsLoading:false,
    loadPostsDone:false,
    loadPostsError:null,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addCommentLoading:false, 
    addCommentDone:false,
    addCommentError:null,
}
export const generateDummyPost=(number)=> Array(number).fill().map(()=>({
    id:shortId.generate(),
    User:{
      id:shortId.generate(),
      nickname:faker.name.fullName(),
    },
    content:faker.lorem.paragraph(),
    Images:[{
      src:faker.image.animals()
    }],
    Comments:[{
      User:{
        id:shortId.generate(),
        nickname:faker.name.fullName(),
      },
      content:faker.lorem.paragraph(),
    }],
  }));
// initialState.mainPosts= initialState.mainPosts.concat(
// );
export const dummyPost= (data)=>({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
})

export const dummyComment=(data)=>({
  id:shortId.generate(),
  content:data,
  User:{
    id:1,
    nickname:'제로초',
  },
}
)

export const LOAD_POSTS_FAILURE='LOAD_POSTS_FAILURE';
export const LOAD_POSTS_REQUEST='LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS='LOAD_POSTS_SUCCESS';

export const ADD_POST_REQUEST='ADD_POST_REQUEST';
export const ADD_POST_SUCCESS='ADD_POST_SUCCESS';
export const ADD_POST_FAILURE='ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST='REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS='REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE='REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST='ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS='ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE='ADD_COMMENT_FAILURE';

export const addPost=(data)=>({
  type:ADD_POST_REQUEST,
  data,
})

export const removePost=(data)=>({
  type:REMOVE_POST_REQUEST,
  data,
})

export const addComment=(data)=>({
  type:ADD_COMMENT_REQUEST,
  data,
})

const reducer = (state=initialState,action)=>{
  return produce(state,(draft)=>{
    switch(action.type){
      case LOAD_POSTS_REQUEST:
          draft.loadPostsLoading=true;
          draft.loadPostsDone=false;
          draft.loadPostsError=null;
          break;
      case LOAD_POSTS_SUCCESS:
          draft.mainPosts=action.data.concat(draft.mainPosts)
          draft.loadPostsDone=true
          draft.loadPostsLoading=false
          draft.hasMorePosts=draft.mainPosts.length<50
          break;
      case LOAD_POSTS_FAILURE:
          draft.loadPostsLoading=false
          draft.loadPostsError=action.error
          break;
      case ADD_POST_REQUEST:
          draft.addPostLoading=true;
          draft.addPostDone=false;
          draft.addPostError=null;
          break;
      case ADD_POST_SUCCESS:
          draft.mainPosts.unshift(dummyPost(action.data))
          draft.addPostDone=true
          draft.addPostLoading=false
          break;
      case ADD_POST_FAILURE:
          draft.addPostLoading=false
          draft.addPostError=action.error
          break;
      case REMOVE_POST_REQUEST:
          draft.removePostLoading=true
          draft.removePostDone=false
          draft.removePostError=null
          break;
      case REMOVE_POST_SUCCESS:
          draft.mainPosts=draft.mainPosts.filter((v)=>v.id!==action.data),
          draft.removePostDone=true
          draft.removePostLoading=false
          break;
      case REMOVE_POST_FAILURE:
        draft.removePostError=action.error;
        draft.removePostLoading=false;
        break;    
      case ADD_COMMENT_REQUEST:
          draft.addCommentLoading=true
          draft.addCommentDone=false
          draft.addCommentError=null
          break;
      case ADD_COMMENT_SUCCESS:{
        const post= draft.mainPosts.find((v)=> v.id==action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading=false;
        draft.addCommentDone=true;
        break;
        // const postIndex = state.mainPosts.findIndex((v)=> v.id===action.data.postId) //불변셩을 지키면서 댓글 생성
        // const post =state.mainPosts[postIndex];
        // post.Comments= [dummyComment(action.data.content), ...post.Comments]
        // const mainPosts=[...state.mainPosts];
        // mainPosts[postIndex]=post;
        // return{
        //   ...state,
        //   mainPosts,
        //   addCommentDone:true,
        //   addCommentLoading:false,
        // }
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading=false;
        draft.addCommentError=action.error;
          break;
      default:
          break;
  }

  })
    
};

export default reducer;