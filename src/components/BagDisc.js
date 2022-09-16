import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const BagDisc = ({loggedUser, logged, disc, setSelectedDisc, setBagDiscs}) =>{

    const navigate = useNavigate()

    const toDiscDetails = () =>{
        setSelectedDisc(disc)
        navigate(`/disc/details/${disc.name_slug}`)
    }

    const deleteDisc = async() =>{
        const response = await axios.get(`https://dgb-server.herokuapp.com/api/delete/disc/${disc.name_slug}/${loggedUser._id}`)

        setBagDiscs(response.data)


    }

    return(
        <div className = 'bag-disc-container'>
            <div onClick = {toDiscDetails} > {disc.name} </div>
            <button onClick = {deleteDisc}>❌</button>
        </div>
    )

}