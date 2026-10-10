import { useState } from "react";
import { EditPencil } from 'iconoir-react'
import TypeRadio from "./typeRadio";
import './style/basicinfoblock.css'

export default function BasicInfoBlock(props: any) {

    const [mononoke, setMononoke] = useState(props.mononoke)

    const [allTypes, setAllTypes] = useState(props.defaultTypes)

    const [reload, setReload] = useState(false)

    if (!allTypes.includes(mononoke.type) && mononoke.type !== '') {
        setAllTypes([...allTypes, mononoke.type]);
    }

    function handleOnChange(e: any, type?: string) {
        const { name, value } = e.target;
        const currentMononoke = mononoke;

        if (type === 'lv') {
            const oldValue = parseInt(currentMononoke[name]);
            const newValue = Number.isNaN(parseInt(value)) ? 0 : parseInt(value);
            const diff = newValue - oldValue;
            currentMononoke.xp = parseInt(currentMononoke.xp) + (diff * 4);
            currentMononoke[name] = newValue;
        } else {
            currentMononoke[name] = value;
        }

        setMononoke(currentMononoke)
        setReload(true)
    }

    function TypePopup() {
        return (
            <div className='card-type-popup' id={'card-type-popup-' + mononoke.id}>
                <TypeRadio mononoke={mononoke} isEditing={props.isEditing}
                    allTypes={allTypes} handleOnChange={handleOnChange}
                    type='type' />
            </div>
        )
    }

    return (
        <>
            {props.isEditing ?
                (
                    <>
                        {
                            !reload ? (
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
                            ) : (<>{setReload(false)}</>)
                        }
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
        </>
    )

}