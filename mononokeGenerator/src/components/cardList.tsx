import { useState } from 'react'
import Card from './card'
import './style/cardlist.css'

export default function CardList(props: any) {

    const [mononokeList, setMononokeList] = useState(props.defaultList)

    return (
        <div className='card-list-wrapper'>
            {
                mononokeList.length > 0 ?
                    mononokeList?.map(mononoke => (
                        <Card key={mononoke.id} mononoke={mononoke} save={props.save} remove={props.remove} />
                    ))
                    :
                    (
                        <>
                            <p>Press the + button to add a mononoke</p>
                        </>
                    )
            }
        </div>
    )
}