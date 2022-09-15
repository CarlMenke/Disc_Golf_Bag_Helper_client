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

    const setLogged = props.setLogged
    const setLoggedUser = props.setLoggedUser



    async function createUser(){

        if(newUserName != ''){

            const response = await axios.post(`https://dgb-server.herokuapp.com/api/newUser/${newUserName}/${newUserPassword}`, {profilePic:newUserProfilePic})
            

            setLogged(true)
            setLoggedUser(response.data.user)
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

    const handleNewUserClick = async (e) =>{
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
        <div>
            <form onSubmit = {handleNewUserClick}>
                <input type = 'form' placeholder = "username" id = 'userNameInput'/>
                <input type = 'form' placeholder = "password" id = 'passwordInput'/>
                <input type = 'form' placeholder = "profilepic" id = 'profilePicInput'/>
                <button type = 'submit' >Sign Up</button> 
            </form>
            <div className = {display}>{message}</div>
        </div>
    )
}