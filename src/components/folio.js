import React, { useState } from 'react'
import {useMachine} from "@xstate/react"
import { loginMachine } from '../machines/testMachine'
import LoginPrompt from './signIn'
import LoggedIn from './loggedIn'
import PageError from './pageError'
import LoginNav from './loginNav'


export default function Login() {
    const [loginState,send] = useMachine(loginMachine)

    let ifErrorState = checkErrorState(loginState)
    consoleLogger(loginState)
                    

    return (
        <>
            <div>
            <LoginNav send={send} state={loginState} />

            {ifErrorState && <PageError send={send} state={loginState} />}

            {(loginState.matches("initial") || loginState.matches("loggingIn")) && 
            <LoginPrompt send={send} state={loginState} />}

            {loginState.matches("loggedIn") && 
            <LoggedIn send={send} state={loginState} />}

            </div>
        </>
        
    )
}


function consoleLogger(loginState){
    //for logging current state and context into console
    let currState = JSON.stringify(loginState.value)
    let currContext = {...loginState.context}
    delete currContext.userData.token
    currContext = JSON.stringify(currContext)

    console.log("DOM rendered")
    console.log(`\nSTATE -> \n${currState}\n\nContext -\n${currContext}`);
    //SHIFT + TAB to reverse tab
}


function checkErrorState(loginState){
    return (loginState.matches("loginErrored")    || 
            loginState.matches("logoutErrored")   ||
            loginState.value.loggedIn === "EditingErrored")
}