import { useState } from 'react'
import TypeRadio from './typeRadio'
import TypeCheckboxes from './typecheckboxes'
import { EditPencil } from "iconoir-react"
import './style/infoblock.css'

export default function InfoBlock(props: any) {

    const [mononoke, setMononoke] = useState(props.mononoke)

    const [speech, isSpeech] = useState(false)
    const [extraInfo, setExtraInfo] = useState('perception')
    const [reload, setReload] = useState(false)

    const [allPerception, setAllperception] = useState(props.defaultValues.defaultperception)
    const [allMovement, setAllMovement] = useState(props.defaultValues.defaultMovement)
    const [allCunning, setAllCunning] = useState(props.defaultValues.defaultCunning)
    const [allReaction, setAllReaction] = useState(props.defaultValues.defaultReaction)

    mononoke.movement.map((movement: string) => {
        if (!allMovement.includes(movement)) {
            setAllMovement([...allMovement, movement]);
        }
    })

    if (!allCunning.includes(mononoke.cunning) && mononoke.cunning !== '') {
        setAllCunning([...allCunning, mononoke.cunning]);
    }

    if (!allReaction.includes(mononoke.reaction) && mononoke.reaction !== '') {
        setAllReaction([...allReaction, mononoke.reaction])
    }

    if (!allPerception.includes(mononoke.perception) && mononoke.perception !== '') {
        setAllperception([...allPerception, mononoke.perception]);
    }

    function handleOnChange(e: any, type?: string) {

        const { name, value } = e.target;
        const currentMononoke = mononoke;

        if (type === 'speech') {
            currentMononoke[type] = !currentMononoke[type]
        } else if (type === 'movement') {
            if (currentMononoke[type].includes(value)) {
                currentMononoke[type] = currentMononoke[type].filter((t: string) => t !== value);
            } else {
                currentMononoke[type] = [...currentMononoke[type], value];
                if (!allMovement.includes(value)) {
                    setAllMovement([...allMovement, value]);
                }
            }
        }

        else {
            currentMononoke[name] = value;
        }

        setMononoke(currentMononoke)
        setReload(true)
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
                <div className='card-extra-popup' id={'card-extra-popup-' + mononoke.id}>
                    <TypeCheckboxes mononoke={mononoke} isEditing={props.isEditing}
                        allTypes={typeRadio} handleOnChange={handleOnChange}
                        type={props.type} />
                </div>
            )
        }

        return (
            <div className='card-extra-popup' id={'card-extra-popup-' + mononoke.id}>
                <TypeRadio mononoke={mononoke} isEditing={props.isEditing}
                    allTypes={typeRadio} handleOnChange={handleOnChange}
                    type={props.type} />
            </div>
        )
    }

    function handlePopupToggle(extraInfoType: string) {
        if (props.isEditing) {
            setExtraInfo(extraInfoType)
            const popupElement = document.getElementById("card-extra-popup-" + mononoke.id);
            if (popupElement) {
                popupElement.classList.toggle("show");
            }
        }
    }

    return (<div className='card-body-extra-info'>
        {
            !reload ? (
                <>
                    <div className='card-body-infobox'>
                        <p className={props.isEditing ? ('label edit') : ('label')}
                            onClick={() => handlePopupToggle('perception')}>
                            Perception: {props.isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                        </p><br />
                        <p className='info' key={"perception-" + mononoke.perception.trim()}>{mononoke.perception}</p>
                    </div>
                    <div className='card-body-infobox'>
                        <p className={props.isEditing ? ('label edit') : ('label')}
                            onClick={() => handlePopupToggle('movement')}>
                            Movement: {props.isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                        </p><br />
                        {mononoke.movement.map((move: string) => (
                            <p className='info' key={"move-" + move.trim()}>{move}</p>
                        ))}
                    </div>
                    <div className='card-body-infobox'>
                        <p className={props.isEditing ? ('label edit') : ('label')}
                            onClick={() => handlePopupToggle('cunning')}>
                            Cunning: {props.isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                        </p><br />
                        <p className='info' key={"cng-" + mononoke.cunning.trim()}>{mononoke.cunning}</p>
                    </div>
                    <div className='card-body-infobox'>
                        <p className={props.isEditing ? ('label edit') : ('label')}
                            onClick={(e) => { props.isEditing ? (isSpeech(!speech), handleOnChange(e, 'speech')) : null }}>
                            Speech: {props.isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                        </p><br />
                        <p className='info'>{mononoke.speech ? (<>Yes</>) : (<>No</>)}</p>
                    </div>
                    <div className='card-body-infobox'
                        onClick={() => handlePopupToggle('reaction')}>
                        <p className={props.isEditing ? ('label edit') : ('label')}>
                            Reaction: {props.isEditing ? (<EditPencil height={15} width={15} />) : (<></>)}
                        </p><br />
                        <p className='info' key={"cng-" + mononoke.reaction.trim()}>{mononoke.reaction}</p>
                    </div>
                </>
            ) : (<>{setReload(false)}</>)
        }
        <ExtraInfoPopup type={extraInfo} isEditing={props.isEditing} />
    </div>)

}