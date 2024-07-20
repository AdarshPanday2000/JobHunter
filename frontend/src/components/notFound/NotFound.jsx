import React from 'react'
import { Link } from 'react-router-dom';
// import not from '../../../public/notFound'


function NotFound() {
  return (
    <section>
      <div>
        <img src='/notfound.png' alt = 'notfound' />
        <Link to={'/'}>RETURN TO HOME</Link>
      </div>
    </section>
  )
}

export default NotFound