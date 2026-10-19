import { useState } from 'react'

export default function StatBlock(props: any) {

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [displayStats, setDisplayStats] = useState(props.display)
    const [reload, setReload] = useState(false)

    function handleOnChange(e: any) {

        const { name, value } = e.target;
        const currentMononoke = mononoke;

        var parsedValue = (Number.isNaN(parseInt(value)) ? 0 : parseInt(value));
        if (name === 'chk' && Number.isNaN(parseInt(value))) {
            parsedValue = 6;
        } else if (name === 'init') {
            currentMononoke.stats.customInit = value !== '' && parseInt(value) !== currentMononoke.stats.eva + 5;
            if (Number.isNaN(parseInt(value))) {
                parsedValue = currentMononoke.stats.eva + 5;
            }
        } else if (name === 'speed') {
            currentMononoke.stats.customSpd = value !== '' && parseInt(value) !== Math.ceil((currentMononoke.stats.eva + 5) / 3);
            if (Number.isNaN(parseInt(value))) {
                parsedValue = Math.ceil((currentMononoke.stats.eva + 5) / 3);
            }
        }

        const xpDebt = parseInt(currentMononoke.stats[name]) - parsedValue;
        currentMononoke.xp = parseInt(currentMononoke.xp) + xpDebt;
        currentMononoke.stats[name] = parsedValue;

        setMononoke(currentMononoke)
        setReload(true)
    }

    function setStep(e: any) {
        if (e.shiftKey) {
            e.target.step = 10
        } else {
            e.target.step = 1
        }
    }

    return (
        !reload ? (<div className='card-body-stats'>
            <div className='card-body-stats-main'>
                <div className='hp'>
                    <p>HP:<br />{props.isEditing ? (
                        <input type='number' name='hp' defaultValue={mononoke.stats.hp}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        displayStats.hp
                    )}</p>
                </div>
                <div className='guard'>
                    <p>Guard:<br />{props.isEditing ? (
                        <input type='number' name='guard'
                            defaultValue={mononoke.stats.guard}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        displayStats.guard
                    )}</p>
                </div>
                <div className='ward'>
                    <p>Ward:<br />{props.isEditing ? (
                        <input type='number' name='ward'
                            defaultValue={mononoke.stats.ward}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        displayStats.ward
                    )}</p>
                </div>
                <div className='init'>
                    <p>Init.:<br />{props.isEditing ? (
                        <input type='number' name='init'
                            defaultValue={mononoke.stats.init}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        displayStats.init
                    )}</p>
                </div>
                <div className='speed'>
                    <p>Speed:<br />{props.isEditing ? (
                        <input type='number' name='speed'
                            defaultValue={mononoke.stats.speed}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        displayStats.speed
                    )}</p>
                </div>
            </div>
            <div className='card-body-stats-sub'>
                <div className='acc'>
                    <p>Acc.:<br />{props.isEditing ? (
                        <input type='number' name='acc'
                            defaultValue={mononoke.stats.acc}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        <>{displayStats.acc}<br />{displayStats.acc + 7}</>
                    )}</p>
                </div>
                <div className='eva'>
                    <p>Eva.:<br />{props.isEditing ? (
                        <input type='number' name='eva'
                            defaultValue={mononoke.stats.eva}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        <>{displayStats.eva}<br />{displayStats.eva + 7}</>
                    )}</p>
                </div>
                <div className='inv'>
                    <p>Inv.:<br />{props.isEditing ? (
                        <input type='number' name='inv'
                            defaultValue={mononoke.stats.inv}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        <>{displayStats.inv}<br />{displayStats.inv + 7}</>
                    )}</p>
                </div>
                <div className='res'>
                    <p>Res.:<br />{props.isEditing ? (
                        <input type='number' name='res'
                            defaultValue={mononoke.stats.res}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        <>{displayStats.res}<br />{displayStats.res + 7}</>
                    )}</p>
                </div>
                <div className='chk'>
                    <p>Chk.:<br />{props.isEditing ? (
                        <input type='number' name='chk'
                            defaultValue={mononoke.stats.chk}
                            onChange={(e) => handleOnChange(e)}
                            onFocus={(e) => e.target.select()}
                            onClick={(e) => setStep(e)} />
                    ) : (
                        <>{displayStats.chk}<br />{displayStats.chk + 7}</>
                    )}</p>
                </div>
            </div>
        </div>) : setReload(false)
    )
}