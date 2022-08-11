import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from './user';
import post from './post'




const rootReducer=combineReducers({
    //서버사이드 렌더링을위해서 index추가 원래는 user,post두개만 넣어도 된다
    index:(state={},action)=>{
        switch (action.type){
            case HYDRATE:
                console.log('')
                return{
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    },
    // 유저초기값 포스트 초기값은 combineReducers을통해 알아서 통합
    user,
    post
});

export default rootReducer;