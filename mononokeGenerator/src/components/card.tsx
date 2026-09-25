import { useState } from 'react'
import TypeCheckboxes from './typecheckboxes'
import LevelEdit from './leveledit'
import TypeRadio from './typeRadio'
import { EditPencil } from 'iconoir-react'

export default function Card(props: any) {

    const defaultTypes = ['Humanoid', 'Beast', 'Insectoid', 'Plant', 'Machine', 'Undead', 'Myth', 'Abomination']
    const defaultWeaknesses = ['Flame', 'Frost', 'Shock', 'Wind', 'Force', 'Radiant', 'Blight', 'Psychic']
    const defaultperception = ['Normal', 'Heat', 'Magic', 'Domain']
    const defaultMovement = ['Walk', 'Fly', 'Swim']
    const defaultCunning = ['Low', 'Typical', 'High', 'Devious']
    const defaultReaction = ['Friendly', 'Neutral', 'Hostile', 'Mercuria']

    const [mononoke, setMononoke] = useState(props.mononoke)

    const [isEditing, setIsEditing] = useState(false)
    const [allTypes, setAllTypes] = useState(defaultTypes)
    const [allWeaknesses, setAllWeaknesses] = useState(defaultWeaknesses)
    const [allPerception, setAllperception] = useState(defaultperception)
    const [allMovement, setAllMovement] = useState(defaultMovement)
    const [allCunning, setAllCunning] = useState(defaultCunning)
    const [allReaction, setAllReaction] = useState(defaultReaction)
    const [speech, isSpeech] = useState(false)
    const [extraInfo, setExtraInfo] = useState('perception')

    if (!allTypes.includes(mononoke.type)) {
        setAllTypes([...allTypes, mononoke.type]);
    }

    mononoke.weaknesses.map((weakness: string) => {
        if (!allWeaknesses.includes(weakness)) {
            setAllWeaknesses([...allWeaknesses, weakness]);
        }
    })

    if (!allPerception.includes(mononoke.perception)) {
        setAllperception([...allPerception, mononoke.perception]);
    }

    mononoke.movement.map((movement: string) => {
        if (!allMovement.includes(movement)) {
            setAllMovement([...allMovement, movement]);
        }
    })

    if (!allCunning.includes(mononoke.cunning)) {
        setAllCunning([...allCunning, mononoke.cunning]);
    }

    function hideCard(cardId: string | number) {
        if (!isEditing) {
            var cardBody = document.getElementById('card-' + cardId)?.getElementsByClassName('card-body')[0]
            cardBody?.classList.toggle('card-body-hidden')
            document.getElementById('card-edit-' + cardId)?.classList.toggle('card-edit-btn-hidden')
            document.getElementById('card-edit-btn')?.classList.toggle('card-edit-btn-hidden')
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

        } else if (type === 'weaknesses' || type === 'movement') {
            if (currentMononoke[type].includes(value)) {
                currentMononoke[type] = currentMononoke[type].filter((t: string) => t !== value);
            } else {
                currentMononoke[type] = [...currentMononoke[type], value];
                if (!allTypes.includes(value)) {
                    setAllTypes([...allTypes, value]);
                }
            }
        } else if (type === 'speech') {
            currentMononoke[type] = !currentMononoke[type]
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

    function TypePopup() {
        return (
            <div className='card-type-popup' id={'card-type-popup-' + mononoke.id}>
                <TypeRadio mononoke={mononoke} isEditing={isEditing}
                    allTypes={allTypes} handleOnChange={handleOnChange}
                    type='type' />
            </div>
        )
    }

    function ExtraInfoPopup(props: any) {

        var typeRadio = null

        switch (props.type) {
            case 'perception':
                typeRadio = allPerception
                break
            case 'reaction':
                typeRadio = allReaction
                break
            case 'movement':
                typeRadio = allMovement
                break
            case 'cunning':
                typeRadio = allCunning
                break
            default:
                typeRadio = allPerception
        }

        if (props.type === 'movement') {
            return (
                <div className='card-extra-popup' id='card-extra-popup'>
                    <TypeCheckboxes mononoke={mononoke} isEditing={isEditing}
                        allTypes={typeRadio} handleOnChange={handleOnChange}
                        type={props.type} />
                </div>
            )
        }

        return (
            <div className='card-extra-popup' id='card-extra-popup'>
                <TypeRadio mononoke={mononoke} isEditing={isEditing}
                    allTypes={typeRadio} handleOnChange={handleOnChange}
                    type={props.type} />
            </div>
        )
    }

    return (
        <div className='mononoke-card' id={'card-' + mononoke.id} key={mononoke.id}>
            <div className='card-header-container'>
                <div className='card-header' onClick={() => hideCard(mononoke.id)}>
                    {isEditing ?
                        (
                            <>
                                <div className='card-header-left'>
                                    <input type='text' name='name' className='card-name-input'
                                        defaultValue={mononoke.name} onClick={(e) => e.stopPropagation()}
                                        onChange={e => { handleOnChange(e, mononoke.id) }} />
                                    <h3 className='card-type card-type-edit'
                                        onClick={(e) => {
                                            {
                                                e.stopPropagation(),
                                                    document.getElementById("card-type-popup-" + mononoke.id)?.classList.toggle("show")
                                            }
                                        }}>
                                        {mononoke.type}
                                        <EditPencil height={20} />
                                    </h3>
                                </div>
                                <TypePopup />
                            </>
                        )
                        :
                        (
                            <div className='card-header-left'>
                                <h2 className='card-name'>{mononoke.name}</h2>
                                <h3 className='card-type'>{mononoke.type}</h3>
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
                    <div className='card-body-extra-info'>
                        <div className='card-body-infobox'>
                            <p className={isEditing ? ('label edit') : ('label')}
                                onClick={() => {
                                    setExtraInfo('perception'),
                                        document.getElementById('card-extra-popup')?.classList.toggle('show')
                                }}>
                                Perception: {isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                            </p><br />
                            <p className='info' key={"perception-" + mononoke.perception.trim()}>{mononoke.perception}</p>
                        </div>
                        <div className='card-body-infobox'>
                            <p className={isEditing ? ('label edit') : ('label')}
                                onClick={() => {
                                    setExtraInfo('movement'),
                                        document.getElementById('card-extra-popup')?.classList.toggle('show')
                                }}>
                                Movement: {isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                            </p><br />
                            {mononoke.movement.map((move: string) => (
                                <p className='info' key={"move-" + move.trim()}>{move}</p>
                            ))}
                        </div>
                        <div className='card-body-infobox'>
                            <p className={isEditing ? ('label edit') : ('label')}
                                onClick={() => {
                                    setExtraInfo('cunning'),
                                        document.getElementById('card-extra-popup')?.classList.toggle('show')
                                }}>
                                Cunning: {isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                            </p><br />
                            <p className='info' key={"cng-" + mononoke.cunning.trim()}>{mononoke.cunning}</p>
                        </div>
                        <div className='card-body-infobox'>
                            <p className={isEditing ? ('label edit') : ('label')} 
                                onClick={(e) => {isSpeech(!speech), handleOnChange(e, 'speech')}}>
                                Speech: {isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                            </p><br />
                            <p className='info'>{mononoke.speech ? (<>Yes</>) : (<>No</>)}</p>
                        </div>
                        <div className='card-body-infobox'
                            onClick={() => {
                                setExtraInfo('reaction'),
                                    document.getElementById('card-extra-popup')?.classList.toggle('show')
                            }}>
                            <p className={isEditing ? ('label edit') : ('label')}>
                                Reaction: {isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                            </p><br />
                            <p className='info' key={"cng-" + mononoke.reaction.trim()}>{mononoke.reaction}</p>
                        </div>
                        <ExtraInfoPopup type={extraInfo} />
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