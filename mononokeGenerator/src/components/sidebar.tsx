import './style/sidebar.css'
import icon from '../assets/icon.ico'
import { useState } from 'react'

export default function Sidebar(props: any) {

    const [mononokeList, setMononokeList] = useState(props.list)
    const emptyMononoke = {
        id: '',
        name: 'Unnamed',
        lv: 1,
        xp: 10,
        type: '',
        weaknesses: [],
        size: 2,
        ident: 8,
        perception: '',
        movement: [],
        cunning: '',
        speech: false,
        reaction: '',
        stats: {
            hp: 0,
            guard: 0,
            ward: 0,
            init: 5,
            speed: 1,
            acc: 0,
            eva: 0,
            inv: 0,
            res: 0,
            chk: 0,
            customInit: false,
            customSpd: false
        },
        xpAward: 1,
        gold: 0,
        loot: [

        ]
    }

    function addMononoke() {
        var newMononoke = emptyMononoke
        newMononoke.id = window.crypto.randomUUID()
        mononokeList.push(newMononoke)
        setMononokeList(mononokeList)
        props.save(mononokeList)
    }

    return (
        <div className='sidebar'>
            <img src={icon} className='icon' />
            <button className='sidebar-button' onClick={addMononoke}><p>+</p></button>
        </div>
    )
}