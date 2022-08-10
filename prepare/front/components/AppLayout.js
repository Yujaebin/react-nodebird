import React, { useState } from "react";
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu,Input,Row,Col} from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './Loginform';
import styled from 'styled-components';
import {useSelector} from 'react-redux';


 //이미 컴퍼넌트화된 것을 CSS수정하려면 styled(컴퍼넌트)``;형식으로
const SearchInput=styled(Input.Search)`
    vertical-align:middle;
`;

//상단 레이아웃을 위한 페이지
const AppLayout=({children})=>{
    const isLoggedIn=useSelector((state)=>state.user.isLoggedIn)
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput  enterButton ></SearchInput>
                    {/* verticalAlign: 배치위치 조절 */}
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>

            {/* gutter: 컬럼사이에 간격을 줌 =>Padding값 으로 들어감 */}
            <Row gutter={8}> 
                {/* 최대 24까지 그이상은 넘어감 */}
                <Col xs={24} md={6}>{isLoggedIn? <UserProfile/> : <LoginForm/>}</Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}><a href="https://github.com/Yujaebin" target="blank" rel="noreferrer noopener">Clone by Yujaebin</a></Col>
            </Row>
        </div>
    )
};

//타입스크립트 처럼 프롭타입을 정해둘수있다.
AppLayout.propTypes={
    children:PropTypes.node.isRequired,
}

export default AppLayout;