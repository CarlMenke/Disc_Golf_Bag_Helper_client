import React from 'react'
import axios from 'axios'
import Posts from './Posts'

import { useNavigate } from "react-router-dom";



export const DiscDetails = (props) =>{
    const navigate = useNavigate()

    const addDiscToUser = async (e) =>{
        if(props.logged && props.selectedDisc !== null){
            e.target.className = 'hidden'
            const response = await axios.put(`https://dgb-server.herokuapp.com/api/updateUserDiscs/${props.loggedUser._id}`,{disc:props.selectedDisc})
            props.setBagDiscs(props.loggedUser.userDiscs)
            setMessage(`${props.selectedDisc.name} Added To Bag!`)
            setDisplay('visible')
        }else{
            setMessage("Please Login to Create a Bag.")
            setDisplay('visible')
        }
    }

    if(props.discsArray !== null && props.recentPostsArray !== null && props.selectedDisc !== null){   
        const disc = props.selectedDisc;

    return(
        <div className = 'disc-posts-detailed'>
            <div className = 'disc-container-home'>
                <div className ="disc-card-name">{disc.name}</div>
                <div className = 'brand-category'>
                    <div className = 'container'>
                        <div className = 'disc-card-brand-label'>Brand:</div>
                        <div className ="disc-card-brand" >{disc.brand}</div>
                    </div>
                    <div className = 'container'>
                        <div className = 'disc-card-brand-label'>Category:</div>
                        <div className ="disc-card-brand" >{disc.category}</div>
                    </div>
                </div>
                <div className = 'pic-stats'>
                    <div className = 'stats'>
                        <div className = 'container'>
                            <div className = 'disc-card-brand-label'>Stability:</div>
                            <div className ="disc-card-brand" >{disc.stability}</div>
                        </div>
                        <div className = 'container'>
                            <div className = 'disc-card-brand-label'>Turn:</div>
                            <div className ="disc-card-brand" >{disc.turn}</div>
                        </div>
                        <div className = 'container'>
                            <div className = 'disc-card-brand-label'>Fade:</div>
                            <div className ="disc-card-brand" >{disc.fade}</div>
                        </div>
                        <div className = 'container'>
                            <div className = 'disc-card-brand-label'>Glide:</div>
                            <div className ="disc-card-brand" >{disc.glide}</div>
                        </div>
                        <div className = 'container'>
                            <div className = 'disc-card-brand-label'>Speed:</div>
                            <div className ="disc-card-brand" >{disc.speed}</div>
                        </div>
                        <a className = 'purchase' href = {disc.link}>Purchase</a>
                    </div>
                    <img className = 'disc-img-detailed' src = {`${disc.pic}`}/>
                </div>
            </div>
                <div className = 'disc-posts'>
                    <button  className = 'form-button' onClick = {addDiscToUser}>Add To Bag</button>
                    <button className = 'form-button' onClick = {()=>{
                    navigate('/viewDiscs')
                    }}>All Discs</button>
                    <div className = 'disc-posts'>
                        <Posts {...props} logged = {props.logged} style = {'view'} loggedUser = {props.loggedUser} displayArray = {props.recentPostArray} setRecentPostArray = {props.setRecentPostArray} currTopic = {props.selectedDisc.name}/>
                    </div>
                </div>
        </div>
        )

    }else{
        return(
            <div>
            <div>Loading</div>
            <button className = 'form-button' onClick = {()=>{
                navigate('/')
            }}>Home</button>
                    <button 
                    className = 'form-button'onClick = {()=>{
                navigate('/viewDiscs')
            }}>All Discs</button>
        </div>
        )
    }
}

