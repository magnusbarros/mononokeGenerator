import { useState } from 'react'
import CardList from './cardList'

import './style/dashboard.css'

const placeholder = [{id: 1, name: 'Bababoey', lv: 1, xp: 1, types: ['Plant','Fire','Machine'], size: 2, senses: 'Magic', move: 'ground', stats: {hp: 220, guard: 0, ward: 0, init: 15, speed: 7, acc: 11, eva: 5, inv: 0, res: 14, chk: 6}}]

export default function Dashboard() {
    return(
    <div className="dashboard" id='dashboard'>
        <CardList defaultList={placeholder} />
    </div>
)
}