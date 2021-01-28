import React from 'react'
import {Nav, NavLink} from './NavBarElements'

const NavBar = () => {
    return (
        <div> 
            <Nav>
                <NavLink to="/">
                    <h1 style={{marginTop: '8px'}}>School Planner</h1>
                </NavLink>
            </Nav>
        </div>
    )
}

export default NavBar
