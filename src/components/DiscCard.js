import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './Posts'

export const DiscCard = (props) =>{

    const disc = props.disc;


if (props.setSelectedDisc !== null ){
    return(
        <div 
        onClick = {()=>{
            props.setSelectedDisc(disc)
            props.navigate(`/disc/details/${disc.name_slug}`)
        }}
        className = {`disc-container-${props.style}`}>
            <div>{disc.name}</div>
            <div>{disc.brand}</div>
            <div>{disc.category}</div>
            <img className = 'disc-img' src = {`${disc.pic}`}/>
            <div>{disc.stability}</div>
            <a href = {disc.link}>Purchase</a>
        </div>
    )
}
}
