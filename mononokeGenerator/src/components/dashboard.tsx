import { useState } from 'react'
import CardList from './cardList'
import './style/dashboard.css'
import SearchToolbar from './searchtoolbar';

export default function Dashboard(props: any) {

    const [reload, setReload] = useState(props.reload)

    function save(itemToSave: any) {
        props.save(itemToSave)
        setReload(true)
    }

    function remove(itemToRemove: any) {
        props.remove(itemToRemove)
        setReload(true)
    }

    function copy(itemToCopy: any) {
        props.copy(itemToCopy)
        setReload(true)
    }

    function sync(itemToSync: any) {
        props.sync(itemToSync)
        setReload(true)
    }

    return (
        <div className='dashboard-wrapper'>
            <div className="dashboard" id='dashboard'>
                <SearchToolbar search={''} setSearch={() => { }} />
                {
                    !reload ?
                        (
                            <CardList
                                defaultList={
                                    props.mononokeList !== undefined
                                        && props.mononokeList !== null ?
                                        props.mononokeList : []
                                }
                                save={save}
                                remove={remove}
                                copy={copy}
                                sync={sync} />
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