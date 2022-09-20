import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts';
import { Bag } from './Bag';

export const Account = (props) =>{

    const [userPosts, setUserPosts] = useState();
    const [load, setLoad] = useState(false)
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('hidden')

    const handleDeleteUser = async() =>{
        await axios.get(`https://dgb-server.herokuapp.com/api/deleteUser/${props.loggedUser._id}`)
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

    if(!props.logged){
        return(
            <div>You are not logged in. Please Log in or sign up to view account details</div>
        )
    }

    if(load){
    return(
        <div>
            <h1>
                Your Account
            </h1>
            <div className = 'posts-bag'>
                <div>
                    <h3>Your Posts</h3>
                    <Posts currTopic = 'General' displayArray = {userPosts}/>
                </div>
                <div >
                    <h3>Your Bag</h3>
                    <Bag  bagDiscs = {props.bagDiscs} setBagDiscs ={props.setBagDiscs} loggedUser = {props.loggedUser} logged = {props.logged} setSelectedDisc = {props.setSelectedDisc}/>
                </div>
            </div>
            <div className ='manage-account-container'>
                <h2>Manage Account</h2>
                <div className ='manage-account'>
                    <div className='update'>
                        <button className = 'form-button' onClick = {()=>{
                            props.setLogged(false)
                            props.setLoggedUser(null)
                            props.navigate('/')
                        }}>Log Out</button>
                        <button className = 'form-button' onClick = {() =>{handleDeleteUser()}}>Delete Account</button>
                    </div>
                    <div className='update'>
                        <input className = 'form-input' placeholder = "Enter New User Name" type= "form" id = 'new-user-name'/>  
                        <button className = 'form-button' onClick = {()=>{handleUpdateUserName()}}>Update UserName</button>
                    </div>
                    <div className = {display}>{message}</div>
                </div>
            </div>
        </div>
    )
        }else{
            return(<div>Loading</div>)
        }
}