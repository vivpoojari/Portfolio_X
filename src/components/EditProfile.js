import React, { useState } from 'react'

export default function ProfileEditor(props) {
    // let [formData, setFormData] = useState({usern:"", email:"", 
    // firstName:"",lastName:"", gender:"", favColor:"", pass: ""})
    let context = props.state.context
    let stateVal = props.state.value.loggedIn
    let [formData, setFormData] = useState({...context.userData})

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
        console.log("THIS IS FORM - ");
        console.log({...formData})
        props.send({
            type: "SaveChanges", 
            formData: {...formData}
        })
    }

    function discard(){
        alert("discarding changes...");
        props.send("Discard")
    } 

    function imageSetter(){
        let new_img = prompt("Enter image url")
        if (!new_img)
            return;

        setFormData(prev => {
            return {
                ...prev,
                image : new_img
            }
        })
    }


    return (
        <div className='wrapper flex ml-[15rem] mt-12'>

        <div className='bg-blue-700 mr-8 py-14 px-16 w-80 h-80 flex flex-col rounded-md shadow-lg shadow-gray-300/100'>
            <div className='block'>
                <img src = {formData.image} onClick={imageSetter}
                className='rounded-full mx-auto w-40 h-40 border-8 border-white bg-gray-300' />
            </div>
            <div className='block pt-4 text-center text-white font-bold text-2xl'>
                {formData.firstName} {formData.lastName}
            </div>
        </div>

        <div className='bg-white block w-[44rem] h-[36rem] px-16 py-10 rounded-md shadow-lg shadow-gray-300/100'>
            <form onSubmit={formSubmit} className='space-y-4 font-normal text-base'>
            <div className='text-2xl mb-6 font-semibold text-black text-center'>
                <span class="material-symbols-outlined text-6xl">
                    edit_note
                </span><br></br>
                Edit Profile
            </div>
            <hr></hr><br></br>
            <div className='w-full h-[20rem] grid grid-cols-2 grid-rows-3 gap-10'>
                <div className=''>
                    <span className='font-medium text-lg pl-1'>First name</span><br></br>
                    <input type = 'text' onChange={handleChange} value = {formData.firstName}
                    name = 'firstName' required
                    className="bg-transparent w-full h-10 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div className=''>
                    <span className='font-medium text-lg pl-1'>Last name</span><br></br>
                    <input type = 'text' onChange={handleChange} value = {formData.lastName}
                    name = 'lastName' required
                    className="bg-transparent w-full h-10 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div>
                    <span className='font-medium text-lg pl-1'>Email</span><br></br>
                    <input type = 'text' onChange={handleChange} value = {formData.email}
                    name = 'email' required
                    className="bg-transparent w-full h-10 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div>
                <span className='font-medium text-lg pl-1'>Username</span><br></br>
                    <input type = 'text' onChange={handleChange} value = {formData.username}
                    name = 'username' required
                    className="bg-transparent w-full h-10 mt-2 border-2 border-slate-200 rounded-md pl-3" />
                </div>
                <div>
                    <input type = 'radio' onChange={handleChange} name = 'gender' value = "male" 
                    id = "male" checked = {formData.gender == "male" ? true:false} />
                    <label htmlFor="male" className='font-medium text-lg pl-3'>Male</label>
                </div>
                <div>
                    <input type = 'radio' onChange={handleChange} name = 'gender' value = "female" 
                    id = "female" checked = {formData.gender == "female" ? true:false} />
                    <label htmlFor="female" className='font-medium text-lg pl-3'>Female</label>
                </div>
            </div>
            <div className='ml-16'>
                <div className='flex space-x-10'>
                <button className="text-blue-700 font-medium text-lg bg-white h-16 w-52 px-8 py-3 float-right rounded-md hover:border-4 hover:bg-white hover:border-blue-700 shadow-lg shadow-gray-300/100">
                    {stateVal === "Editing Profile" ? "Save changes ": "saving..."}
                </button>
                <div onClick={()=>props.send('Discard')}
                    className="text-white bg-blue-700 font-medium text-lg flex justify-center items-center w-52 h-16 rounded-md hover:shadow-lg hover:shadow-blue-400/80">
                    Discard changes
                </div>
            </div>
            </div> 
            </form>
        </div>
        </div>
    )
}
