import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AllBlogs from './views/AllBlogs'
import NewBlog from './views/NewBlog'
import EditBlog from './views/EditBlog'
import ReadBlog from './views/ReadBlog'
import Login from './views/login'
import SignUp from './views/SignUp'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>

)
