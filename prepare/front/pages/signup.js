import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';

function Signup() {
  return (
    <>
        <Head>
            <title>
                회원가입 | NodeBird
            </title>
        </Head>
        <AppLayout>signup</AppLayout>
    </>
  )
}

export default Signup