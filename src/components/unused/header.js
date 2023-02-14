// import {
//     createBrowserRouter,
//     RouterProvider,
//     Router,
//     Route,
//     Routes,
//     Link,
//   } from "react-router-dom";
import logo from '../images/React-icon.png'

import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
            <nav className=" text-black flex justify-between items-center px-6 py-3 h-24">
                <ul className='flex space-x-4 mx-2 font-bold text-2xl text-blue-900 items-center'>
                    <li className=''>
                        <img src={logo} className="nav--icon h-6" />
                    </li>
                    <li>
                        <h1>React Project</h1>
                    </li>
                </ul>
                <ul className='flex font-medium text-xl space-x-20 items-center'>
                    <li className='block text-center'>
                        <Link to="/test">Test</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className=''>
                        <button className="text-white bg-sky-700 h-12 px-6 rounded hover:bg-sky-800">
                        <Link to="/">Home</Link>
                        </button>
                    </li>
                </ul>
        </nav>
    )
}
