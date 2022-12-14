import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Post from './Post'

const Posts = (props) =>{
    
    const [creatingPost , setCreatingPost] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');

    const createNewPost = async () =>{
        if(props.logged && newPostContent !== ''){
        const response = await axios.get(`https://dgb-server.herokuapp.com/api/newPost/${newPostContent}/${props.loggedUser._id}/${props.currTopic}`)
        props.setRecentPostArray([response.data.post,...props.displayArray])
        }
    }

    useEffect(()=>{
        createNewPost()
    },[newPostContent])

    if(!creatingPost && props.displayArray !== undefined){
        return(
            <div>
                <div className='posts-container'>
                <div>               
                    <button 
                    className = 'form-button'onClick = {(e)=>{
                        setCreatingPost(true)
                    }} >Create Post</button>
                </div>
                <div className = 'posts-display-home'>
                    {props.displayArray.map((post, index)=>{
                        return(
                            <Post post = {post} key = {index}/>
                        )
                        })}
                </div>
                </div>
            </div>
        )
    }else if(props.displayArray !== undefined){
        return(
            <div>
                <div className='posts-container'>
                <div>               
                    <input 
                        className='form-input'
                        placeholder = 'content' id = 'new-post-content' />
                    <button 
                        className='form-button'
                        onClick = {()=>{
                            setNewPostContent(document.getElementById('new-post-content').value)
                            setCreatingPost(false)
                        }}>Post
                    </button>
                </div>
                    <div>
                        {props.displayArray.map((post, index)=>{
                            return(
                                <Post post = {post} key = {index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>Loading</div>
        )
    }
}

export default Posts

