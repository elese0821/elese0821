import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";

const RepleContent = (props) => {
    const [modalFlag, setModalFlag] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const [reple, setReple] = useState(props.reple.reple)

    const user = useSelector((state) => state.user);
    const ref = useRef();
    useOnClickOutside(ref, () => setModalFlag(false));

    const SubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            uid: user.uid,
            reple: reple,
            postId: props.reple.postId,
            repleId: props.reple._id
        }

        axios.post("/api/reple/edit", body).then((response) => {
            if (response.data.success) {
                alert("댓글 수정 성공하엿습니다.");
            } else {
                alert("댓글 수정 실패했습니다.")
            }
            return window.location.reload();
        })
    }

    const DeleteHandler = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 삭제하기겠습니까?")) {
            let body = {
                repleId: props.reple._id,
                postId: props.reple.postId
            }
            axios.post("/api/reple/delete", body).then((response) => {
                if (response.data.success) {
                    alert("댓글ㄹ이 삭제죔");
                    window.location.reload();
                }
            })
                .catch((err) => {
                    console.log(err);
                    alert("댓글 삭제 실패함");
                })
        }
    }

    return (
        <div>
            <div className='reple'>

                <p>{props.reple.author.displayName}</p>

                {props.reple.author.uid === user.uid && (
                    <div className='reple-info'>
                        <span onClick={() => setModalFlag(true)}>...</span>
                        {modalFlag && (
                            <div className='modal' ref={ref}>
                                <p onClick={(e) => DeleteHandler(e)}>삭제</p>
                                <p onClick={() => {
                                    setEditFlag(true);
                                    setModalFlag(false);
                                }}>수정</p>
                            </div>
                        )}
                    </div>
                )}
                {editFlag ? (
                    <div>
                        <form>
                            <input
                                style={{ border: "1px solid #000", padding: "10px" }}
                                text="text"
                                value={reple}
                                onChange={(e) => { setReple(e.currentTarget.value) }}
                            />
                            <button onClick={(e) => { SubmitHandler(e) }}>수정하기</button>
                            / <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditFlag(false);
                                }}
                            >취소하기</button>
                        </form>
                    </div>
                ) : (
                    <p>{props.reple.reple}</p>
                )}
            </div>

        </div>
    )
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

export default RepleContent