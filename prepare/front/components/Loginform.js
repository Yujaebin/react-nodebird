import React, { useCallback } from 'react'
import {Form,Input,Button} from 'antd';
import Link from 'next/link'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux';
import userinput from '../hooks/userinput';
import { loginRequestAction } from '../reducers/user';

function Loginform() {
  const dispatch = useDispatch();
  const [email, onChangeEmail]=userinput('');
  const [password, onChangePw]=userinput('');
  const {logInLoading}=useSelector((state)=>(state.user))
  
  const ButtonWrapper =styled.div`
    margin-top:10px;
  `;

  const onSubmitForm=useCallback(()=>{
    console.log(email,password);
    dispatch(loginRequestAction({email,password}));
  },[email,password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
        <div>
            <label htmlFor="user-email">이메일</label>
            <br/>
            <Input name="user-email" value={email} onChange={onChangeEmail} required/>
        </div>
        <div>
            <label htmlFor="user-password">비밀번호</label>
            <br/>
            <Input name="user-password" type={password} value={password} onChange={onChangePw} required/>
        </div>
        <ButtonWrapper>
            <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </ButtonWrapper>
    </Form>
  )
}


export default Loginform