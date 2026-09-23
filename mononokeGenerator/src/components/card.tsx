import { useState } from 'react'
import { EditPencil, FloppyDisk } from 'iconoir-react'

export default function Card(props: any) {

    
    const [mononoke, setMononoke] = useState(props.mononoke)
    const [isEditing, setIsEditing] = useState(false)
    const allTypes = ['Humanoid', 'Beast', 'Insectoid', 'Plant', 'Machine', 'Undead', 'Myth', 'Abomination' ]

    function hideCard(cardId: string | number) {
        var cardBody = document.getElementById('card-'+cardId)?.getElementsByClassName('card-body')[0]
        if (!cardBody?.classList.contains('card-body-hidden') && !isEditing) {
            cardBody?.classList.add('card-body-hidden')
            document.getElementById('card-edit-'+cardId)?.classList.add('card-edit-btn-hidden')
        } else {
            cardBody?.classList.remove('card-body-hidden')
            document.getElementById('card-edit-'+cardId)?.classList.remove('card-edit-btn-hidden')
        }
    }

    function handleOnChange(e: any, type?: string) {

        const { name, value } = e.target;
        const currentMononoke = mononoke;
        
        if (type === 'stat') {
            currentMononoke.stats[name] = parseInt(value);
        } else if (type === 'type') {
            if (currentMononoke.types.includes(value)) {
                currentMononoke.types = currentMononoke.types.filter((t: string) => t !== value);
            } else {
                currentMononoke.types = [...currentMononoke.types, value];
            }
        } else {
            currentMononoke[name] = value;
        }
        
        setMononoke(currentMononoke)

    }

    function handleSaveChanges() {
        setMononoke(mononoke)
        setIsEditing(false)
        console.log('Saved changes')
    }

    return (
        <div className='mononoke-card' id={'card-'+mononoke.id} key={mononoke.id}>
                <div className='card-header-container'>
                    <div className='card-header' onClick={() => hideCard(mononoke.id)}>
                    {isEditing ? 
                    (
                    <div className='card-header-left'>
                        <input type='text' name='name' className='card-name' defaultValue={mononoke.name} onClick={(e) => e.stopPropagation()} onChange={e => {handleOnChange(e, mononoke.id)}}/>
                    </div>
                    ) 
                    : 
                    (
                    <div className='card-header-left'>
                        <h2 className='card-name'>{mononoke.name}</h2>
                    </div>
                    )
                    }
                    <div className='card-header-right'>
                        {isEditing ? 
                        (
                            <button className='card-edit-btn' id={'card-edit-'+mononoke.id} onClick={(event) => {event.stopPropagation(), handleSaveChanges()}}><FloppyDisk height={30}/></button>    
                        )
                        :
                        (
                            <button className='card-edit-btn' id={'card-edit-'+mononoke.id} onClick={(event) => {event.stopPropagation(), setIsEditing(true)}}><EditPencil height={30}/></button>
                        )
                        }
                        <h2 className='card-lv'> {mononoke.lv} ({mononoke.xp})</h2>
                        <h2 className='card-lv-label'>LV:</h2>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='card-body-info'>
                        <div className='card-body-info-left'>
                            {isEditing ? 
                            (
                                <>
                                {allTypes.map (type => (
                                    <label key={type}>
                                        <input type='checkbox' name='types' value={type} checked={mononoke.types.includes(type)} onChange={(e) => {handleOnChange(e, 'type')}} />
                                        {type}
                                    </label>
                                ))}
                                <label key='new'>
                                    <input type='text' name='newType' placeholder='New Type' onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleOnChange({target: {name: 'types', value: e.currentTarget.value}}, 'type')
                                            e.currentTarget.value = ''
                                        }}} />
                                </label>
                                </>
                            ) 
                            : 
                            (mononoke.types.map (type => (
                                <p key={type}>{type}</p>
                            )))
                            }
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
                                <p>HP:<br/>{isEditing ? (
                                    <input type='number' name='hp' defaultValue={mononoke.stats.hp} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.hp
                                )}</p>
                            </div>
                            <div className='guard'>
                                <p>Guard:<br/>{isEditing ? (
                                    <input type='number' name='guard' defaultValue={mononoke.stats.guard} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.guard
                                )}</p>
                            </div>
                            <div className='ward'>
                                <p>Ward:<br/>{isEditing ? (
                                    <input type='number' name='ward' defaultValue={mononoke.stats.ward} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.ward
                                )}</p>
                            </div>
                            <div className='init'>
                                <p>Init:<br/>{isEditing ? (
                                    <input type='number' name='init' defaultValue={mononoke.stats.init} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.init
                                )}</p>
                            </div>
                            <div className='speed'>
                                <p>Speed:<br/>{isEditing ? (
                                    <input type='number' name='speed' defaultValue={mononoke.stats.speed} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.speed
                                )}</p>
                            </div>
                        </div>
                        <div className='card-body-stats-sub'>
                            <div className='acc'>
                                <p>Acc.:<br/>{isEditing ? (
                                    <input type='number' name='acc' defaultValue={mononoke.stats.acc} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.acc}<br/>{mononoke.stats.acc + 7}</>
                                )}</p>
                            </div>
                            <div className='eva'>
                                <p>Eva.:<br/>{isEditing ? (
                                    <input type='number' name='eva' defaultValue={mononoke.stats.eva} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.eva}<br/>{mononoke.stats.eva + 7}</>
                                )}</p>
                            </div>
                            <div className='inv'>
                                <p>Inv.:<br/>{isEditing ? (
                                    <input type='number' name='inv' defaultValue={mononoke.stats.inv} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.inv}<br/>{mononoke.stats.inv + 7}</>
                                )}</p>
                            </div>
                            <div className='res'>
                                <p>Res.:<br/>{isEditing ? (
                                    <input type='number' name='res' defaultValue={mononoke.stats.res} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.res}<br/>{mononoke.stats.res + 7}</>
                                )}</p>
                            </div>
                            <div className='chk'>
                                <p>Chk.:<br/>{isEditing ? (
                                    <input type='number' name='chk' defaultValue={mononoke.stats.chk} onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.chk}<br/>{mononoke.stats.chk + 7}</>
                                )}</p>
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
            </div>
    )
}