import React, { useState } from 'react'

// username: kminchelle , password: 0lelplR

export default function LoginPrompt(props) {
    let [formData, setFormData] = useState({usern:"", pass: "", comments:"", 
    isAdult:false, gender:"", favColor:""})

    function handleChange(event){
        let {name, value, type, checked} = event.target
        setFormData(prev => {
            return {
                ...prev,
                [name] : (type === "checkbox") ? checked : value
            }
        })
    }

    function formSubmit(event) {
        event.preventDefault()
        console.log(formData)
        props.send({
            type: "LOGIN", 
            cred: {
                username: formData.usern,
                password: formData.pass
            }
        })

    }
    return (
        <div className='bg-white block w-[35rem] h-[37rem] m-auto mt-20 px-16 py-10 rounded-md shadow-md shadow-zinc-400/60'>
        <form onSubmit={formSubmit} className='space-y-8 font-medium text-xl'>
                <div className='text-3xl font-bold text-black text-center'>
                    <span className="material-symbols-outlined text-5xl">
                        login
                    </span><br></br>
                    Log in
                </div>
                <hr></hr>
                <div>
                    Enter username<br></br>
                    <input type = 'text' onChange={handleChange} required
                    name = 'usern' value = {formData.usern} 
                    className="bg-transparent w-full h-14 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div>
                    Password<br></br>
                    <input type = 'password' onChange={handleChange} required
                    name = 'pass' value = {formData.pass}
                    className="bg-transparent w-full h-14 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div>
                    <span className='text-sky-500 mx-auto block text-center'>
                        Forgot password? 0lelplR
                    </span>
                    <button className='bg-blue-700 block mt-6 w-full h-14 text-white rounded-md hover:bg-blue-800'>
                        {props.state.matches("initial") ? "Log In ": "logging in..."}
                    </button>
                </div>
                
            </form>
        </div>
    )
}
