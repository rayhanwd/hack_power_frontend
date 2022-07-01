import React from 'react'
import logo from '../assets/images/power_hack_small.png';
const Header = () => {
    return (
        <nav className="bg-white dark:bg-gray-800  shadow py-4 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className=" flex items-center">
                        <a className="flex-shrink-0" href="/">
                            <img className="h-28 w-28" src={logo} alt="Workflow" />
                        </a>
                        <h4 className="text-orange-600 pt-10 text-sm font-medium uppercase">power distribution company </h4>
                    </div>

                    <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium uppercase">Paid total: 1200</h4>
                        <div className="ml-10 flex">
                            <div className="p-2 flex">
                                <div className="block relative">
                                    <img alt="profil" src="https://profile.canva.com/users/UAE7htw1qAk/avatars/1/50.jpg" className="mx-auto object-cover rounded-full h-12 w-12 " />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header