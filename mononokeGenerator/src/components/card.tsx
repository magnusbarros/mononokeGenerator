import { useState } from 'react'
import LevelEdit from './leveledit'
import LootList from './lootlist'
import StatBlock from './statblock'
import './style/card.css'
import SkillList from './skilllist'
import InfoBlock from './infoblock'
import WeaknessInfoBlock from './weaknessInfoBlock'
import BasicInfoBlock from './basicinfoblock'

export default function Card(props: any) {

    const defaultTypes = ['Humanoid', 'Beast', 'Insectoid', 'Plant', 'Machine', 'Undead', 'Myth', 'Abomination']

    const defaultValues = {
        defaultperception: ['Normal', 'Heat', 'Magic', 'Domain'],
        defaultMovement: ['Walk', 'Fly', 'Swim'],
        defaultCunning: ['Low', 'Typical', 'High', 'Devious'],
        defaultReaction: ['Friendly', 'Neutral', 'Hostile', 'Mercurial']
    }

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [display, setDisplay] = useState(processStatChanges())
    const [isEditing, setIsEditing] = useState(false)

    function hideCard(cardId: string | number) {
        if (!isEditing) {
            var cardBody = document.getElementById('card-' + cardId)?.getElementsByClassName('card-body')[0]
            cardBody?.classList.toggle('card-body-hidden')
            document.getElementById('card-edit-' + cardId)?.classList.toggle('card-edit-btn-hidden')
            document.getElementById('card-edit-btn-' + cardId)?.classList.toggle('card-edit-btn-hidden')
            document.getElementById('card-' + cardId)?.classList.toggle('hidden')
            if (document.getElementById("card-popup-" + mononoke.id)?.classList.contains("show")) {
                document.getElementById("card-popup-" + mononoke.id)?.classList.toggle("show")
            }
        }
    }

    function processStatChanges(): any {
        try {
            var display = { ...mononoke }

            display.skills.forEach((skill: any) => {
                var commands = skill.description.match(/```([^```*```]+)```/g)
                commands?.forEach((cmd: string) => {
                    var command = cmd !== null ? cmd : ''
                    var values = command.match(/\'([^'*']+)\'/g)
                    if (values !== null && values.length > 1) {
                    var stat = values[0].replaceAll("'", "").toString()
                    var val = values[1].replaceAll("'", "").toString()
                        if (val.includes('@')) {
                            var statToCalc = parseInt(display.stats[val.match(/\@(\w*[^\+])\+/)[1]])
                            var calcType = val.match(/(\+|\-|\/|\*)/g)[0].toString()
                            var calcVal = parseInt(val.match(/(\d+)/g)[0])
                            switch (calcType) {
                                case '+':
                                    val = (statToCalc + calcVal).toString()
                                    break;
                                case '-':
                                    val = (statToCalc - calcVal).toString()
                                    break;
                                case '/':
                                    val = (statToCalc / calcVal).toString()
                                    break;
                                case '*':
                                    val = (statToCalc * calcVal).toString()
                                    break;
                                default:
                                    val = (statToCalc + calcVal).toString()
                            }
                        }
                        display = { ...display, 'stats': { ...display.stats, [stat]: (parseInt(display.stats[stat]) + parseInt(val)) } }
                    }
                })
            })
            return display
        } catch (e) {
            console.log(e)
            return mononoke
        }
    }

    function handleSaveChanges() {
        setMononoke(mononoke)
        setIsEditing(false)
        var newDisplay = processStatChanges().stats
        setDisplay({ ...mononoke, stats: newDisplay })
        localStorage.setItem('isEdit', 'false')
        props.save(mononoke)
    }

    return (
        <div className='mononoke-card' id={'card-' + mononoke.id} key={mononoke.id}>
            <div className='card-header-container'>
                <div className='card-header' onClick={() => hideCard(mononoke.id)}>
                    <BasicInfoBlock mononoke={mononoke} isEditing={isEditing} defaultTypes={defaultTypes} />
                    <div className='card-header-right'>
                        <LevelEdit mononoke={mononoke}
                            isEditing={isEditing} setIsEditing={setIsEditing}
                            handleSaveChanges={handleSaveChanges}
                            handleRemove={props.remove}
                            handleCopy={props.copy}
                            handleSync={props.sync}
                        />
                    </div>
                </div>
                <div className='card-body'>
                    <WeaknessInfoBlock mononoke={mononoke} isEditing={isEditing} />
                    <InfoBlock mononoke={mononoke} isEditing={isEditing} defaultValues={defaultValues} />
                    <StatBlock mononoke={mononoke} display={display.stats} isEditing={isEditing} />
                    <div className='card-body-data'>
                        <LootList mononoke={mononoke} isEditing={isEditing} />
                        <SkillList mononoke={mononoke} isEditing={isEditing} isDatabase={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}