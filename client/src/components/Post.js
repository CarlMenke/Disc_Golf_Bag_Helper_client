import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Post = (props) =>{
    console.log(props.post)
    const[postOwnerName, setPostOwnerName] = useState('')
    const[postOwnerPic,setPostOwnerPic] = useState('')

    let create = true;
    const getUser = async () =>{
        const response = await axios.get(`http://localhost:3001/api/user/${props.post.user_id}`)
        if(response.data[0] != undefined){
            setPostOwnerName(response.data[0].userName)
            setPostOwnerPic(response.data[0].profilePic)
        }else{
            create = false
        }
}

useEffect(()=>{
    getUser()
})

if(create){
    return(
        <div className='post-container'>
            <img className = 'post-pic' src = {postOwnerPic}></img>
            <div className = 'post-name'>{postOwnerName}</div>
            <div className = 'post-topic'>Topic: {props.post.topic_id}</div>
            <div className = 'post-content'>{props.post.content}</div>
        </div>
    )
}else{
    return(
        <div>
            Loading
        </div>
    )
}

}

export default Post
