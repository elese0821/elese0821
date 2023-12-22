import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";

const UserPage = () => {
    const [currnetImage, setCurrentImage] = useState("");

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL);
        }
    }, [user])

    const ImageUpload = (e) => {
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios.post("/api/user/profile/img", formData)
            .then((response) => {
                setCurrentImage(response.data.filePath);
            });
    }

    const SaveProfile = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: currnetImage
            })
        } catch (err) {
            return alert("프로필 저장 실패");
        }

        let body = {
            photoURL: currnetImage,
            uid: user.uid,
        }
        axios.post("/api/user/profile/update", body).then((response) => {
            if (response.data.success) {
                alert("프로필 저장에 성공하였습니다.");
                window.location.reload();
            } else {
                return alert("프로필 저장에 실패했습니다.");
            }
        })
    }

    return (
        <div className='mypage'>
            <form>
                <label>
                    <input type="file" accept='image/*' onChange={(e) => ImageUpload(e)} />
                    <Avatar
                        size="100"
                        round={true}
                        src={currnetImage}
                    />
                </label>
                <button onClick={(e) => SaveProfile(e)}>저장하기</button>
            </form>
        </div>
    )
}

export default UserPage