import { useState } from 'react'
import CardList from './cardList'
import Sidebar from './sidebar';

import './style/dashboard.css'
import { Search } from 'iconoir-react';
import SearchToolbar from './searchtoolbar';

export default function Dashboard() {

    const [mononokeList, setMononokeList] = useState(localStorage.getItem('savedMononoke') !== null ? JSON.parse(localStorage.getItem('savedMononoke')) : [])
    const [reload, setReload] = useState(false)

    function save(itemToSave: any) {
        if (mononokeList !== null) {
            mononokeList.map((stored: any) => {
                if (stored.id === itemToSave.id) {
                    stored = itemToSave
                }
            })
            setMononokeList(mononokeList)
            localStorage.setItem('savedMononoke', JSON.stringify(mononokeList))
        } else {
            setMononokeList([itemToSave])
            localStorage.setItem('savedMononoke', JSON.stringify([itemToSave]))
        }
        setReload(true)
    }

    function remove(itemToRemove: any) {
        if (mononokeList !== null) {
            mononokeList.map((stored: any) => {
                if (stored.id === itemToRemove.id) {
                    mononokeList.splice(mononokeList.indexOf(itemToRemove), 1)
                }
            })
            setMononokeList(mononokeList)
            localStorage.setItem('savedMononoke', JSON.stringify(mononokeList))
        }
        setReload(true)
    }

    return (
        <div className='dashboard-wrapper'>
            <Sidebar list={mononokeList} save={save} />
            <div className="dashboard" id='dashboard'>
            <SearchToolbar search={''} setSearch={() => { }} />
                {
                    !reload ?
                        (
                            <CardList defaultList={mononokeList !== undefined && mononokeList !== null ? mononokeList : []} save={save} remove={remove} />
                        )
                        :
                        (
                            <>
                                {setReload(false)}
                            </>
                        )
                }
            </div>
        </div>
    )
}