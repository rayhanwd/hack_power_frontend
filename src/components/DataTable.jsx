import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { SearchContext } from '../App';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import TableColumn from './elements/TableColumn';
import EditDataModal from './elements/EditDataModal';
import DeleteDataModal from './elements/DeleteDataModal';
import { paginationLeftStyle, paginationRightStyle } from '../constant/ClassNames';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const { state } = useContext(SearchContext);

  useEffect(() => {
    let Items = data?.filter(item => item.fullName === state || item.phone === state || item.email === state)
    setData(Items)
  }, [])

  const fetchData = async (count = 0) => {
    try {
      const res = await axios.get(`http://localhost:5500/api/billing-list?page=${count}`, {
        headers: {
          token: JSON.parse(localStorage.getItem('token')),
        }
      });
      setData(res.data.Billings)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData(count)

  }, [count])

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {
            data?.Billings?.length === 0 ?
              <div>
                <h4 className="text-orange-600 pt-10 text-xl text-center font-medium uppercase">
                  There is no record available
                </h4>
                <button onClick={() => setCount(0)} type="button" className="mt-5 w-full p-4 border text-base  text-gray-600 bg-white hover:bg-gray-100">
                  Back to top page
                </button>
              </div>
              :
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <TableColumn data="Billing Id" />
                      <TableColumn data="Full Name" />
                      <TableColumn data="Email" />
                      <TableColumn data="Phone" />
                      <TableColumn data="Paid Amount" />
                      <TableColumn data="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((item, index) => (
                        <tr key={item._id}>
                          <TableColumn data={item._id} />
                          <TableColumn data={item.fullName} />
                          <TableColumn data={item.email} />
                          <TableColumn data={item.phone} />
                          <TableColumn data={item.paidAmount} />
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center justify-center">
                              <EditDataModal EditValue={item} />
                              <DeleteDataModal DeleteValue={item} />
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                  <div className="flex items-center">
                    <button onClick={() => count > 0 && setCount(prevCount => prevCount - 1)} type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                      <MdKeyboardArrowLeft />
                    </button>

                    {
                      Array.from(Array(data?.total), (v, i) =>
                        <button onClick={() => setCount(prevCount => prevCount + 1)} key={i} type="button" className={paginationLeftStyle}>
                          {i = i + 1}
                        </button>
                      )
                    }
                    <button onClick={() => count >= 0 && setCount(prevCount => prevCount + 1)} type="button" className={paginationRightStyle}>
                      <MdKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              </div>}
        </div>
      </div>
    </div>
  )
}

export default DataTable;