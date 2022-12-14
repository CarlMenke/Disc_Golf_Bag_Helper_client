import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { BagDisc } from './BagDisc'

export const Bag = ({loggedUser, logged, setSelectedDisc, bagDiscs, setBagDiscs}) =>{

    const navigate = useNavigate()

    const [rating, setRating] = useState(0)
    const [reccomendedUserDiscs, setReccomendedUserDiscs] = useState([])

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

        setReccomendedUserDiscs(reccDiscs)

        let currRating = 0

        if(hasDiscs.length < 6 ){
            currRating = ( hasDiscs.length / 6) * 100
        }else{
            currRating = 100;
        }

        setRating(currRating.toFixed(1))
    }

    useEffect(()=>{
        if(logged){
            getRating()
        }
    },[bagDiscs])

    const handleClick = () =>{
        navigate('/viewDiscs')
    }

    if(logged){
        return(
            <div>
                <div className = 'bag-container'>
                    <div className = 'bag-score'>
                        <div>{loggedUser.userName}'s Bag 🎒</div>
                        <div >Score: {rating}</div>
                    </div>
                        {bagDiscs.map((disc,index)=>{
                            return <BagDisc setBagDiscs={setBagDiscs} loggedUser ={loggedUser} key = {index} setSelectedDisc = {setSelectedDisc} disc = {disc}/>
                        })}
                        {reccomendedUserDiscs.map((discName,index)=>{
                            return(
                                <div className = 'bag-disc-container' key = {index}>
                                    <div className = 'recc-plus'>+</div>
                                    <div className = 'recc-words' > Reccomended: {discName} </div>
                                </div>
                            )
                        })}
                    <div className = 'form-button'onClick = {handleClick}>Add Disc</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='bag-display'>Please Login in To View Your Bag.</div>
        )
    }
}