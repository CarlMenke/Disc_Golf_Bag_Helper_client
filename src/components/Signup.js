import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = (props) =>{

    const navigate = useNavigate()

    const [newUserName , setNewUser] = useState('')
    const [newUserPassword , setnewUserPassword] = useState('')
    const [newUserProfilePic , setUserProfilePic] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('hidden')

    const logged = props.logged
    const loggedUser = props.loggedUser



    async function createUser(){
        if(newUserName != ''){
            const response = await axios.post(`https://dgb-server.herokuapp.com/api/newUser/${newUserName}/${newUserPassword}`, {profilePic:newUserProfilePic})

            console.log(response.data.user)
            props.setLogged(true)
            props.setLoggedUser(response.data.user)
            props.setBagDiscs(response.data.user.userDiscs)
            navigate('/')
        }
    }

    useEffect(()=>{
        if(logged){
            props.navigate('/')
        }
    },[logged, loggedUser])

    useEffect(()=>{
        createUser()
    },[newUserName,newUserPassword,newUserProfilePic])

    const handleNewUserSubmit = async (e) =>{
        e.preventDefault()

        let  allUsers = await axios.get('https://dgb-server.herokuapp.com/api/allusers')

        const newUserNameInput = document.getElementById('userNameInput').value;
        const newUserPasswordInput = document.getElementById('passwordInput').value;
        const newUserProfilePicInput = document.getElementById('profilePicInput').value;

        let checkArray = allUsers.data.filter((user)=>{return user.userName === newUserNameInput})

        if(checkArray.length === 0){
            setNewUser(newUserNameInput)
            setnewUserPassword(newUserPasswordInput)
            setUserProfilePic(newUserProfilePicInput)
        }else{
            setMessage('User name already in use')
            setDisplay('visible')
        }
    }

    return(
        <div className = 'form-container'>
            <form onSubmit = {handleNewUserSubmit} className = 'form'>
                <input className = 'form-input' type = 'form' placeholder = "Username" id = 'userNameInput'/>
                <input className = 'form-input'  type = 'form' placeholder = "Password" id = 'passwordInput'/>
                <input className = 'form-input'  type = 'form' placeholder = "Profile Picture" id = 'profilePicInput'/>
                <button className = 'form-button' type = 'submit' >Sign Up</button> 
            </form>
            <div className = {display}>{message}</div>
        </div>
    )
}