import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts'
import { useNavigate } from 'react-router'
import { Disc, Discs } from './Discs'

export const Home = (props) =>{

    const navigate = useNavigate();


      useEffect(()=>{
          props.getRecentPostArray()
          props.getDiscs()
          if(props.loggedUser){
            props.setBagDiscs(props.loggedUser.userDiscs)
            getBagDiscs()
          }
      },[])

      const getBagDiscs = async () =>{
        const user = await axios.get(`http://localhost:3001/api/user/${props.loggedUser._id}`)

        props.setBagDiscs(user.data[0].userDiscs)
      }


    return(
        <div>
            <h1>Home Page</h1>
            <section className = "home-main">
                <div>Your Bag 
                <Discs {...props} 
                                pageAble = {false} 
                                style = {'home'}
                                navigate ={props.navigate} 
                                discsArray = {props.bagDiscs} 
                                setDiscsArray= {props.setBagDiscs} 
                                setSelectedDisc = {props.setSelectedDisc}
                            />
                </div>
                
                <div> Recent Posts
                    <div>
                        <Posts logged = {props.logged} 
                            loggedUser = {props.loggedUser} 
                            displayArray = {props.recentPostArray} 
                            setRecentPostArray = {props.setRecentPostArray} 
                            currTopic = {'general'}/>
                    </div>
                </div>
                    <div>
                        <h1>Discs</h1>
                        <button
                        onClick = {()=>{
                            navigate('/viewDiscs')
                        }}>View All</button>
                            <Discs {...props} 
                                pageAble = {false} 
                                style = {'home'}
                                navigate ={props.navigate} 
                                discsArray = {props.discsArray} 
                                setDiscsArray= {props.setDiscsArray} 
                                setSelectedDisc = {props.setSelectedDisc}
                            />
                    </div>
            </section>
        </div>
    )
}

