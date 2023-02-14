import React from 'react'
import logo from '../images/React-icon.png'

export default function LoginNav(props) {
    let state = props.state
    let context = props.state.context

    function logOut(){
        alert("logging out");
        props.send("LOGOUT")
    }

    return (
        <nav className=" text-black bg-white flex justify-between items-center px-6 py-3 h-20 shadow-md shadow-gray-300/100">
                <ul className='flex space-x-4 mx-2 font-bold text-2xl items-center'>
                    <li className=''>
                        <img src={logo} className="h-6" />
                    </li>
                    <li>
                        <h1>My Project</h1>
                    </li>
                </ul>
                <ul className='flex font-medium text-xl space-x-20 items-center'>
                    <li className='px-2 hover:text-blue-700 hover:border-b-4 hover:border-blue-700'>
                        {state.matches("loggedIn") ? context.userData.username :"About"}
                    </li>
                    <li className='px-2 hover:text-blue-700 hover:border-b-4 hover:border-blue-700'>
                        {!state.matches("loggedIn") ? "Docs" :
                        <button onClick={()=> props.send("Edit Profile")}>
                        Edit Profile</button>}
                    </li>
                    <li className=''>
                        <button onClick={state.matches("loggedIn") ? logOut : ""}
                        className="text-white bg-blue-700 h-12 px-6 rounded hover:bg-blue-800">
                        {state.matches("loggedIn") ? "Logout": "Home"}
                        </button>
                    </li>
                </ul>
        </nav>
    )
}
