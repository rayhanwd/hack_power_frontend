import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Button from './Button';
import { addButonStyle, InputStyle } from '../../constant/ClassNames';

const AddDataModal = () => {
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const Notify = (msg, time) => {
        toast(msg, {
            position: "top-right",
            autoClose: time || 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    //fecth api
    const onSubmit = async (data) => {
        try {
            const res = await axios({
                method: 'post',
                url: `http://localhost:5500/api/add-billing`,
                data: data,
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            if (res.status === 200) {
                setOpen(false);
                reset();
                Notify(res.data.msg)
                navigate('/dashboard');
            }
        } catch (err) {
            for (let i = 0; i < err.response.data.errors?.length; i++) {
                Notify(err.response.data.errors[i], 3000)
            }
            Notify(err.response.data.message, 1500)
        }
    }
    return (
        <div>
            <button onClick={() => setOpen(true)} className={addButonStyle}>
                Add new bill
            </button>
            <Modal classNames={{ modal: 'customModal' }} open={open} onClose={() => setOpen(false)} center >
                <h4 className="pt-5 px-10 text-orange-500 text-xl font-medium uppercase">Add new Blling</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8 px-10 py-10">
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Your full name :</h6>
                        <div className="flex relative ">
                            <input  {...register("fullName", {
                                required: `Full name is required`,
                                minLength: {
                                    value: 7,
                                    message: "Full name should be 7 char long"
                                }
                            })} type="text" className={InputStyle} placeholder="Your full name" />
                            {errors.fullName?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.fullName?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Email address :</h6>
                        <div className="flex relative ">
                            <input  {...register("email", {
                                required: `Email is required`,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Enter a valid email addess"
                                }
                            })} type="text" className={InputStyle} placeholder="Email address" />
                            {errors.email?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.email?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Phone number :</h6>
                        <div className="flex relative ">
                            <input  {...register("phone", {
                                required: `Phone is required`,
                                minLength: {
                                    value: 11,
                                    message: "Phone should be 11 digit"
                                }
                            })} type="text" className={InputStyle} placeholder="Phone number" />
                            {errors.phone?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.phone?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 pb-10">
                        <h6 className="pb-3">Paid amount :</h6>
                        <div className="flex relative ">
                            <input  {...register("paidAmount", {
                                required: `Paid amount is required`,
                                minLength: {
                                    value: 4,
                                    message: "Paid amount should be 4 digit"
                                }
                            })} type="text" className={InputStyle} placeholder="Paid amount" />
                            {errors.paidAmount?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.paidAmount?.message}
                            </p>}
                        </div>
                    </div>
                    <Button type="sumit" title="Save" />
                </form>
            </Modal>
        </div>
    )
}
export default AddDataModal;