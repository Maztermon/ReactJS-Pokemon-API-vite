import React from 'react'
import LikePoke from "./LikePoke";

function FevPoke({ fav }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      
      {fav?.map((data, idx) => (
        <div>
          <p>{data.name}</p>
          <img src={data.sprites?.other.home.front_default} alt="" />
          <LikePoke />
        </div>
      ))}
    </div>
  )
}

export default FevPoke