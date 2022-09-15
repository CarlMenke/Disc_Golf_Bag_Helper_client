import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";



export const DiscDetails = (props) =>{

    const navigate = useNavigate()


    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('hidden')


    const addDiscToUser = async (e) =>{


        if(props.logged && props.selectedDisc !== null){
            e.target.className = 'hidden'
            const response = await axios.put(`https://dgb-server.herokuapp.com/api/updateUserDiscs/${props.loggedUser._id}`,{disc:props.selectedDisc})
            setMessage(`${props.selectedDisc.name} Added To Bag!`)
            setDisplay('visible')
        }else{
            setMessage("Please Login to Create a Bag.")
            setDisplay('visible')
        }

    }

    if(props.discsArray !== null && props.recentPostsArray !== null && props.selectedDisc !== null){   

        return(
            <div >
                <button onClick = {()=>{props.navigate('/')}}>Home</button>
                <div className = 'disc-details'>
                    <div>{props.selectedDisc.name}</div>
                    <div>{props.selectedDisc.category}</div>
                    <div className = 'disc' style={{backgroundColor:`${[props.selectedDisc.color]}`}}>{props.selectedDisc.name}</div>
                    <img src = {props.selectedDisc.pic}></img>
                </div>
                <button  onClick = {addDiscToUser}>Add To Bag</button>
                <button onClick = {()=>{
                navigate('/viewDiscs')
            }}>All Discs</button>
            <div className = {`${display}`}>{message}</div>
                <div className = 'disc-posts'>
                    <Posts {...props} logged = {props.logged} style = {'view'} loggedUser = {props.loggedUser} displayArray = {props.recentPostArray} setRecentPostArray = {props.setRecentPostArray} currTopic = {props.selectedDisc.name}/>
                </div>
            </div>
        )
    }else{
        return(
            <div>
            <div>Loading</div>
            <button onClick = {()=>{
                navigate('/')
            }}>Home</button>
                    <button onClick = {()=>{
                navigate('/viewDiscs')
            }}>All Discs</button>
        </div>
        )
    }
}


// add a topic id to all posts
//
