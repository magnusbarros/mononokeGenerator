import './style/sidebar.css'
import icon from '../assets/icon.ico'
import { PlusCircle, Book } from 'iconoir-react'

export default function Sidebar(props: any) {

    return (
        <div className='sidebar'>
            <a href='/'>
                <img src={icon} className='icon' />
            </a>
            <button className='sidebar-button' onClick={props.addMononoke}><PlusCircle /></button>
            <a className='sidebar-link' href='/database'><Book /></a>
        </div>
    )
}