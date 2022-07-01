import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import { searchInputStyle } from '../../constant/ClassNames';
import AddDataModal from './AddDataModal';

const TableHeader = () => {
    const { setValue } = useContext(SearchContext);

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl border mt-10">
            <div className="flex mb-1 sm:mb-0 justify-between w-full py-4">
                <div className="flex justify-between w-1/2">
                    <h2 className="text-2xl leading-tight">
                        Billings
                    </h2>
                    <div className="w-full px-10">
                        <input onChange={(e) => setValue(e.target.value)} type="text"
                            className={searchInputStyle} placeholder="Search...." />
                    </div>
                </div>
                <div className="text-end">
                    <AddDataModal />
                </div>
            </div>
        </div>
    )
}

export default TableHeader