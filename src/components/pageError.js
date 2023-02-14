import React from 'react'

export default function PageError(props) {
    let errorTitle, subtitle, reason;

    //hint based on error message
    reason = props.state.context.errorMsg === "Invalid credentials" ?
    "to enter valid credentials" : 
    "your internet connection is stable"

    //title, subtitle based on current state
    if(props.state.matches("loginErrored")){
        errorTitle = "Login"
        subtitle = "signing you in. "
    }
    else if(props.state.matches("logoutErrored")){
        errorTitle = "Logout"
        subtitle = "logging you out. "
    }
    else{
        errorTitle = ""
        subtitle = "saving your changes. "
    }

    return (
        <div className='bg-white block w-[30rem] h-[32rem] mx-auto mt-20 rounded-xl font-medium text-xl shadow-md shadow-gray-400/100 border-4 border-red-700'>
            <div className='bg-red-700 pt-6 text-center'>
            <span class="material-symbols-outlined w-40 text-white text-7xl">
                error
            </span>
            </div>
            <div className='block pt-6 pb-6 bg-red-900 text-center text-white font-bold text-2xl'>
                {errorTitle} Error
            </div>
            <div className='px-6 py-12 text-center'>
                <div className='font-bold mb-6'>
                    ERROR_MSG: {props.state.context.errorMsg}
                </div>
                <div className='font-normal text-lg mb-10'>
                    It appears that we encountered an error while {subtitle}
                    Please make sure <span className='font-bold'>{reason}</span> and try again.
                </div>
                <button onClick={() => props.send("RETRY")}
                    className='bg-red-700 block mx-auto mt-6 w-2/5 h-16 text-white rounded-xl hover:bg-red-800 hover:shadow-lg hover:shadow-red-400/80'>
                    Retry
                </button>
            </div>
            
        </div>)
  
}
