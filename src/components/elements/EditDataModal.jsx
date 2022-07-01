import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Button from './Button';
import { InputStyle } from '../../constant/ClassNames';

const EditDataModal = ({ EditValue }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("update");
    let navigate = useNavigate();
    const { register, reset, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            fullName: EditValue?.fullName,
            email: EditValue?.email,
            phone: EditValue?.phone,
            paidAmount: EditValue?.paidAmount
        }
    });
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
        setTitle("updating")
        try {
            const res = await axios({
                method: 'put',
                url: `https://powerhack1.herokuapp.com/api/update-billing/${EditValue._id}`,
                data: data,
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            if (res.status === 200) {
                setTitle("Updated!")
                setOpen(false);
                reset();
                Notify(res.data.msg)
                navigate('/dashboard')
                setTimeout(() => window.location.reload(), 2500);
            }
        } catch (err) {
            setTitle("Updated Fail!")
            setTimeout(()=>setTitle("Update"),3000)
            for (let i = 0; i < err.response.data.errors?.length; i++) {
                Notify(err.response.data.errors[i], 3000)
            }
            Notify(err.response.data.message, 1500)
        }
    }
    return (
        <div>
            <button onClick={() => setOpen(true)} className="px-2 py-2 mx-1 text-indigo-600 hover:text-indigo-900">
                <BiEdit className="text-2xl" />
            </button>
            <Modal classNames={{ modal: 'customModal' }} open={open} onClose={() => setOpen(false)} center >
                <h4 className="pt-5 px-10 text-orange-500 text-xl font-medium uppercase">Edit Blling :</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8 px-10 py-10">
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Your full name :</h6>
                        <div className="flex relative ">
                            <input  {...register("fullName", {
                                required: `Full name is required`
                            })} type="text" className={InputStyle} placeholder="Full name" />
                            {errors.fullName?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.fullName?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Your email address :</h6>
                        <div className="flex relative ">
                            <input  {...register("email", {
                                required: `Email is required`
                            })} type="text" className={InputStyle} placeholder="Email" />
                            {errors.email?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.email?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col py-4">
                        <h6 className="pb-3">Your Phone number :</h6>
                        <div className="flex relative ">
                            <input  {...register("phone", {
                                required: `Phone is required`
                            })} type="text" className={InputStyle} placeholder="Phone" />
                            {errors.phone?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.phone?.message}
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 pb-10">
                        <h6 className="pb-3">Your paid amount :</h6>
                        <div className="flex relative ">
                            <input  {...register("paidAmount", {
                                required: `Paid amount is required`
                            })} type="text" className={InputStyle} placeholder="Paid Amount" />
                            {errors.paidAmount?.message && <p className="absolute text-sm text-red-500 -bottom-6">
                                {errors.paidAmount?.message}
                            </p>}
                        </div>
                    </div>
                    <Button type="sumit" title={title} />
                </form>
            </Modal>
        </div>
    )
}

export default EditDataModal;