import { useState } from 'react'
import { EditPencil, FloppyDisk, Menu, Trash } from 'iconoir-react'

export default function LevelEdit(props: any) {

    const [mononoke, setMononoke] = useState(props.mononoke)

    function handleOnChange(e: any, field: string) {
        props.handleOnChange(e, field)
        const oldValue = parseInt(mononoke[field]);
        const newValue = parseInt(e.target.value);
        const diff = newValue - oldValue;
        mononoke.xp = parseInt(mononoke.xp) + (diff * 4);
        setMononoke({ ...mononoke, [field]: e.target.value })

    }

    function handleOnClick(e: any, field: string, value: number) {
        props.handleOnChange({ target: { name: field, value: value } }, field)
        mononoke.xp = parseInt(mononoke.xp) + ((value - parseInt(mononoke[field])) * 4);
        mononoke.lv = value;
        setMononoke({ ...mononoke, [field]: value })
    }

    function Popup() {
        return (
            <div className='card-popup' id={"card-popup-" + mononoke.id}>
                <button className='card-edit-btn' id={'card-edit-' + mononoke.id}
                    onClick={(event) => { event.stopPropagation(), props.setIsEditing(true) }}>
                    <EditPencil height={30} />
                </button>
                <button className='card-edit-btn' id={'card-save-' + mononoke.id}
                    onClick={(event) => { event.stopPropagation(), props.handleSaveChanges() }}>
                    <FloppyDisk height={30} />
                </button>
                <button className='card-edit-btn' id={'card-delete-' + mononoke.id}
                    onClick={(e) => { e.stopPropagation() }}>
                    <Trash height={30} />
                </button>
            </div>
        )
    }

    return (<>
        <Popup />
        <button className='card-edit-btn'
            id='card-edit-btn'
            onClick={(e) => {
                e.stopPropagation(),
                    document.getElementById("card-popup-" + mononoke.id)?.classList.toggle("show")
            }}>
            <Menu height={30} />
        </button>
        {
            props.isEditing ?
                (
                    <p className='card-lv card-lv-expand'>
                        <input type='number' name='lv' defaultValue={mononoke.lv}
                            onChange={(e) => handleOnChange(e, 'lv')} />
                        <button onClick={
                            (e) => {
                                e.stopPropagation();
                                handleOnClick(e, 'lv', parseInt(mononoke.lv) + 1)
                            }}>+</button>
                        <button onClick={
                            (e) => {
                                e.stopPropagation();
                                handleOnClick(e, 'lv', parseInt(mononoke.lv) - 1)
                            }} disabled={parseInt(mononoke.lv) <= 1} >−</button>
                        (Points: {mononoke.xp})
                    </p>
                )
                :
                (
                    <h2 className='card-lv'> {mononoke.lv} </h2>
                )
        }
        <h2 className='card-lv-label'>LV:</h2>
    </>)
}