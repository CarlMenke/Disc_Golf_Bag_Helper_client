import React from 'react'
import ReactDOM from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'

export const Login = (props) =>{

console.log(props)



    const [userName , setNewUser] = useState('')
    const [userPassword , setnewUserPassword] = useState('')

    const logged = props.logged
    const loggedUser = props.loggedUser

    const setLogged = props.setLogged
    const setLoggedUser = props.setLoggedUser

    async function checkUser(){
        if(userName != '' && userPassword != ''){
            const response = await axios.get(`http://localhost:3001/api/checkUser/${userName}/${userPassword}`)
            console.log('login response' ,response)

            if(response.data.exists === false){
                console.log('User Doesnt Exist Or password is incorrect')
            }
            else if(response.data === 'Password Incorrect'){
                console.log(response.data)
            }else{
                setLogged(response.data.exists);
                setLoggedUser(response.data.user[0])
                console.log(props)
            }

        }

    }

    useEffect(()=>{

        if(logged){
            props.navigate('/')
        }

    },[logged, loggedUser])

    useEffect(()=>{
        checkUser()
    },[userPassword])

    const handleLogin = () =>{
        const userNameInput = document.getElementById('userNameInput').value;
        const userPasswordInput = document.getElementById('passwordInput').value;

        setNewUser(userNameInput)
        setnewUserPassword(userPasswordInput)
    }

    return(
        <div>
            <input type = 'form' placeholder = "username" id = 'userNameInput'/>
            <input type = 'form' placeholder = "password" id = 'passwordInput'/>
            <button type = 'submit' onClick = {()=>{
                handleLogin()
            }}>Log In</button> 
        </div>
    )
}
