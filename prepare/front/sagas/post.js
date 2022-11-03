import { all,fork,delay,put,takeLatest } from "redux-saga/effects";
import axios from 'axios'
import {  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS,REMOVE_POST_FAILURE,REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user" //import할때 어디 리듀서인지 정확하게 보기
import shortid from "shortid";
/*
fork: 비동기 함수실행
call:  주어진 동기 함수를 실행
all: 배열처럼 담아서 동시에 실행
put: 스토어에 인자로 들어온 action을 dispatch
delay: 시간지연

take: 특정 기능구현이나, 동기적인 작업을 처리해준다(기다림,1회용)
takeEvery: 여러번
takeLatest: 실수로 두번 연속실행 방지 (요청은 2번보내지지만 응답을 1번만옴) +++ debounce처럼 연이어 호출되는 함수들중 마지막함수만 호출되도록
throttle: 함수가 호출된후 일정시간동안 호출중지

*/
function addPostAPI(data){
  return axios.post(' ',data)
}
function addCommentAPI(data){
  return axios.post(' ',data)
}
function removeCommentAPI(data){
  return axios.post(' ',data)
} 


function* addPost(action){
  try{
    yield delay(1000);
    const id = shortid.generate()
    //const result= yield call(addPostAPI,action.data)
    yield put({
      type:ADD_POST_SUCCESS,
      data:{
        id,
        content:action.data
      }
    });
    yield put({
      type:ADD_POST_TO_ME,
      data:id,
    });

  }
  catch(error){
    yield put({
      type:ADD_POST_FAILURE,
      error:error.response.data
      //data:error.response.data,
    })
  }
}

function* removePost(action){
  try{
    yield delay(1000);
    //const result= yield call(addPostAPI,action.data)
    yield put({
      type:REMOVE_POST_SUCCESS,
      data:action.data
    });
    yield put({
      type:REMOVE_POST_OF_ME,
      data:action.data,
    });

  }
  catch(error){
    yield put({
      type:REMOVE_POST_FAILURE,
      error:error.response.data
      //data:error.response.data,
    })
  }
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST,addPost);
}

function* watchremovePost(){
  yield takeLatest(REMOVE_POST_REQUEST,removePost);
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}
//이벤트리스너 처럼 역할함 생성담당

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchremovePost),
    fork(watchAddComment)
  ])
}