import React from 'react'

export const MenuItems = ({items, dropDown, setDropDown, setDropDownArray,setDropped, dropped}) =>{

    return(
        <li className = 'menu-items'>
            <>
                <button 
                className = 'filter-button'
                    type = 'button' 
                    aria-haspopup='menu'
                    aria-expanded = {dropDown ? true : false} 
                    onClick= {(e)=> {
                        setDropDownArray(items.submenu)
                        if(e.target.innerHTML !== dropped  && dropDown){
                            setDropDownArray(items.submenu)
                            setDropped(e.target.innerHTML)
                        }else{
                            setDropDownArray(items.submenu)
                            setDropped(e.target.innerHTML)
                            setDropDown((prev) => !prev)
                        }
                    }}>
                    {items.title}{' '}
                </button>
            </>
        </li>
    )
}