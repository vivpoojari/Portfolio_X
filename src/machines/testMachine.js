import { createMachine, assign } from "xstate";

const api_url = process.env.REACT_APP_DUMMYJSON_API

export const loginMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBkD2UCWA7AsgQwGMALbMAOmwwBcM8AbAYmQHkBxASQDkBtABgF1EoAA6pY1DKixCQAD0QB2ABxkFARgBsCjQE4dAFiUBmXjoBMRgDQgAnogC0agKxGyGtQqP7e+s06XOCgC+QdZomLiEJFjkdOgRUOxYDBBS5NgAbqgA1uTh2PjEpGRxUAlJCJmoBHg0Unz8DTKi4nXSSHKITvpkah4KOgoKvErdRp7WdghqvGq9g57+fbM6GvohYegFUcWl5clgAE6HqIdkwnS1AGanALZk+ZFFMSXx2IlYlVhZNW0NTR0WhIpDJ5AgzPpXMMNGZBs4lIYlMpJg5XGojIMjGokU4nO4sRsQI9CtFyDAqDQsFAACK1PApNIUb45PJbJ6ksjkyk0ulfH61SRYf4CZpiYHtUBg7q9DwBbGwkxmHwohDjMxkIyazX6XQBLyE4k7F5c960qj0o4nM4Xa53B5sknFE1Us14PnVAX1AQAkRitqgxCa9W8GH+VZqHQYpS8BQqiPqsyeby6iFmbFKA0Oo2xeKQJJMNjMACqABUfSAgf6OmDHLxXDHeN1YX4zKNunGBqozGmtINump9M5MxFHS89nmsGQAGoYMAAd3eAAJabAiAAjVB4Q4QBgAUQg1EXAAUTlcMHQwOXK4KAwhcWQ9CGfI3TJ5E04VRolCpYcokdpBh0IdQiJLNnhzMoJzIfcJCpY9T3PMAGAAZTwDIwAAYSIPAqTgK8-RvasHAjDVBg0WZYRhYwnDMDQVW-OZvzxAZo10OsdGHbZwNeSCICSaCD25eDUDPC8GGpDBYBqbd8NaQjJVRdUnB8GZ1HUJxhjrFUFH0BRVCUXQtBbFxZk49ldlzPjJ0OMAAEcAFc4CoGCqAZF4qlye0R2zHiYCssgbIcpyXPdX5BWFQRAQIkEiIQRxfH08wtA0zwNC-WNbEQGZnDICFDOUNjeG7MzRwgvz+MCxzYGcwSGEtU5zkuKgbkOe5DW48d-Mq4LBNCz0hW9EUorkmKFOmXQH0hbRdJjUYsSUejjFI5TfAM-wNCcDiQPajlOv4lz3l3Y5TkgBgACVdxLM6AE1ZPFW8I1cCF-H8fRDE2pF9G0xsHyAzQ1iKvp-BKny9neZh7Nc1J3OZTydosspwchvq-kGyLfRGiVOji5w5j+qi-FMBEFsyuK-B6OE1FoowGLxYrtrA3a3ipCHXPq60mpatrGYRhJWZR8K0dFTHb3sbsNAfWbzDrPFVKsUn7GUsgnGxGajHJt8zBBjq2SOq1Touq7bqGjH7tikxeFyr8NLepUhimlUxbWX79DxGjcXTYxtaZqBUEhvWTp3Q2bruqsxrFn60o0nwXFlmN5amHQVHWpRaOjQZB0HEIQKwVAIDgGR4ZiYWzfDxMKalpUjDj7RHer9Uk6McigPtxZggZ7zuMoGh6BLsPselJ9uiGbKET0R3aKcMhDCb2ZumjAYfG93n3iSPv5OxnVcte2EI0fBR3Yny26aRNLy6-Irl+NMAKVNOl19GzeJb8BFd70HQY0P0mLDmLVtSxBQfgDBXzKhOB+WMawRktsoJKB8hhN3Siqd209AEmEHAfGE1cQG+SgjOecS4Vzrk3NucBD0JaQibniHQKsdJflop+KmD5UH6D0Crfe2C9qTgOnBE8IlEKkNio4OYtEDDqDVNoCMGUpgLwfNiIYGCkRAQ4ZZCqdkqo1WoAIsa5g3CaFdk3D+BhG5xiKlPdQ35yYaSAuMZRvF9qCUOsdGyEAtHYw8M-DE5E6xKlWGmBOigdJkF4D4ZKmokTYlsXzSGrjIHfl6LiFhqdVhTS+grDwwZVbaC0Cw8w6wO5cR9tgAOziYmIHLigtKb0WHBJlqkqYjhpQYhjEMOEBhGy2L9s5JxkBSlkzTBqEM6tqHV3cPHOMKgRh0IvhnAcEJs5BCAA */
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
                onDone: {
                    target: "gettingData",
                    actions: 'alertLogger'
                    //actions: ['assignUserData','alertLogin']
                }
            }
        },
        gettingData: {
            invoke:{
                src:'tryGetData',
                onDone: {
                    target: "loggedIn",
                    actions: ['assignUserData','alertLogin']
                },
                onError: [{
                    target: "loginErrored",
                    actions: 'assignErr',
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
        },

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
        alertLogger: (context, event) => {
            alert("Login successful. Now fetching data...")
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
                const res = await fetch("https://dummyjson.com/auth/login", {
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
        tryGetData: async (context,event) => {
            try {
                const res = await fetch("https://dummyjson.com/auth/login", {
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
        tryLogOut: async (context,event) => {
            try {
                const res = await fetch("https://dummyjson.com/auth/login", {
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
                const res = await fetch("https://dummyjson.com/auth/login", {
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