import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';

const PostImages=({images})=>{
  const [showImagesZoom,setShowImagesZoom] = useState(false);

  const onZoom= useCallback(()=>{
    setShowImagesZoom(true);
  },[])
  const onClose=useCallback(()=>{
    setShowImagesZoom(false);
  },[])
  if (images.length===1){
    return(
      <>
        <img role="presentation"  src={images[0].src} alt={images.src} onClick={onZoom}></img>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length===2){
    return(
      <>
        <img role="presentation" style={{width:'50%' , display:'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
        <img role="presentation" style={{width:'50%' , display:'inline-block'}} src={images[1].src} alt={images[1].src} onClick={onZoom}></img>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return(
    <>
      <div>
        <img role="presentation" style={{width:'50%'}} src={images[0].src} alt={images[0].src} onClick={onZoom}></img>

        <div role="presentation" style={{display:'inline-block',width:"50%",textAlign:'center',verticalAlign:"middle"}} onClick={onZoom}>
          <PlusOutlined/>
          <br/>
          {images.length-1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
};

PostImages.propTypes={
  images:PropTypes.array
}

export default PostImages
