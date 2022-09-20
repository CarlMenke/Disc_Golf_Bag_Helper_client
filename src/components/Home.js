import React from 'react'
import axios from 'axios'
import Posts from './Posts'
import { useEffect} from 'react'
import { useNavigate } from 'react-router'
import { Discs } from './Discs'
import { Bag } from './Bag'

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
        const user = await axios.get(`https://dgb-server.herokuapp.com/api/user/${props.loggedUser._id}`)
        props.setBagDiscs(user.data[0].userDiscs)
    }

    return(
        <div>
            <h1>Home Page</h1>
            <section className = "home-main">
                <div className='home-left'> 
                    <h1>Your Bag</h1>
                    <button onClick = {()=>{navigate('/viewDiscs')}}className='form-button'>Add Disc</button>
                    <Bag bagDiscs = {props.bagDiscs} setBagDiscs ={props.setBagDiscs} loggedUser = {props.loggedUser} logged = {props.logged} setSelectedDisc = {props.setSelectedDisc}/>
                </div>
                <div className = 'home-middle'> 
                    <h1>Recent Posts</h1>
                    <div>
                        <Posts 
                            logged = {props.logged} 
                            loggedUser = {props.loggedUser} 
                            displayArray = {props.recentPostArray} 
                            setRecentPostArray = {props.setRecentPostArray} 
                            currTopic = {'general'} />
                    </div>
                </div>
                    <div className = 'home-right'>
                        <div className = 'online'>
                            <h1>Discs</h1>
                            <button className = 'form-button'
                            onClick = {()=>{
                                navigate('/viewDiscs')
                            }}>View All</button>
                        </div>
                        <Discs 
                            {...props} 
                            pageAble = {false} 
                            style = {'home'}
                            navigate ={props.navigate} 
                            discsArray = {props.discsArray} 
                            setDiscsArray= {props.setDiscsArray} 
                            setSelectedDisc = {props.setSelectedDisc} />
                    </div>
            </section>
        </div>
    )
}

