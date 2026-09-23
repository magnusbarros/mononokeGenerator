import './style/sidebar.css'
import icon from '../assets/icon.ico'


function addMononoke() {
    
}

export default function Sidebar () {

    return(
    <div className='sidebar'>
        <img src={icon} className='icon'/>
        <button className='sidebar-button' onClick={addMononoke}><p>+</p></button>
    </div>
)
}