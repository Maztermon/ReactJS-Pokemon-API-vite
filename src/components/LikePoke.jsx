import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function LikePoke() {

    const [like, setLike] = useState(false);

    const toggleLike = () => {
        setLike((check) => !check)
    }

  return (
    <button onClick={toggleLike}>
        {like ? <FaHeart color='#E74C3C' /> : <FaRegHeart />}
    </button>
  )
}

export default LikePoke