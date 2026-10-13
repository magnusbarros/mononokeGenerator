import { useState } from 'react'
import './style/skilldatabase.css'
import SkillList from './skilllist'

export default function SkillDatabase(props: any) {

    const [skillList, setSkillList] = useState(props.savedSkillList)
    const [reload, setReload] = useState(false)

    const emptySkill = {
        id: '',
        name: '',
        timing: 'Start',
        range: '',
        target: 'User',
        cost: 'None',
        fluff: '',
        description: '',
        lockEdit: false
    }

    function saveDatabase(skillsToSave: any) {
        localStorage.setItem('savedSkills', JSON.stringify(skillsToSave))
        setReload(true)
    }

    function addSkill(event: any) {
        event.preventDefault()
        var newSkill = emptySkill
        newSkill.id = window.crypto.randomUUID()
        skillList.push(newSkill)
        setSkillList(skillList)
        saveDatabase(skillList)
    }

    return (
        <div className='skill-database-wrapper'>
            {
                !reload ?
                    (
                        <SkillList
                            mononoke={{ id: 'db', skills: skillList }}
                            isEditing={false}
                            isDatabase={true}
                            addSkill={addSkill}
                            saveDatabase={saveDatabase}
                            importSkills={props.importSkills} />
                    ) : (<>{setReload(false)}</>)
            }
        </div>
    )

}