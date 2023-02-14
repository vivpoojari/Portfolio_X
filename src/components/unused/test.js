import { useState } from "react"
import boxes from "./box"
import Square from "./squ"


function Test_box() {
    let [box, setBox] = useState(boxes)

    function flip(id) {
        setBox(prev => {
            // let temp = [...prev]
            // temp[id].isOn = !prev[id].isOn
            // return temp
            //the issue is that state is being updated as an array of objects, but the objects themselves are not being updated. in js objects are passed by reference. 
            //So when you update an object in array the reference to the object remains the same. To fix the issue, you need to create a new object with the updated properties and replace
            //it with old object in array. This way react sees new reference to object and re-render component
            let temp = [...prev]
            let updatedBox = {...temp[id], isOn: !temp[id].isOn}
            temp[id] = updatedBox
            return temp
        })
    }
    let board = box.map((item) => (
        <Square 
            key={item.id}
            id={item.id}
            on={item.isOn}
            flip={flip} 
        />
    ))

    return (
        <div className = 'main'>
            {board}
        </div>
    )
}

function Test(){
    let [formData, setFormData] = useState({usern:"", pass: "", comments:"", 
        isAdult:false, gender:"", favColor:""})

    console.log("rendered")

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
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type = 'text' onChange={handleChange} placeholder='Enter username'
                name = 'usern' value = {formData.usern} />
                <input type = 'password' onChange={handleChange} placeholder='Enter password'
                name = 'pass' value = {formData.pass} />
                <textarea onChange={handleChange} placeholder='comments'
                name = 'comments' value = {formData.comments} />
                <input type = 'checkbox' onChange={handleChange} id = 'isAdult' 
                name = 'isAdult' checked={formData.isAdult} />
                <label htmlFor="isAdult">Are you adult?</label>
                <fieldset>
                    <input type = 'radio' onChange={handleChange} name = 'gender' value = "male" 
                    id = "male" checked = {formData.gender == "male" ? true:false} />
                    <label htmlFor="male">Male</label>
                    <input type = 'radio' onChange={handleChange} name = 'gender' value = "female" 
                    id = "female" checked = {formData.gender == "female" ? true:false} />
                    <label htmlFor="female">Female</label>
                </fieldset>
                <select id = 'favColor' name = 'favColor' value = {formData.favColor}
                onChange={handleChange}>
                    <option value="">Choose</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="blue">Blue</option>
                </select>
                <br></br>
                <button>submit me</button>
            </form>
            
            
        </div>
    )
}

export default Test