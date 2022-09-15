import React from 'react'

export const Dropdown = ({dropDownArray, setDropDown, dropDown, dropped, filterBar, searchFilter, setSearchFilter}) =>{

    return(
        <ul className = {`dropdown${dropDown?'show':''}`}>
            {dropDownArray.map((submenu, index)=>{
                return(
                <li key = {index} className = 'menu-items'>
                    <button className = 'menu-items' type = 'button' onClick  = {(e) => 
                    {
                        let obj = {}
                        let newArr = []
                        let currMain = filterBar.filter((main)=> {

                            let check1 = '';
                            let check2 = '';

                            for(let i = 0; i < main.title.length; i++){
                                check1 += main.title[i];
                            }
                            for(let i = 0; i < dropped.length; i++){
                                check2 += dropped[i];
                            }

                            return check1[0]+check1[1] === check2[0]+check2[1]
                        })
                        
                        let currSub = currMain[0].submenu.filter((sub) =>{
                            return sub.title === e.target.innerHTML
                        })

                        obj.main = currMain[0].slug 
                        obj.sub = currSub[0].title

                        setSearchFilter([...searchFilter, obj])
                        setDropDown((prev) => !prev)

                        
                    }}>
                        {submenu.title}
                    </button>
                </li>
                )
            })}
        </ul>
    )
}