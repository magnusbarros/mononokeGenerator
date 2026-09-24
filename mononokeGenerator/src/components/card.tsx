import { useState } from 'react'
import TypeCheckboxes from './typecheckboxes'
import LevelEdit from './leveledit'

export default function Card(props: any) {

    const defaultTypes = ['Humanoid', 'Beast', 'Insectoid', 'Plant', 'Machine', 'Undead', 'Myth', 'Abomination']
    const defaultWeaknesses = ['Flame', 'Frost', 'Shock', 'Wind', 'Force', 'Radiant', 'Blight', 'Psychic']
    const defaultSenses = ['Normal', 'Heat', 'Magic', 'Domain']
    const defaultMovement = ['Walk', 'Fly', 'Swim']
    const defaultCunning = ['Low', 'Typical', 'High', 'Devious']

    const [mononoke, setMononoke] = useState(props.mononoke)
    
    const [isEditing, setIsEditing] = useState(false)
    const [allTypes, setAllTypes] = useState(defaultTypes)
    const [allWeaknesses, setAllWeaknesses] = useState(defaultWeaknesses)
    const [allSenses, setAllSenses] = useState(defaultSenses)
    const [allMovement, setAllMovement] = useState(defaultMovement)
    const [allCunning, setAllCunning] = useState(defaultCunning)
    
    mononoke.types.map(type => {
        if (!allTypes.includes(type)) {
            setAllTypes([...allTypes, type]);
        }
    })

    mononoke.weaknesses.map(weakness => {
        if (!allWeaknesses.includes(weakness)) {
            setAllWeaknesses([...allWeaknesses, weakness]);
        }
    })

    mononoke.senses.map(sense => {
        if (!allSenses.includes(sense)) {
            setAllSenses([...allSenses, sense]);
        }
    })

    mononoke.movement.map(movement => {
        if (!allMovement.includes(movement)) {
            setAllMovement([...allMovement, movement]);
        }
    })

    mononoke.cunning.map(cunning => {
        if (!allCunning.includes(cunning)) {
            setAllCunning([...allCunning, cunning]);
        }
    })

    function hideCard(cardId: string | number) {
        var cardBody = document.getElementById('card-' + cardId)?.getElementsByClassName('card-body')[0]
        if (!cardBody?.classList.contains('card-body-hidden') && !isEditing) {
            cardBody?.classList.add('card-body-hidden')
            document.getElementById('card-edit-' + cardId)?.classList.add('card-edit-btn-hidden')
        } else {
            cardBody?.classList.remove('card-body-hidden')
            document.getElementById('card-edit-' + cardId)?.classList.remove('card-edit-btn-hidden')
        }
    }

    function handleOnChange(e: any, type?: string) {

        const { name, value } = e.target;
        const currentMononoke = mononoke;

        if (type === 'stat') {
            if (name === 'init') {
                currentMononoke.stats.customInit = value !== '' && parseInt(value) !== currentMononoke.stats.eva + 5;
                if (value === '' || Number.isNaN(parseInt(value))) {
                    currentMononoke.stats.init = currentMononoke.stats.eva + 5;
                }
            } else if (name === 'speed') {
                currentMononoke.stats.customSpd = value !== '' && parseInt(value) !== Math.round((currentMononoke.stats.eva + 5) / 3);
                if (value === '' || Number.isNaN(parseInt(value))) {
                    currentMononoke.stats.speed = Math.round((currentMononoke.stats.eva + 5) / 3);
                }
            } else {
                if (!currentMononoke.stats.customInit) {
                    currentMononoke.stats.init = currentMononoke.stats.eva + 5;
                }
                if (!currentMononoke.stats.customSpd) {
                    currentMononoke.stats.speed = Math.round((currentMononoke.stats.eva + 5) / 3);
                }

                var parsedValue = (Number.isNaN(parseInt(value)) ? 0 : parseInt(value));
                if (name === 'chk' && Number.isNaN(parseInt(value))) {
                    parsedValue = 6;
                }

                const xpDebt = parseInt(currentMononoke.stats[name]) - parsedValue;
                currentMononoke.xp = parseInt(currentMononoke.xp) + xpDebt;
                currentMononoke.stats[name] = parsedValue;
            }

        } else if (type === 'type' || type === 'weaknesses' || type === 'senses' || type === 'movement' || type === 'cunning') {
            if (currentMononoke[type].includes(value)) {
                currentMononoke[type] = currentMononoke[type].filter((t: string) => t !== value);
            } else {
                currentMononoke[type] = [...currentMononoke[type], value];
                if (!allTypes.includes(value)) {
                    setAllTypes([...allTypes, value]);
                }
            }
        } else if (type === 'lv') {
            const oldValue = parseInt(currentMononoke[name]);
            const newValue = Number.isNaN(parseInt(value)) ? 0 : parseInt(value);
            const diff = newValue - oldValue;
            currentMononoke.xp = parseInt(currentMononoke.xp) + (diff * 4);
            currentMononoke[name] = newValue;
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
        <div className='mononoke-card' id={'card-' + mononoke.id} key={mononoke.id}>
            <div className='card-header-container'>
                <div className='card-header' onClick={() => hideCard(mononoke.id)}>
                    {isEditing ?
                        (
                            <div className='card-header-left'>
                                <input type='text' name='name' className='card-name-input' defaultValue={mononoke.name} onClick={(e) => e.stopPropagation()} onChange={e => { handleOnChange(e, mononoke.id) }} />
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
                        <LevelEdit mononoke={mononoke}
                            isEditing={isEditing} setIsEditing={setIsEditing}
                            handleOnChange={handleOnChange}
                            handleSaveChanges={handleSaveChanges} />
                    </div>
                </div>
                <div className='card-body'>
                    <div className='card-body-info'>
                        <div className='card-body-info-left'>
                            <TypeCheckboxes mononoke={mononoke} isEditing={isEditing}
                                allTypes={allWeaknesses} handleOnChange={handleOnChange} 
                                type='weaknesses' />
                        </div>
                        <div className='card-body-info-right'>
                            <ul>
                                <li>Size: {isEditing ? (
                                    <input type='text' name='size'
                                        defaultValue={mononoke.size}
                                        onChange={(e) => handleOnChange(e, 'size')} />
                                ) : (
                                    mononoke.size
                                )}</li>
                                <li>ID: {isEditing ? (
                                    <input type='text' name='ident'
                                        defaultValue={mononoke.ident}
                                        onChange={(e) => handleOnChange(e, 'ident')} />
                                ) : (
                                    mononoke.ident
                                )}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='card-body-stats'>
                        <div className='card-body-stats-main'>
                            <div className='hp'>
                                <p>HP:<br />{isEditing ? (
                                    <input type='number' name='hp' defaultValue={mononoke.stats.hp}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.hp
                                )}</p>
                            </div>
                            <div className='guard'>
                                <p>Guard:<br />{isEditing ? (
                                    <input type='number' name='guard'
                                        defaultValue={mononoke.stats.guard}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.guard
                                )}</p>
                            </div>
                            <div className='ward'>
                                <p>Ward:<br />{isEditing ? (
                                    <input type='number' name='ward'
                                        defaultValue={mononoke.stats.ward}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.ward
                                )}</p>
                            </div>
                            <div className='init'>
                                <p>Init:<br />{isEditing ? (
                                    <input type='number' name='init'
                                        defaultValue={mononoke.stats.init}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.init
                                )}</p>
                            </div>
                            <div className='speed'>
                                <p>Speed:<br />{isEditing ? (
                                    <input type='number' name='speed'
                                        defaultValue={mononoke.stats.speed}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    mononoke.stats.speed
                                )}</p>
                            </div>
                        </div>
                        <div className='card-body-stats-sub'>
                            <div className='acc'>
                                <p>Acc.:<br />{isEditing ? (
                                    <input type='number' name='acc'
                                        defaultValue={mononoke.stats.acc}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.acc}<br />{mononoke.stats.acc + 7}</>
                                )}</p>
                            </div>
                            <div className='eva'>
                                <p>Eva.:<br />{isEditing ? (
                                    <input type='number' name='eva'
                                        defaultValue={mononoke.stats.eva}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.eva}<br />{mononoke.stats.eva + 7}</>
                                )}</p>
                            </div>
                            <div className='inv'>
                                <p>Inv.:<br />{isEditing ? (
                                    <input type='number' name='inv'
                                        defaultValue={mononoke.stats.inv}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.inv}<br />{mononoke.stats.inv + 7}</>
                                )}</p>
                            </div>
                            <div className='res'>
                                <p>Res.:<br />{isEditing ? (
                                    <input type='number' name='res'
                                        defaultValue={mononoke.stats.res}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.res}<br />{mononoke.stats.res + 7}</>
                                )}</p>
                            </div>
                            <div className='chk'>
                                <p>Chk.:<br />{isEditing ? (
                                    <input type='number' name='chk'
                                        defaultValue={mononoke.stats.chk}
                                        onChange={(e) => handleOnChange(e, 'stat')} />
                                ) : (
                                    <>{mononoke.stats.chk}<br />{mononoke.stats.chk + 7}</>
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