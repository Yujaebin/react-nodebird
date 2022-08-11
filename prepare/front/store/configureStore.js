import {createWrapper} from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from '../reducers' 

const configureStore = ()=>{
    const middlewares=[];
    const enhancer=process.env.NODE_ENV ==='production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store=createStore(reducer,enhancer) //store는 state+reducer를 합침
    store.dispatch({
        type:'CHANGE_NICKNAME',
        data:'boogicho'
    })
    return store
}

const wrapper= createWrapper(configureStore,{debug:process.env.NODE_ENV==='development'}); //리덕스에 대한 디버그를 활성화 개발할때 유용


export default wrapper;