import {all,fork} from 'redux-saga/effects'

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

import postSaga from './post'
import userSaga from './user'

export default function* rootSaga(){
  yield all([
    fork(postSaga),
    fork(userSaga),
  ])
//여기에 등록하기
}