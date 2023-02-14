import React from 'react'

export default function Dashboard(props) {
    let context = props.state.context

    function logOut(){
        alert("logging out");
        props.send("LOGOUT")
    }  

    let fav_color = "blue"
    //bg-gradient-to-b from-blue-700 to-blue-700


    return (
        <div className={'bg-white block w-[38rem] h-[34.5rem] m-auto mt-24 p-[0.05px] font-medium text-xl rounded-lg shadow-lg shadow-gray-400/50 border-4 border-blue-600 border-' + fav_color + '-200'}>
            <div className={'pt-8 pb-5 bg-gradient-to-b from-blue-600 to-blue-900 fsdf-' + fav_color + '-700'}>
                <img src = {context.userData.image} className='rounded-full mx-auto mt-[-7rem] w-36 h-36 border-8 border-blue-700 bg-gray-300' />
            </div>
            <div className={'block py-4 text-center text-white font-bold text-2xl bg-blue-900 ' + fav_color + '-900'}>
                {context.userData.firstName} {context.userData.lastName}
            </div>
            <div className='w-full px-10 h-96 mt-10 grid grid-cols-2 grid-rows-4 gap-6'>
                <UserDetails label="First Name" value={context.userData.firstName} />
                <UserDetails label="Last Name" value={context.userData.lastName} />
                <UserDetails label="Email" value={context.userData.email} />
                <UserDetails label="Userame" value={context.userData.username} />
                <UserDetails label="Gender" value={context.userData.gender} />
                <UserDetails label="Nationality" value="Germany" />
                <div>
                    <button className="text-white bg-blue-700 mt-5 h-4/5 w-2/3 px-6 py-3 float-right rounded-md hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-400/80"
                    onClick={()=> props.send('Edit Profile')}>Edit Profile</button>
                </div>
                <div>
                    <button className="text-blue-700 bg-white mt-5 h-4/5 w-2/3 px-8 py-3 m-auto rounded-md hover:border-4 hover:bg-white hover:border-blue-700 shadow-lg shadow-gray-300/50"
                    onClick={logOut}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

function UserDetails(props){
    return (
        <div className='cus p-3 border-2 border-gray-200 rounded-sm hover:shadow-lg hover:shadow-gray-400/50'>
            {props.label}<br></br>
            <span className='font-normal text-lg'>{props.value}</span>
        </div>
    )
}
