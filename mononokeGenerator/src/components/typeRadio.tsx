import { useState } from "react"

export default function TypeRadio(props: any) {

    const [mononokeTypes, setMononokeTypes] = useState(props.mononoke[props.type])

    function handleCheckboxChange(e: any) {
        props.handleOnChange(e, props.type)
        const type = e.target.value
        setMononokeTypes(
            (prev: string[]) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    function handleNewType(e: any) {
        if (e.key === 'Enter') {
            const value = e.currentTarget.value.trim()
            props.handleOnChange({ target: { name: props.type, value: value } }, props.type)
            setMononokeTypes((prev: string[]) => [...prev, value])
            e.currentTarget.value = ''
        }
    }

    return (<>
        {props.isEditing !== undefined && props.isEditing ?
            (
                <div style={{ overflowY: 'auto', maxHeight: '70px', whiteSpace: 'normal' }}>
                    {props.allTypes.map((type: string) => (
                        <label key={type}>
                            <input type='radio' name={props.type} value={type}
                                checked={mononokeTypes.includes(type)}
                                onChange={handleCheckboxChange} />
                            {type}
                        </label>
                    ))}
                    <label key='new'>
                        <input type='text' name={'new' + props.type.trim()} className='card-input-new'
                            placeholder={'New ' + props.type} onKeyDown={handleNewType} />
                    </label>
                </div>
            )
            :
            <p key={props.mononoke.type}>{props.mononoke.type}</p>
        }
    </>)
}