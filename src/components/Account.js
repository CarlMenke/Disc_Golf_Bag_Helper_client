import React from 'react'
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts';
import { Bag } from './Bag';

export const Account = (props) =>{

    const [userPosts, setUserPosts] = useState();
    const [load, setLoad] = useState(false)

    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('hidden')
    

    if(!props.logged){
        return(
            <div>You are not logged in. Please Log in or sign up to view account details</div>
        )
    }

    const handleDeleteUser = async() =>{
        const response = await axios.get(`https://dgb-server.herokuapp.com/api/deleteUser/${props.loggedUser._id}`)
        props.setLogged(false)
        props.setLoggedUser(null)
        props.navigate('/')
        props.getRecentPostArray();
    }


    const handleUpdateUserName = async  () =>{

        const newUserName = document.getElementById('new-user-name').value

        const response = await axios.get(`https://dgb-server.herokuapp.com/api/updateUser/${props.loggedUser._id}/${newUserName}`)
        setMessage(response.data)
        setDisplay('visible')
        props.navigate(0)
    }

    const getPostsByUser = async()=>{
        const response = await axios.get(`https://dgb-server.herokuapp.com/api/posts-by-user/${props.loggedUser._id}`)
        setUserPosts(response.data)
    }

    useEffect(()=>{
        setLoad(true)
    },[userPosts])

    useEffect(()=>{
        getPostsByUser()
    },[])


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
            <div className = {display}>{message}</div>
            <Posts currTopic = 'General' displayArray = {userPosts}/>
            <div>
            <div> 
                    <Bag  bagDiscs = {props.bagDiscs} setBagDiscs ={props.setBagDiscs} loggedUser = {props.loggedUser} logged = {props.logged} setSelectedDisc = {props.setSelectedDisc}/>
                </div>
            </div>
        </div>
    )
        }else{
            return(<div>Loading</div>)
        }
}