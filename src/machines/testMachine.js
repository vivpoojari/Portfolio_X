import { createMachine, assign } from "xstate";

export const loginMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBkD2UCWA7AsgQwGMALbMAOmwwBcM8AbAYmQHkBxASQDkBtABgF1EoAA6pY1DKixCQAD0QB2ABxkFARgBsCgJwbtatQBYAzACYlAGhABPRAFpNhsod691Sw2oCsn3toC+-lZomLiEJFjkdOihUOxYDBBS5NgAbqgA1uQh2PjEpGTRULHxCGmoBHg0Unz8tTKi4tXSSHKISqZkSo4e6urGegpWtghqvGpkatoKCsZe3WNTGoaBwei54QVFJQlgAE57qHtkwnRVAGZHALZkOWH5kYUx2HFYZVjplc219a2NElIZPIEGYJqZeBpTNNvB4lHDhvY1AoyF45holMYMX4jJiFKsQHc8hEojFIPEmGxmABVAAqvxEYgBLVAwIcvGMZDcvB8UNMXnMXh8CNGOlUplMmh0Ch8Rm8+MJm0e2zJWDIADUMGAAO4vAAEABE8LAiAAjVB4PYQBgAUQg1F1AAVDucMHQwPSQP9mkDECZnNoIeyvApDPCbL7NGQNMY1BLtF5NEYFKZ5et7sSnsUVWRbRIsFBHc7XWAGABlPCpMAAYSIeHzcA9XskzLaCDsMa60w04xmpmMCnRvFMwo0YzIcfG3lRfOmqdCRK2pIg8Rzdpo+cLqBdboY+owsEqlsbjO9rVZhi8nN4vgHhgH0eM1+Fd40k3BUKU2m0cKUXgCQQJNMFyVJcVz2MAAEcAFc4CoXMqESZIKA+TJsiAxUSSzZdVXA6DYPg95PiqZsfgEBoT2bH02yncdP1MQdUUMbtvGFEMOXmIcv1HVF5jnDYHkwmBsLIXCYNgOC1wYfZDmOU4LmuW50IEzMhLAyCxIk6hCIqYiagEY8mkos9EG8ZFDBMW8+yRP9tBHAwxQxENR3FCU8QAhVlOVYT4Jea0DiOSAGAAJWtGkgoATQMpkqLUJReFUC9fylPluSY59jCcMxzO-IxejldylIzbYXmYKCEKSR5yiyRT5wwlSSrK7SvhI-SyL+CjAWM6iEzIfRNHMFLv1DYU7D5JxoVjaM4W8SEUwK2rPOefNSoQ6SjhOM4qEuPYbg8oqlqgFamt0rBSMEdrDM6ll7HFV8A2UbRwTRMZZhGrx4oTXp2TG2ZxT49NF1CPyZMCkKwsitqGUultgUfeL6KS8zwRmCyRvo8btAvDR+UFWK4WMf7gMw1AyuBgKrTBiKotPa623BS8NGxhRrx40c3GMYVvxRJR0QRvwQ1lQIAKwVAIDgGQ9tIcjoao0aQ16tw6KDNmBxGuYORhWbun0PkNEJurKBoehpeirqfE5bsfBmRYPC-NHsecDFmJ8OKdGvfXFuKF54hNmnWyY8d5kMKEpi-NwcbRj7ISUe9TCcuK5rWBb9qwn2LtN2nRvZWjHoYjLneFPkOWjCFu2D2ZXHZD2U9U1UNW1PVDWNM0LQgX2jNpjltGMAYvGWaVsbmQx42FDKJkfPvuj0DEmL1+b+Jr7MfI3J0t2LdurtbUaOQHTH3FDX9+TvYVUVfPkJT8GMEyY-8k4XwHa5E9T8LXDeYfaeKDGWadcr7wVWPNtyCUwZwTBz0CseeAMQKp1VMvKAZNwJt3Tn7YEmgd7GHjF+DwoZ0S-hPkOMgPc4pcl-OzX81cH4NSoG-WWeNJiCmHh0XQFlDAjSRJ0cYvRGYhi-KYCBd8oGYWwAgyANCupxycC+ZY2VK5DzYebDBbgZjQkxtyCh0CSZwX8ogsRmdxTjwhGYeMz12bClipyHmHRBzTE8MHCBgQgA */
createMachine({
    initial:"initial",
    context: {
        cred: {
            username: "",
            password: ""
        },
        userData: {

        },
        tempData: {

        },
        errorMsg: undefined
    },
    states: {
        initial: {
            on: {
                LOGIN: {
                    target: "loggingIn",
                    actions: 'assignCred'
                }
            },
        entry: 'clrContext'
        },

        loggingIn: {
            invoke:{
                src:'tryLogIn',
                onError: [{
                    target: "loginErrored",
                    actions: 'assignErr',
                }],
                onDone: [{
                    target: "loggedIn",
                    actions: ['assignUserData','alertLogin']
                }]
            }
        },

        loggedIn: {
            on: {
                LOGOUT: "loggingOut"
            },

            states: {
                "Viewing Dashboard": {
                    on: {
                        "Edit Profile": "Editing Profile"
                    }
                },

                "Editing Profile": {
                    on: {
                        "SaveChanges": 
                        {
                            target: "requestEdit",
                            actions: "assignTempData"
                        },
                        "Discard" : "Viewing Dashboard"
                    }
                },
                
                "requestEdit" : {
                        invoke:{
                            src:'tryEdit',
                            onError: [{
                                target: "EditingErrored",
                                actions: 'assignErr',
                            }],
                            onDone: [{
                                target: "Viewing Dashboard",
                                actions: ['assignEditedData','alertSavedChanges']
                            }]
                        }
                },

                "EditingErrored": {
                    on: {
                        RETRY: "Viewing Dashboard"
                    }
                }
            },

            initial: "Viewing Dashboard"
        },

        loggingOut: {
            invoke:{
                src:'tryLogOut',

                onDone: [{
                    target: "initial",
                }],

                onError: "logoutErrored"
            }
        },

        loginErrored: {
            entry: 'alertError',
            on: {
                RETRY: "initial"
            }
        },

        logoutErrored: {
            on: {
                RETRY: "loggedIn"
            }
        }
    },

    id: "LoginMachine"
},
{
    actions: {
        alertLogin: (context, event) => {
            alert(`Welcome ${context.userData.firstName}!`)
        },
        alertError: (context, event) => {
            alert("We encountered an error.")
        },
        alertSavedChanges: (context, event) => {
            alert("Saved changes successfully.")
        },
        clrContext: assign({
            userData: {},
            cred: {username:"", password:""}
        }),
        assignCred: assign((context,event) => {
            return {
                cred: {...event.cred}
            }
        }),
        assignUserData: assign((context,event) => {
            return {
                userData: { ...event.data}
            }
        }),
        assignErr: assign((context,event) => {
            return {
                errorMsg: event.data.message
            }
        }),
        assignTempData: assign((context,event) =>{
            return {
                tempData: {...event.formData}
            }
        }),
        assignEditedData: assign((context,event) =>{
            return {
                userData: {...context.tempData}
            }
        })
    },
    services: {
        tryLogIn: async (context,event) => {
            try {
                const res = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: context.cred.username,
                        password: context.cred.password,
                        // username: 'kminchelle',
                        // password: '0lelplR',
                    })
                })
                const res1 = await res.json()
                console.log('API RESPONSE - ');
                console.log(res1)
                if(!res1.username && res1.message){
                    //when invalid credentials
                    throw Error(res1.message)
                }
                return res1;
            } 
            catch (error) {
                console.log('CATCH BLOCK- ');
                console.log('Error message - ');
                console.log(JSON.stringify(error.message))
                throw Error(error.message)
            }
        },

        tryLogOut: async (context,event) => {
            try {
                const res = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: context.cred.username,
                        password: context.cred.password,
                    })
                })
                const res1 = await res.json()
                if(!res1.username && res1.message)
                    throw new Error(res1)
                return res1;
            } 
            catch (error) {
                console.log(error.message)
                throw Error(error.message)
            }
        },

        tryEdit: async (context,event) => {
            try {
                const res = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: context.cred.username,
                        password: context.cred.password,
                    })
                })
                const res1 = await res.json()
                if(!res1.username && res1.message)
                    throw new Error(res1)
                return event.formData;
            } 
            catch (error) {
                console.log(error.message)
                throw Error(error.message)
            }
        }
    }
})