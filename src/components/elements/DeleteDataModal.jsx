import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableColumn from './TableColumn';
import { buttonStyle } from '../../constant/ClassNames';

const DeleteDataModal = ({ DeleteValue }) => {
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    const [loading, setLoading] = useState();

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
    const DeleteDataHandler = async () => {
        setLoading(true)
        try {
            const res = await axios({
                method: 'delete',
                url: `https://powerhack1.herokuapp.com/api/delete-billing/${DeleteValue._id}`,
                data: "",
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                }
            });
            if (res.status === 200) {
                setLoading(false);
                setOpen(false);
                Notify(res.data.msg)
                navigate('/dashboard');
                setTimeout(() => window.location.reload(), 2500);
            }
        } catch (err) {
            Notify(err.response.data.message, 1500)
            setLoading(false);
        }
    }
    return (
        <div>
            <button onClick={() => setOpen(true)} className="px-2 py-2 mx-1 text-red-600 hover:text-red-900">
                <RiDeleteBack2Line className="text-2xl" />
            </button>
            <Modal classNames={{ modal: 'customModal' }} open={open} onClose={() => setOpen(false)} center >
                <h4 className="pt-5 px-10 text-orange-500 text-xl font-medium uppercase">Delete Blling :</h4>
                <div className="pt-5">
                    <h4 className="text-center text-md font-sans font-medium text-gray-600 uppercase">Are you sure ? To delete this row</h4>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <TableColumn data="Billing Id" />
                                <TableColumn data="Full Name" />
                                <TableColumn data="Email" />
                                <TableColumn data="Phone" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <TableColumn data={DeleteValue._id} />
                                <TableColumn data={DeleteValue.fullName} />
                                <TableColumn data={DeleteValue.email} />
                                <TableColumn data={DeleteValue.phone} />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center gap-x-10">
                    <button onClick={() => DeleteDataHandler()} className={buttonStyle}>
                        Delete
                    </button>
                    <button onClick={() => setOpen(false)} className={buttonStyle}>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteDataModal;
