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

export const FALLOW_REQUEST='FALLOW_REQUEST'
export const FALLOW_SUCCESS='FALLOW_SUCCESS'
export const FALLOW_FAILURE='FALLOW_FAILURE'

export const UNFALLOW_REQUEST='UNFALLOW_REQUEST'
export const UNFALLOW_SUCCESS='UNFALLOW_SUCCESS'
export const UNFALLOW_FAILURE='UNFALLOW_FAILURE'

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
    switch(action.type){
        case LOG_IN_REQUEST:
            return{
                ...state,
                logInLoading:true,                           //로그인 중
                logInError:null,
                logInDone:false,
            };
        case LOG_IN_SUCCESS:
            return{
                ...state,
                logInLoading:false,
                logInDone:true,
                me:dummyUser(action.data)                              //로그인 성공
                //me:action.data,
            };
        case LOG_IN_FAILURE:
            return{
                ...state,
                logInLoading:false,
                logInError:action.error,                                 //로그인 실패
            };
        case LOG_OUT_REQUEST:
            return{
                ...state,
                logOutLoading:true,
                logOutError:null,
                logOutDone:false,
            };
        case LOG_OUT_SUCCESS:
            return{
                ...state,
                logOutLoading:false,
                logOutDone:true,
                me:null,
            };
        case LOG_OUT_FAILURE:
            return{
                ...state,
                logOutLoading:false,
                logOutError:action.error,
            };
        case SIGN_UP_REQUEST:
            return{
                ...state,
                signUpLoading:true,
                signUpError:null,
                signUpDone:false,
            };
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpLoading:false,
                signUpDone:true,
                me:null,
            };
        case SIGN_UP_FAILURE:
            return{
                ...state,
                signUpLoading:false,
                signUpError:action.error,
            };
        case CHANGE_NICKNAME_REQUEST:
            return{
                ...state,
                changeNicknameLoading:true,
                ChnageNicknameError:null,
                ChnageNicknameDone:false,
            };
        case CHANGE_NICKNAME_SUCCESS:
            return{
                ...state,
                changeNicknameLoading:false,
                ChnageNicknameDone:true,
            };
        case CHANGE_NICKNAME_FAILURE:
            return{
                ...state,
                changeNicknameLoading:false,
                ChnageNicknameError:action.error,
            };
        case ADD_POST_TO_ME:
            return{
                ...state, 
                me:{
                    ...state.me,
                    Posts:[{id: action.data},...state.me.Posts]
                },
            }
        case REMOVE_POST_OF_ME:
            return{
                ...state,
                me:{
                    ...state.me,
                    Posts:state.me.Posts.filter((v)=>v.id!==action.data), 
                }
            }
        
        default:
            return state;
    }
};

export default reducer;