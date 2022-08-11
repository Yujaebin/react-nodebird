import { Button, Form, Input } from 'antd'
import React, { useCallback, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userinput from '../hooks/userinput';
import { addPost } from '../reducers/post';

function PostForm() {
    const imagePaths=useSelector((state)=>state.post.imagePaths)
    const imageInput = useRef();
    const dispatch=useDispatch();
    const [text,onChangeText]=userinput('');
    const onSubmit=useCallback(()=>{
        dispatch(addPost)
    },[])  
    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
    return (

        <Form style={{margin:'10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea 
                value={text} 
                onChange={onChangeText}
                maxLength={140}
                placeholder="무슨일이 있나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput}></input>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{float:'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v)=>(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width:'200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm