import React from 'react'
import ReactDOM from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Login = (props) =>{

    const [userName , setNewUser] = useState('')
    const [userPassword , setnewUserPassword] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('hidden')

    const logged = props.logged
    const loggedUser = props.loggedUser
    const setLogged = props.setLogged
    const setLoggedUser = props.setLoggedUser

    async function checkUser(){
        if(userName != '' && userPassword != ''){
            const response = await axios.get(`https://dgb-server.herokuapp.com/api/checkUser/${userName}/${userPassword}`)
            if(response.data.exists === false){
                setMessage('User Doesnt Exist')
                setDisplay('visible')
            }
            else if(response.data === 'Password Incorrect'){
                setMessage('Password is incorrect')
                setDisplay('visible')
            }else{
                setLogged(response.data.exists);
                setLoggedUser(response.data.user[0])
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
    },[userPassword,userName])

    const handleLogin = (e) =>{
        e.preventDefault()

        const userNameInput = document.getElementById('userNameInput').value;
        const userPasswordInput = document.getElementById('passwordInput').value;

        setNewUser(userNameInput)
        setnewUserPassword(userPasswordInput)
    }

    return(
        <div className = 'form-container'>
            <form onSubmit = {handleLogin}  className = 'form'>
                <input className = 'form-input' type = 'form' placeholder = "username" id = 'userNameInput'/>
                <input className = 'form-input' type = 'form' placeholder = "password" id = 'passwordInput'/>
                <button className = 'form-button' type = 'submit' >Log In</button> 
            </form>
            <div className = {`${display}`}>{message}</div>
        </div>
    )
}
