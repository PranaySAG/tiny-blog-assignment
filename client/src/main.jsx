import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AllBlogs from './views/AllBlogs'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
    </Routes>
  </BrowserRouter>

)
