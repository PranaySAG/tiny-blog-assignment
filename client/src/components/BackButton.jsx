import React from 'react'
import { Link } from 'react-router'
import back from "../../public/previous.png";

function BackButton() {
  return (
    <div className="my-5">
      <Link to="/"><p className="flex items-center gap-2 cursor-pointer"><img src={back} alt="back" className="h-7" />Back</p></Link>
    </div>
  )
}

export default BackButton
