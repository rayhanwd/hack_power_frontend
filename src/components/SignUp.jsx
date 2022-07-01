import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/Power_hack_lg.png';
import { MdEmail, MdDriveFileRenameOutline } from 'react-icons/md';
import { BiLockOpenAlt } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import Button from './elements/Button';
import { toast } from 'react-toastify';
import { InputSpanStyle, InputStyle } from '../constant/ClassNames';


const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [see, seePassword] = useState(false);
  const [loading, setLoading] = useState();
  let navigate = useNavigate();

  const handleSeePass = () => {
    seePassword(!see);
    let type = document.querySelector("#pass").getAttribute('type') === 'password' ? 'text' : 'password';
    document.querySelector("#pass").setAttribute('type', type);
  }
  const Notify = (msg, time) => {
    toast(msg, {
      position: "top-right",
      autoClose: time || 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  //fecth api
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'post',
        url: `https://powerhack1.herokuapp.com/api/registration`,
        data: data
      });
      console.log(res)

      if (res.status === 200) {
        setLoading(false);
        Notify(res.data.message)
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate('/dashboard');
      }
    } catch (err) {
      for (let i = 0; i < err.response.data.errors.length; i++) {
        Notify(err.response.data.errors[i], 1500)
      }
      console.log(err.response.data.errors)
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <div className="p-4 text-2xl font-bold text-black">
            A Power Distribution Company
          </div>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">
            New User
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col py-4">
              <div className="flex relative ">
                <span className={InputSpanStyle}>
                  <MdDriveFileRenameOutline />
                </span>
                <input {...register("name",{
                  required: `Full name is required`,
                  minLength: {
                    value: 7,
                    message: "Full name should be 7 char long"
                  }
                })} type="text" className={InputStyle} placeholder="Full name" />
                {errors.name?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                  {errors.name?.message}
                </p>}
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div className="flex relative ">
                <span className={InputSpanStyle}>
                  <MdEmail />
                </span>
                <input  {...register("email",{
                  required: `Email is required`,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email addess"
                  }
                })} type="text" className={InputStyle} placeholder="Email" />
                {errors.email?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                  {errors.email?.message}
                </p>}
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-12">
              <div className="flex relative ">
                <span className={InputSpanStyle}>
                  <BiLockOpenAlt />
                </span>
                <input id="pass"  {...register("password", {
                  required: `Password is required`,
                  minLength: {
                    value: 5,
                    message: "Password should be 5 char long"
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Must be contain a number and capital letter.example kaziRayhan12!"
                  }
                })} type="password" className={InputStyle} placeholder="Password" />
                <span onClick={() => handleSeePass()} className="absolute right-0 top-3 inline-flex  items-center px-3  text-gray-500 shadow-sm text-sm">
                  {see ? <AiFillEye className="text-xl cursor-pointer" /> : <AiFillEyeInvisible className="text-xl cursor-pointer" />}
                </span>
                {
                  errors.password?.message &&
                  <p className="absolute text-sm text-red-500 -bottom-6">
                    {errors.password?.message}
                  </p>
                }
              </div>
            </div>
            <Button type="sumit" title="Singup" />
          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
              Already have an account?
              <Link to="/login" className="font-semibold underline">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img className="hidden object-cover w-full h-screen md:block" src={bgImage} alt="power hack" />
      </div>
    </div>
  )
}

export default SignUp;