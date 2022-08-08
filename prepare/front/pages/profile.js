import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';


function Profile() {
  return (
    <>
        <Head>
            <title>
                내 프로필 | NodeBird
            </title>
        </Head>
        <AppLayout>profile</AppLayout>
    </>
  )
}

export default Profile