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

    function handleSaveChanges() {
        setMononoke(mononoke)
        setIsEditing(false)
        props.save(mononoke)
        console.log('Saved changes')
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
                            handleRemove={props.remove} />
                    </div>
                </div>
                <div className='card-body'>
                    <WeaknessInfoBlock mononoke={mononoke} isEditing={isEditing} />
                    <InfoBlock mononoke={mononoke} isEditing={isEditing} defaultValues={defaultValues} />
                    <StatBlock mononoke={mononoke} isEditing={isEditing} />
                    <div className='card-body-data'>
                        <LootList mononoke={mononoke} isEditing={isEditing} />
                        <SkillList mononoke={mononoke} isEditing={isEditing} />
                    </div>
                </div>
            </div>
        </div>
    )
}