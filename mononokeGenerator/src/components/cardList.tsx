import { useState } from 'react'
import Card from './card'

export default function CardList(props: any) {
    
        const [mononokeList, setMononokeList] = useState(props.defaultList)

    return (
        <>
        {mononokeList.map (mononoke => (
            <Card key={mononoke.id} mononoke={mononoke} />
        ))}
        </>
    )
}