import React from 'react';
import { SubmitBtnStyle } from '../../constant/ClassNames';

const Button = ({ type, title, onclick }) => {
  return (
    <button onClick={() => onclick()} type={type} className={SubmitBtnStyle}>
      <span className="w-full">
        {title}
      </span>
    </button>
  )
}
export default Button;