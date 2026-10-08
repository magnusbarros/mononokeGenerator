import { useState } from "react";
import TypeCheckboxes from "./typecheckboxes";

export default function WeaknessInfoBlock(props: any) {

    const defaultWeaknesses = ['Flame', 'Frost', 'Shock', 'Wind', 'Force', 'Radiant', 'Blight', 'Psychic']

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [allWeaknesses, setAllWeaknesses] = useState(defaultWeaknesses)
    mononoke.weaknesses.map((weakness: string) => {
        if (!allWeaknesses.includes(weakness)) {
            setAllWeaknesses([...allWeaknesses, weakness]);
        }
    })

    function handleOnChange(e: any, type?: string) {
        const { name, value } = e.target;
        const currentMononoke = mononoke;

        if (type === 'size') {
            if (value === '' || value === null) {
                currentMononoke[type] = 2
            } else currentMononoke[name] = parseInt(value);
        } else if (type === 'ident') {
            if (value === '' || value === null) {
                currentMononoke[type] = 6 + currentMononoke.lv * 2
            } else currentMononoke[name] = parseInt(value);
        } else if (type === 'weaknesses') {
            if (currentMononoke[type].includes(value)) {
                currentMononoke[type] = currentMononoke[type].filter((t: string) => t !== value);
            } else {
                currentMononoke[type] = [...currentMononoke[type], value];
                if (!allWeaknesses.includes(value)) {
                    setAllWeaknesses([...allWeaknesses, value]);
                }
            }
        }

        setMononoke(currentMononoke)
    }

    return (
        <div className='card-body-info'>
            <div className='card-body-info-left'>
                <TypeCheckboxes mononoke={mononoke} isEditing={props.isEditing}
                    allTypes={allWeaknesses} handleOnChange={handleOnChange}
                    type='weaknesses' />
            </div>
            <div className='card-body-info-right'>
                <ul>
                    <li>Size: {props.isEditing ? (
                        <input type='text' name='size'
                            defaultValue={mononoke.size}
                            onChange={(e) => handleOnChange(e, 'size')} />
                    ) : (
                        mononoke.size
                    )}</li>
                    <li>ID: {props.isEditing ? (
                        <input type='text' name='ident'
                            defaultValue={mononoke.ident}
                            onChange={(e) => handleOnChange(e, 'ident')} />
                    ) : (
                        mononoke.ident
                    )}</li>
                </ul>
            </div>
        </div>
    )
}