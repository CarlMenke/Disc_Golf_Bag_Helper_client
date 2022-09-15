import React from 'react'
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts';

export const Account = (props) =>{

    const [userPosts, setUserPosts] = useState();
    const [load, setLoad] = useState(false)
    

    if(!props.logged){
        return(
            <div>You are not logged in. Please Log in or sign up to view account details</div>
        )
    }

    const handleDeleteUser = async() =>{
        const response = await axios.get(`http://localhost:3001/api/deleteUser/${props.loggedUser._id}`)
        props.setLogged(false)
        props.setLoggedUser(null)
        props.navigate('/')
        props.getRecentPostArray();
    }


    const handleUpdateUserName = async  () =>{

        const newUserName = document.getElementById('new-user-name').value

        const response = await axios.get(`http://localhost:3001/api/updateUser/${props.loggedUser._id}/${newUserName}`)
    }

    const getPostsByUser = async()=>{
        const response = await axios.get(`http://localhost:3001/api/posts-by-user/${props.loggedUser._id}`)
        console.log(response.data)
        setUserPosts(response.data)
    }

    useEffect(()=>{
        setLoad(true)
    },[userPosts])

    useEffect(()=>{
        getPostsByUser()
    },[])



    console.log('userDiscs', props.loggedUser.userDiscs)
    if(load){
    return(
        <div>
            <h1>{props.loggedUser.userName}</h1>
            <img className = 'account-pic' alt  = 'profile picture' src = {props.loggedUser.profilePic}></img>
            <button onClick = {()=>{
                props.setLogged(false)
                props.setLoggedUser(null)
                props.navigate('/')
            }}>Log Out</button>
            <button onClick = {() =>{handleDeleteUser()}}>Delete Account</button>
            <input placeholder = "Enter New User Name" type= "form" id = 'new-user-name'/>  
            <button onClick = {()=>{handleUpdateUserName()}}>Update UserName</button>
            <Posts currTopic = 'general' displayArray = {userPosts}/>
            <div>
                {
                    props.loggedUser.userDiscs.map((disc,index)=>{
                        return(
                            <div key={index}>
                                {disc.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
        }else{
            return(<div>Loading</div>)
        }
}