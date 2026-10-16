import { useState } from 'react'
import { Copy, EditPencil, FloppyDisk, Menu, Trash, RefreshDouble } from 'iconoir-react'
import './style/leveledit.css'

export default function LevelEdit(props: any) {

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [reload, setReload] = useState(false)

    function handleOnChange(e: any) {

        const { name, value } = e.target;

        if (name === 'lv') {
            const oldValue = parseInt(mononoke[name]);
            const newValue = parseInt(value);
            const diff = newValue - oldValue;
            mononoke.xp = parseInt(mononoke.xp) + (diff * 4);
        }
        mononoke[name] = value;
        setMononoke(mononoke)
    }

    function handleOnClick(e: any, field: string, value: number) {
        e.stopPropagation();
        mononoke.xp = parseInt(mononoke.xp) + ((value - parseInt(mononoke[field])) * 4);
        mononoke.lv = value;
        setMononoke({ ...mononoke, [field]: value })
        setReload(true)
    }

    function handleRemove(e: any, mononoke: any) {
        e.stopPropagation()
        e.ctrlKey ? props.handleRemove(mononoke) : null
    }

    function handleCopy(e: any, mononoke: any) {
        e.stopPropagation()
        props.handleCopy(mononoke)
    }

    function handleSync(e: any, mononoke: any) {
        e.stopPropagation()
        props.handleSync(mononoke)
    }

    function handleEdit(e: any, state: boolean) {
        e.stopPropagation()
        localStorage.setItem('isEdit', state.toString())
        props.setIsEditing(state)
    }

    function Popup() {
        return (
            <div className='card-popup' id={"card-popup-" + mononoke.id}>
                {
                    !props.isEditing ? (
                        <button className='card-edit-btn' id={'card-edit-' + mononoke.id}
                            onClick={(event) => { handleEdit(event, true) }}>
                            <EditPencil height={30} />
                        </button>
                    ) : (
                        <button className='card-edit-btn' id={'card-save-' + mononoke.id}
                            onClick={(event) => { event.stopPropagation(), props.handleSaveChanges() }}>
                            <FloppyDisk height={30} />
                        </button>
                    )
                }
                <button className='card-edit-btn' id={'card-delete-' + mononoke.id}
                    onClick={(e) => { handleRemove(e, mononoke) }}>
                    <Trash height={30} />
                    <span className='card-delete-tooltip'>Ctrl + Click to Delete</span>
                </button>
                <button className='card-edit-btn' id={'card-copy-' + mononoke.id}
                    onClick={(e) => { handleCopy(e, mononoke) }}>
                    <Copy height={30} />
                </button>
                <button className='card-edit-btn' id={'card-sync-' + mononoke.id}
                    onClick={(e) => { handleSync(e, mononoke) }}>
                    <RefreshDouble height={30} />
                    <span className='card-sync-tooltip'>Synchronize Talents with the database</span>
                </button>
            </div>
        )
    }

    function LvInput() {
        return (
            <input type='number' className='lv-input' name='lv' defaultValue={mononoke.lv}
                onChange={(e) => handleOnChange(e)} />
        )
    }

    return (<div className='lv-edit-wrapper'>
        <Popup />
        <button className='card-edit-btn'
            id={'card-edit-btn-' + mononoke.id}
            onClick={(e) => {
                e.stopPropagation(),
                    document.getElementById("card-popup-" + mononoke.id)?.classList.toggle("show")
            }}>
            <Menu height={30} />
        </button>
        {
            props.isEditing ?
                (
                    <div className='card-lv card-lv-expand'>
                        {
                            !reload ? (
                                <LvInput />
                            ) : (<>{setReload(false)}</>)
                        }
                        <div className='lv-btn-wrapper'>
                            <button onClick={
                                (e) => {
                                    handleOnClick(e, 'lv', (e.shiftKey ? parseInt(mononoke.lv) + 10 : parseInt(mononoke.lv) + 1))
                                }}>+</button>
                            <br />
                            <button onClick={
                                (e) => {
                                    handleOnClick(e, 'lv', (e.shiftKey ? parseInt(mononoke.lv) - 10 : parseInt(mononoke.lv) - 1))
                                }} disabled={parseInt(mononoke.lv) <= 1} >−</button>
                        </div>
                    </div>
                )
                :
                (
                    <h2 className='card-lv'> {mononoke.lv} </h2>
                )
        }
        <h2 className='card-lv-label'>LV:</h2>
    </div>)
}