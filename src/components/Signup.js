import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

export const Signup = (props) =>{

    const [newUserName , setNewUser] = useState('')
    const [newUserPassword , setnewUserPassword] = useState('')
    const [newUserProfilePic , setUserProfilePic] = useState('')


    async function createUser(){

        if(newUserName != ''){

            const response = await axios.post(`http://localhost:3001/api/newUser/${newUserName}/${newUserPassword}`, {profilePic:newUserProfilePic})
            console.log(response)
        }

    }

    useEffect(()=>{
        createUser()
    },[newUserName])

    const handleNewUserClick = async () =>{

        let  allUsers = await axios.get('http://localhost:3001/api/allusers')

        const newUserNameInput = document.getElementById('userNameInput').value;
        const newUserPasswordInput = document.getElementById('passwordInput').value;
        const newUserProfilePicInput = document.getElementById('profilePicInput').value;

        let checkArray = allUsers.data.filter((user)=>{return user.userName === newUserNameInput})

        console.log('newUserName', newUserName)
        console.log('allUsers.data', allUsers.data)
        console.log('checkArray', checkArray)

        if(checkArray.length === 0){
            setNewUser(newUserNameInput)
            setnewUserPassword(newUserPasswordInput)
            setUserProfilePic(newUserProfilePicInput)
        }else{console.log('User name already in use please choose a differnt name.')}
    }

    return(
        <div>
            <input type = 'form' placeholder = "username" id = 'userNameInput'/>
            <input type = 'form' placeholder = "password" id = 'passwordInput'/>
            <input type = 'form' placeholder = "profilepic" id = 'profilePicInput'/>
            <button type = 'submit' onClick = {()=>{
                handleNewUserClick()
            }}>Sign Up</button> 
        </div>
    )
}