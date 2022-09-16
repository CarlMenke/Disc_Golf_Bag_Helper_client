import React from 'react'
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import classNames from "classnames"

export const Header = (props) =>{
if(props.logged){
    
    let nameArr = props.loggedUser.userName.split('');

    nameArr[0] = nameArr[0].toUpperCase();

    const displayName = nameArr.join('')

    return(
        <div className = {classNames('header-logged','test')}>
            <div className = 'head-link-container' >
                <Link to = "/" className = 'header-link'>Home</Link>
                <Link to = "/account" className = 'header-link'>Account</Link>
            </div>
            <div className = 'title'>🥏 Disc Bag Helper</div>
            <div className = 'head-link-container' >
                <Link to = "/account" className = 'header-link'>Hello {displayName}!</Link>
                <img  className = 'account-pic'src = {props.loggedUser.profilePic}></img>
            </div>
        </div>
    )
}else{
    return(
        <div className = {classNames('header-logged','test')}>
            <div className = 'head-link-container'>
                <Link to = "/" className = 'header-link'>Home</Link>
                <Link to = "/account" className = 'header-link'>Account</Link>
            </div>
            <div className = 'title'>🥏 Disc Bag Helper</div>
            <div className = 'head-link-container'>
                <Link to = "/login" className = 'header-link'>Login</Link>
                <Link to = "/signup" className = 'header-link'>Sign Up</Link>
            </div>
        </div>
    )}
}