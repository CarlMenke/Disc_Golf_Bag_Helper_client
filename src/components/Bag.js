import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BagDisc } from './BagDisc'

export const Bag = ({loggedUser, logged, setSelectedDisc, bagDiscs}) =>{

    const navigate = useNavigate()


    let reccDiscs = ['Control Driver', 'Distance Driver', 'Midrange', 'Approach', 'Putter', 'Hybrid Driver']

    let hasDiscs = []

    const getRating = () =>{
        let discs = bagDiscs;

        discs.map((disc)=>{

            reccDiscs.map((category,index)=>{

                if(disc.category === category){

                    hasDiscs.push(category)

                    reccDiscs.splice(index,1)

                }

            })

        })

        console.log('has discs' , hasDiscs)
    }


    useEffect(()=>{

        if(logged){
            getRating()
        }

    },[loggedUser?loggedUser.userDiscs:false])

    const handleClick = () =>{
        navigate('/viewDiscs')
    }


    if(logged){
    return(
        <div>
            <div>{loggedUser.userName}'s Bag</div>
            <div className = 'bag-container'>
                {bagDiscs.map((disc,index)=>{
                    return <BagDisc key = {index} setSelectedDisc = {setSelectedDisc} disc = {disc}/>
                })}
            </div>
            <div onClick = {handleClick}>Add Disk</div>
        </div>
    )
    }else{
        return(
            <div>Please Login in To View Your Bag.</div>
        )
    }
}