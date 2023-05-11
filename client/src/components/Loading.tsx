import React from 'react'

const Loading = () => {
  return (
    <div  className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black opacity-50">
    <div className="spinner"></div>
  </div>
  )
}

export default Loading