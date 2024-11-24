import React from 'react'
import { Link } from 'react-router-dom'
import './checkout.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className='chckout'>
      {step1 ? (<Link to={'/login'}><small id='active'>SIGN IN</small></Link>) : (<Link id='inactive'><small>SIGN IN</small></Link>)}
      {step2 ? (<Link to={'/shipping'}><small id='active'>SHIPPING</small></Link>) : (<Link id='inactive'><small>SHIPPING</small></Link>)}
      {step3 ? (<Link to={'/placeorder'}><small id='active'>PLACE ORDER</small></Link>) : (<Link id='inactive'><small>PLACE ORDER</small></Link>)}
      {step4 ? (<Link><small id='active'>SUMMARY</small></Link>) : (<Link id='inactive'><small>SUMMARY</small></Link>)}
    </nav>
  )
}

export default CheckoutSteps
