import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Main from './components/layout/Main'

import Home from './pages/Home'
import PostList from './components/post/PostList'
import PostWrite from './components/post/PostWrite'
import PostArea from './components/post/PostArea'
import PostModify from './components/post/PostModify'
import UserLogin from './components/user/UserLogin'
import UserJoin from './components/user/UserJoin'
import UserPage from './components/user/UserPage.jsx'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo :", userInfo)
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser()) //로그아웃
      }
    })
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/list' element={<PostList />}></Route>
          <Route path='/write' element={<PostWrite />}></Route>
          <Route path='/detail/:postNum' element={<PostArea />}></Route>
          <Route path='/modify/:postNum' element={<PostModify />}></Route>
          <Route path='/login' element={<UserLogin />}></Route>
          <Route path='/join' element={<UserJoin />}></Route>
          <Route path='/mypage' element={<UserPage />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App