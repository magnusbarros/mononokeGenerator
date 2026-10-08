import { PlusSquare, EditPencil, Trash, FloppyDisk, Xmark } from "iconoir-react"
import { useState } from "react"
import './style/lootlist.css'

export default function LootList(props: any) {

    const [reload, setReload] = useState(false)
    const [mononoke, setMononoke] = useState(props.mononoke)


    function handleEdit(event: any, item: any) {
        event.preventDefault()
        item.editLock = !item.editLock
        setMononoke(mononoke)
        setReload(true)
    }

    function handleSave(event: any, item: any) {
        item.editLock = !item.editLock
        if (item.roll === '') {
            item.roll = 'None'
        }
        if (item.desc === '') {
            item.desc = 'None'
        }
        setMononoke(mononoke)
        setReload(true)
    }

    function handleChange(event: any, item: any) {
        const { name, value } = event.target
        item[name] = value
        setMononoke(mononoke)
    }

    function handleChangeExtra(event: any) {
        const { name, value } = event.target
        if (name === 'xpAward' && value === '') {
            mononoke[name] = mononoke.lv
        } else mononoke[name] = value
        setMononoke(mononoke)
    }

    function handleDelete(event: any, item: any) {
        mononoke.loot.map((storedItem: any) => {
            if (storedItem.key === item.key) {
                mononoke.loot.splice(mononoke.loot.indexOf(storedItem), 1)
            }
        })
        setMononoke(mononoke)
        setReload(true)
    }

    function handleAdd(event: any) {
        var nextKey = 0
        if (mononoke.loot[mononoke.loot.length - 1] !== undefined) {
            nextKey = mononoke.loot[mononoke.loot.length - 1].key + 1
        }
        const newItem = {
            key: nextKey,
            roll: '',
            desc: '',
            editLock: false
        }
        mononoke.loot.push(newItem)
        setReload(true)
    }

    function hideLoot() {
        var cardBody = document.getElementById('card-loot-' + mononoke.id)
        cardBody?.classList.toggle('hide')
    }

    return (
        <div className='card-body-loot'>
            <h4 onClick={() => hideLoot()}>Loot</h4>
            <div className="mononoke-loot-table hide" id={'card-loot-' + mononoke.id}>
                <div className="loot-header">
                    <div className="loot-extra">
                        <div className="loot-extra-item">
                            <p>XP: </p>
                            {
                                props.isEditing ? (
                                    <input onChange={handleChangeExtra} name="xpAward" type="number" defaultValue={mononoke.xpAward} />
                                ) : (
                                    <p>{mononoke.xpAward}</p>
                                )
                            }
                        </div>
                        <div className="loot-extra-item">
                            <p>Gold: </p>
                            {
                                props.isEditing ? (
                                    <input onChange={handleChangeExtra} name="gold" type="number" defaultValue={mononoke.gold} />
                                ) : (
                                    <p>{mononoke.gold}</p>
                                )
                            }
                        </div>
                        {
                            props.isEditing ? (
                                <div className="loot-extra-item">
                                    <button onClick={handleAdd} className="loot-header-add"><PlusSquare width={50} /></button>
                                </div>
                            ) : (<></>)
                        }
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <p>Roll</p>
                            </th>
                            <th>
                                <p>Item</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !reload ? (
                                mononoke.loot !== undefined && mononoke.loot.lenght !== 0 ?
                                    (
                                        mononoke.loot.map((item: any) => (
                                            <tr key={item.key}>
                                                {
                                                    item.editLock ?
                                                        (
                                                            <>
                                                                <td>
                                                                    <p>{item.roll}</p>
                                                                </td>
                                                                <td>
                                                                    <p>{item.desc}</p>
                                                                </td>
                                                                {
                                                                    props.isEditing ? (
                                                                        <td>
                                                                            <button onClick={(e) => handleEdit(e, item)} id={'edit-' + item.key}><EditPencil /></button>
                                                                            <button onClick={(e) => handleDelete(e, item)} id={'delete-' + item.key}><Trash /></button>
                                                                        </td>
                                                                    ) : (<></>)
                                                                }
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <td>
                                                                    <input className="roll-edit" onChange={(e) => handleChange(e, item)} name='roll' type="text" defaultValue={item.roll} />
                                                                </td>
                                                                <td>
                                                                    <input className="desc-edit" onChange={(e) => handleChange(e, item)} name='desc' type="textarea" defaultValue={item.desc} />
                                                                </td>
                                                                <td>
                                                                    <button onClick={(e) => { handleSave(e, item) }} id={'edit-' + item.key}><FloppyDisk /></button>
                                                                </td>
                                                            </>
                                                        )
                                                }
                                            </tr>
                                        )
                                        ))
                                    :
                                    (
                                        <tr key='empty'>
                                            <td>
                                                <p>-</p>
                                            </td>
                                            <td>
                                                <p>None</p>
                                            </td>
                                            <td>
                                                <button disabled><EditPencil /></button>
                                                <button disabled><Trash /></button>
                                            </td>
                                        </tr>
                                    )
                            ) : (
                                setReload(false)
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}