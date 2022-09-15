import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const BagDisc = ({loggedUser, logged, disc, setSelectedDisc}) =>{

    const navigate = useNavigate()

    const toDiscDetails = () =>{
        setSelectedDisc(disc)
        navigate(`/disc/details/${disc.name_slug}`)
    }

    const deleteDisc = async() =>{
        const response = await axios.get('/delete/disc/:discNameSlug')

        console.log(response)
    }

    return(
        <div onClick = {toDiscDetails} className = 'bag-disc-container'>
            <div> {disc.name} </div>
            <button onClick = {deleteDisc}>❌</button>
        </div>
    )

}