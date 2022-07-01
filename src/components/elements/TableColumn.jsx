import React from 'react'

const TableColumn = ({data}) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    <p className="text-gray-900 whitespace-no-wrap">
      {data}
    </p>
  </td>
  )
}

export default TableColumn