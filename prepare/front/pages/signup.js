import React,{useCallback, useState} from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import {Form,Input,Checkbox,Button} from 'antd'
import styled from 'styled-components';
import userinput from '../hooks/userinput';

function Signup() {
  const [id, onChangeId]=userinput('');
  const [password, onChangePassword]=userinput('');
  const [nickname, onChangeNickname]=userinput('');

  const ErrorMessage=styled.div`
    color:red;
  `;

  const [passwordCheck,setPasswordCheck]=useState('');
  const [passwordError,setPasswordError]=useState(false)
  const onChangePasswordCheck=useCallback((e)=>{
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password);
  },[password])

  const [term,setTerm]=useState('')
  const [termError,setTermError]=useState('')
  const onChangeTerm=useCallback((e)=>{
    setTerm(e.target.checked)
    setTermError(false)

  })




  const onSubmit=useCallback(()=>{
    if (password !==passwordCheck){
      return setPasswordError(true);
    }
    if (!term){
      return setTermError(true);
    }
    console.log(password,id,term,nickname)
  },[password,passwordCheck,term])
  return (
    <>
      <AppLayout>
        <Head>
            <title>
                회원가입 | NodeBird
            </title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor='user-id'>아이디</label>
            <br></br>
            <Input name="user-id" value={id} required onChange={onChangeId}/>
          </div>
          <div>
            <label htmlFor='user-nick'>닉네임</label>
            <br></br>
            <Input name="user-nick" value={nickname} required onChange={onChangeNickname}/>
          </div>
          <div>
            <label htmlFor='user-password'>비밀번호</label>
            <br></br>
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
          </div>
          <div>
            <label htmlFor='user-password-check'>비밀번호 체크</label>
            <br></br>
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            <div>
              <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>사용자는 공부할것을 동의합니다</Checkbox>
              {termError && <ErrorMessage>약간에 동의하세요</ErrorMessage>}
            </div>
          </div>
          <div style={{marginTop:10}}>
            <Button type='primary' htmlType='submit'>가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  )
}

export default Signup