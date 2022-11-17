import produce from "immer"

export const initialState={
    logInLoading:false,      //로그인 시도
    logInDone:false,       //로그인 상태
    logInError:null,     //로그아웃 시도

    logOutLoading:false,      
    logOutDone:false,       
    logOutError:null,

    signUpLoading:false,      
    signUpDone:false,       
    signUpError:null,
    
    changeNicknameLoading:false,      
    changeNicknameDone:false,       
    changeNicknameError:null,

    followLoading:false,      
    followDone:false,       
    followError:null,

    unfollowLoading:false,      
    unfollowDone:false,       
    unfollowError:null,

    me:null,
    signUpData:{},
    loginData:{},
}
    
export const LOG_IN_REQUEST='LOG_IN_REQUEST'
export const LOG_IN_SUCCESS='LOG_IN_SUCCESS'
export const LOG_IN_FAILURE='LOG_IN_FAILURE'

export const LOG_OUT_REQUEST='LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS='LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE='LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST='SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS='SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE='SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST='CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS='CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE='CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST='FOLLOW_REQUEST'
export const FOLLOW_SUCCESS='FOLLOW_SUCCESS'
export const FOLLOW_FAILURE='FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST='UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS='UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE='UNFOLLOW_FAILURE'

export const ADD_POST_TO_ME='ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME='REMOVE_POST_OF_ME';

export const dummyUser = (data)=>({
    ...data,
    nickName:'제로초',
    id:1,
    Posts:[{id:1}],//게시글 수
    Followings:[{nickName:'부기초'},{nickName:'부기초'},{nickName:'부기초'},{nickName:'부기초'},],
    Followers:[{nickName:'부기초'},{nickName:'부기초'},{nickName:'부기초'},],
})


export const loginRequestAction=(data)=>{
    return{
        type:LOG_IN_REQUEST,
        data
    }
}
export const logoutRequestAction=()=>{
    return{
        type:LOG_OUT_REQUEST,
    }
}
export const signupRequestAction=(data)=>{
    return{
        type:SIGN_UP_REQUEST,
        data
    }
}

const reducer = (state=initialState,action)=>{
    return produce(state,(draft)=>{
        switch(action.type){
            case LOG_IN_REQUEST:
                draft.logInLoading=true;
                draft.logInError=null;
                draft.logInDone=false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading=false;
                draft.logInDone=true;
                draft.me=dummyUser(action.data)
                break;
            case LOG_IN_FAILURE:
                draft.logInError=action.error;                    //로그인 실패
                draft.logInLoading=false;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading=true
                draft.logOutError=null
                draft.logOutDone=false
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutDone=true;
                draft.logOutLoading=false;
                draft.me=null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading=false
                draft.logOutError=action.error
                break;
            case SIGN_UP_REQUEST:
                draft.signUpError=null
                draft.signUpDone=false
                draft.signUpLoading=true
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading=false
                draft.signUpDone=true
                draft.me=null
                break
            case SIGN_UP_FAILURE:
                draft.signUpLoading=false
                draft.signUpError=action.error
                break
            case CHANGE_NICKNAME_REQUEST:
                    draft.changeNicknameLoading=true
                    draft.chnageNicknameError=null
                    draft.changeNicknameDone=false
                    break;

            case CHANGE_NICKNAME_SUCCESS:
                    draft.changeNicknameLoading=false;
                    draft.changeNicknameDone=true;
                    break;
            case CHANGE_NICKNAME_FAILURE:
                    draft.changeNicknameLoading=false;
                    draft.changeNicknameError=action.error;
                    break;
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({id:action.data});
                break;
                // return{
                //     ...state, 
                //     me:{
                //         ...state.me,
                //         Posts:[{id: action.data},...state.me.Posts]
                //     },
                // }
            case REMOVE_POST_OF_ME:
                draft.me.Posts=draft.me.Posts.filter((v)=>v.id!==action.data)
                // return{
                //     ...state,
                //     me:{
                //         ...state.me,
                //         Posts:state.me.Posts.filter((v)=>v.id!==action.data), 
                //     }
                // }
                break;
            case FOLLOW_REQUEST:
                draft.followLoading=true;
                draft.followDone=false;
                draft.followError=null;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading=false;
                draft.followDone=true;
                draft.me.Followings.unshift({id:action.data});
                break;
            case FOLLOW_FAILURE:
                draft.followError=action.error;                    //로그인 실패
                draft.followLoading=false;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading=true;
                draft.unfollowDone=false;
                draft.unfollowError=null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading=false;
                draft.unfollowDone=true;
                draft.me.Followings=draft.me.Followings.filter((v)=>v.id!==action.data);
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowError=action.error;                    //로그인 실패
                draft.unfollowLoading=false;
                break;
            default:
                break;
        }
    })
    
};

export default reducer;