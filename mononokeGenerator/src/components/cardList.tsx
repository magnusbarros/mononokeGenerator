import { useState } from 'react'
import { EditPencil, FloppyDisk } from 'iconoir-react'

export default function CardList(props: any) {

    const [mononokeList, setMononokeList] = useState(props.defaultList)
    const [isEditing, setIsEditing] = useState(false)

    
    function hideCard(cardId: string | number) {
        var cardBody = document.getElementById('card-'+cardId)?.getElementsByClassName('card-body')[0]
        if (!cardBody?.classList.contains('card-body-hidden')) {
            cardBody?.classList.add('card-body-hidden')
            document.getElementById('card-edit-'+cardId)?.classList.add('card-edit-btn-hidden')
        } else {
            cardBody?.classList.remove('card-body-hidden')
            document.getElementById('card-edit-'+cardId)?.classList.remove('card-edit-btn-hidden')
        }
    }

    function handleOnChange(e: any) {
        const { name, value } = e.target;
        
        console.log(name, value)

    }

    return (
        <>
        {mononokeList.map (mononoke => (
            <div className='mononoke-card' id={'card-'+mononoke.id} key={mononoke.id}>
                <div className='card-header' onClick={() => hideCard(mononoke.id)}>
                    {isEditing ? 
                    (
                    <div className='card-header-left'>
                        <input type='text' className='card-name' value={mononoke.name} onChange={e => {handleOnChange(e)}}/>
                        <h2 className='card-class'>Class: {mononoke.class}</h2>
                    </div>
                    ) 
                    : 
                    (
                    <div className='card-header-left'>
                        <h2 className='card-name'>{mononoke.name}</h2>
                        <h2 className='card-class'>Class: {mononoke.class}</h2>
                    </div>
                    )
                    }
                    <div className='card-header-right'>
                        {isEditing ? 
                        (
                            <button className='card-edit-btn' id={'card-edit-'+mononoke.id} onClick={(event) => {event.stopPropagation(), setIsEditing(false)}}><FloppyDisk height={30}/></button>    
                        )
                        :
                        (
                            <button className='card-edit-btn' id={'card-edit-'+mononoke.id} onClick={(event) => {event.stopPropagation(), setIsEditing(true)}}><EditPencil height={30}/></button>
                        )
                        }
                        <h2 className='card-lv'> {mononoke.lv}</h2>
                        <h2 className='card-lv-label'>LV:</h2>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='card-body-info'>
                        <div className='card-body-info-left'>
                            {mononoke.types.map (type => (
                                <p key={type}>{type}</p>
                            ))}
                        </div>
                        <div className='card-body-info-right'>
                            <ul>
                                <li>Size: {mononoke.size}</li>
                                <li>ID: {mononoke.id}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='card-body-stats'>
                        <div className='card-body-stats-main'>
                            <div className='hp'>
                                <p>HP:<br/>{mononoke.stats.hp}</p>
                            </div>
                            <div className='guard'>
                                <p>Guard:<br/>{mononoke.stats.guard}</p>
                            </div>
                            <div className='ward'>
                                <p>Ward:<br/>{mononoke.stats.ward}</p>
                            </div>
                            <div className='init'>
                                <p>Init.:<br/>{mononoke.stats.init}</p>
                            </div>
                            <div className='speed'>
                                <p>Speed:<br/>{mononoke.stats.speed}</p>
                            </div>
                        </div>
                        <div className='card-body-stats-sub'>
                            <div className='acc'>
                                <p>Acc.:<br/>{mononoke.stats.acc}<br/>{mononoke.stats.acc + 7}</p>
                            </div>
                            <div className='eva'>
                                <p>Eva.:<br/>{mononoke.stats.eva}<br/>{mononoke.stats.eva + 7}</p>
                            </div>
                            <div className='inv'>
                                <p>Inv.:<br/>{mononoke.stats.inv}<br/>{mononoke.stats.inv + 7}</p>
                            </div>
                            <div className='res'>
                                <p>Res.:<br/>{mononoke.stats.res}<br/>{mononoke.stats.res + 7}</p>
                            </div>
                            <div className='chk'>
                                <p>Chk.:<br/>{mononoke.stats.chk}<br/>{mononoke.stats.chk + 7}</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-body-data'>
                        <div className='card-body-loot'>
                            <h4>Loot</h4>
                        </div>
                        <div className='card-body-skills'>
                            <h4>Skills</h4>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}