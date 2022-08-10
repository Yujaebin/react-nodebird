import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

function Profile() {
  const followerList=[{nickname:"강호동"},{nickname:"벌"},{nickname:"넥스트"}];
  const folloingList=[{nickname:"홍길동"},{nickname:"새"},{nickname:"노드"}];
  return (
    <>
        <Head>
            <title>
                내 프로필 | NodeBird
            </title>
        </Head>
        <AppLayout>
          <NicknameEditForm />
          <FollowList header="팔로잉 목록" data={folloingList}/>
          <FollowList header="팔로워 목록" data={followerList}/>
        </AppLayout>
    </>
  )
}

export default Profile