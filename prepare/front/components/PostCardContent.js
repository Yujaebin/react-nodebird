import React from "react";
import Proptypes from "prop-types"
import Link from "next/link";

function PostCardContent({postData}) {
  //정규표현식을 이용하여 해시태그를 구별해냄
  //  /#[^\s#]+/g 원래이건데
  // /(#[^\s#]+)/g 이렇게 괄호를 추가해야한다
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v,i)=>{
        if (v.match(/(#[^\s#]+)/)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={i} ><a>{v}</a></Link>
        }
        return v;
      })}
    </div>
  )
}

PostCardContent.propTypes={postData:Proptypes.string.isRequired}

export default PostCardContent