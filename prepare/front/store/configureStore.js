import {createWrapper} from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from '../reducers'
import rootSaga from '../sagas'
import createSagaMiddleware  from 'redux-saga'

const configureStore = ()=>{
    //리덕스 사가 생성
    const SagaMiddleware = createSagaMiddleware();
    const middlewares=[SagaMiddleware];
    const enhancer=process.env.NODE_ENV ==='production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store=createStore(reducer,enhancer) //store는 state+reducer를 합침
    //루트사가를 import해서 넣음
    store.sagaTask= SagaMiddleware.run(rootSaga);

    return store
}

const wrapper= createWrapper(configureStore,{debug:process.env.NODE_ENV==='development'}); //리덕스에 대한 디버그를 활성화 개발할때 유용


export default wrapper;