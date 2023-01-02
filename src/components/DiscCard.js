import React from 'react'

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
            <div className ="disc-card-name">{disc.name}</div>
            <div className = 'brand-category'>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Brand:</div>
                    <div className ="disc-card-brand" >{disc.brand}</div>
                </div>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Category:</div>
                    <div className ="disc-card-brand" >{disc.category}</div>
                </div>
            </div>
            <div className = 'pic-stats'>
                <div className = 'stats'>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Stability:</div>
                    <div className ="disc-card-brand" >{disc.stability}</div>
                </div>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Turn:</div>
                    <div className ="disc-card-brand" >{disc.turn}</div>
                </div>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Fade:</div>
                    <div className ="disc-card-brand" >{disc.fade}</div>
                </div>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Glide:</div>
                    <div className ="disc-card-brand" >{disc.glide}</div>
                </div>
                <div className = 'container'>
                    <div className = 'disc-card-brand-label'>Speed:</div>
                    <div className ="disc-card-brand" >{disc.speed}</div>
                </div>
                    <a className = 'purchase' href = {disc.link}>Purchase</a>
                </div>
                <img className = 'disc-img' src = {`${disc.pic}`}/>
            </div>
        </div>
    )
}
}
