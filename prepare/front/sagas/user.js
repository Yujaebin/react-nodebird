import { all,fork,delay,put,takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_SUCCESS,LOG_IN_REQUEST,LOG_OUT_REQUEST,SIGN_UP_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE } from "../reducers/user";
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


function logInAPI(data){
  return axios.post(' ',data)
}
function logOutAPI(){
  return axios.post(' ')
}
function signUpAPI(){
  return axios.post(' ')
}
function followAPI(){
  return axios.post(' ')
}
function unfollowAPI(){
  return axios.post(' ')
}

function* logIn(action){
  try{
    yield delay(1000);
    //const result= yield call(logInAPI,action.data) //logInAPI(action.data)와 같은 역할인데 그걸 풀어서 전달
    yield put({
      type:LOG_IN_SUCCESS,
      data: action.data,
     // data:result.data
    });
  }
  catch(error){
    yield put({
      type:LOG_IN_FAILURE,
      error:error.response.data,
    })
  }
}

function* logOut(){
  try{
    yield delay(1000);
    //const result= yield call(logOutAPI)
    yield put({
      type:LOG_OUT_SUCCESS,
      //data:result.data
    });
  }
  catch(error){
    yield put({
      type:LOG_OUT_FAILURE,
      error:error.response.data,
    })
  }
}

function* signUp(){
  try{
    yield delay(1000);
    //const result= yield call(signUpAPI)
    yield put({
      type:SIGN_UP_SUCCESS,
      //data:result.data
    });
  }
  catch(error){
    yield put({
      type:SIGN_UP_FAILURE,
      error:error.response.data,
    })
  }
}
function* follow(action){
  try{
    yield delay(1000);
    //const result= yield call(signUpAPI)
    yield put({
      type:FOLLOW_SUCCESS,
      data:action.data
    });
  }
  catch(error){
    yield put({
      type:FOLLOW_FAILURE,
      error:error.response.data,
    })
  }
}

function* unfollow(action){
  try{
    yield delay(1000);
    //const result= yield call(signUpAPI)
    yield put({
      type:UNFOLLOW_SUCCESS,
      data:action.data
    });
  }
  catch(error){
    yield put({
      type:UNFOLLOW_FAILURE,
      error:error.response.data,
    })
  }
}



function* watchLogIn(){
  yield takeLatest(LOG_IN_REQUEST,logIn);
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST,logOut);
}

function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST,signUp);
}

function* watchFollow(){
  yield takeLatest(FOLLOW_REQUEST,follow);
}

function* watchUnFollow(){
  yield takeLatest(UNFOLLOW_REQUEST,unfollow);
}

export default function* userSaga(){
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ])
}