import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const PostModify = () => {
    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    let params = useParams();
    let navigate = useNavigate();

    // 글 정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post('/api/post/detail', body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo]);

    // 글 수정하기
    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '' || content === '') {
            return alert('모든 항목을 채워주세요!!');
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios
            .post('/api/post/modify', body)
            .then((response) => {
                if (response.data.success) {
                    alert('글 수정이 완료됐습니다.')
                    navigate('/list');
                } else {
                    alert('글 수정이 실패하였습니다');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='login__wrap'>
            <div className='login__header'>
                <h3>Modify</h3>
                <p>글을 수정하시겠습니까?</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className='blind'>글쓰기 영역</legend>
                    <div>
                        <label htmlFor='youName' className='required blind'>글 제목</label>
                        <input
                            type='text'
                            id='youName'
                            placeholder='글 제목을 작성하세요!'
                            value={title || ''}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='youName' className='required blind'>글 내용</label>
                        <textarea
                            type='text'
                            id='youName'
                            placeholder='글 내용을 작성하세요!'
                            value={content || ''}
                            onChange={(e) => setContent(e.currentTarget.value)}
                        />
                    </div>

                    <button
                        type='submit'
                        className='btn__style2'
                        onClick={(e) => onSubmit(e)}
                    >수정하기</button>
                    <button
                        type='submit'
                        className='btn__style2'
                    >취소하기</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PostModify