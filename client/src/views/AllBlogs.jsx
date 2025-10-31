import React from 'react'
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../util.js';

const AllBlogs = () => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [])
  return (
    <div>
      hello from AllBlogs
    </div>
  )
}

export default AllBlogs
