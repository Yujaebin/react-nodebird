import React, { useCallback } from 'react'
import {Form,Input,Button} from 'antd';
import Link from 'next/link'
import styled from 'styled-components'
import {useDispatch} from 'react-redux';
import userinput from '../hooks/userinput';
import { loginAction } from '../reducers/user';
function Loginform() {
  const dispatch = useDispatch();
  const [id, onChangeId]=userinput('');
  const [password, onChangePw]=userinput('');
  
  const ButtonWrapper =styled.div`
    margin-top:10px;
  `;

  const onSubmitForm=useCallback(()=>{
    console.log(id,password);
    dispatch(loginAction({id,password}));
  },[id,password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
        <div>
            <label htmlFor="user-id">아이디</label>
            <br/>
            <Input name="user-id" value={id} onChange={onChangeId} required/>
        </div>
        <div>
            <label htmlFor="user-id">비밀번호</label>
            <br/>
            <Input name="user-password" type={password} value={password} onChange={onChangePw} required/>
        </div>
        <ButtonWrapper>
            <Button type='primary' htmlType='submit' loading={false}>로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </ButtonWrapper>
    </Form>
  )
}


export default Loginform