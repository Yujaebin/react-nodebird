import React from 'react';
import 'antd/dist/antd.css' //antd.css를 모든페이지에 추가하기위해 설정
import { PropTypes } from 'prop-types';
import Head from 'next/head'; //head를 수정
import wrapper from '../store/configureStore';


//모든 pages의 공통적으로 넣고싶을때 이곳에 넣기 App레이아웃보다 범위가 더 큼
//Component를 통해 모든 페이지가 지나감
const NodeBird=({Component})=>{
    return(
        <>
            <Head>
                <title>NodeBird</title>
            </Head>
            <Component/>
        </>
    )
};

NodeBird.propTypes={
    Component:PropTypes.elementType.isReauired,
}

export default wrapper.withRedux(NodeBird);