import React, { useState } from 'react'
import Dashboard from './Dashboard'
import ProfileEditor from './EditProfile'

import qt from '../images/qt.png'



export default function LoggedIn(props) {

    let stateVal = props.state.value.loggedIn

    return (
        <>
        {(stateVal === "Viewing Dashboard") && 
        <Dashboard state={props.state} send={props.send} />}
        {(stateVal === "Editing Profile" || 
          stateVal === "requestEdit") && 
        <ProfileEditor state={props.state} send={props.send} />}
        </>
    )
}

//Context -
//{"cred":{"username":"kminchelle","password":"0lelplR"},
//"userData":{"id":15,"username":"kminchelle","email":"kminchelle@qq.com",
//"firstName":"Jeanne","lastName":"Halvorson","gender":"female",
//"image":"https://robohash.org/autquiaut.png"},"errorMsg":"Invalid Credentials"}


