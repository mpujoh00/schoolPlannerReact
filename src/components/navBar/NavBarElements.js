import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'

export const Nav = styled.nav`
    background: #000;
    height: 50px;
    display: flex;
    justify-content: center;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
`

export const NavLink = styled(Link)`
    color: #ffe6f3;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%; 
    cursor: pointer;

    &.active {
        color: #ff99ce;
    }
`