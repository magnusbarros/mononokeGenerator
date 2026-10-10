import { useState } from "react";
import { PlusCircle, FloppyDisk, EditPencil, Trash, NavArrowUpSolid, NavArrowDownSolid } from "iconoir-react";
import './style/skilllist.css'

export default function SkillList(props: any) {

    const defaultTarget = ['User', 'Item', 'Area', 'Combat Zone', 'Other']
    const defaultTiming = ['Start', 'Start / Free', 'Start / End', 'Prep', 'Prep / Attack' , 'Attack', 'Free', 'End', 'Constant']

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [skillList, setSkillList] = useState(props.mononoke.skills)
    const [reload, setReload] = useState(false)
    const [toggleHide, setToggleHide] = useState(false)

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

    function addSkill(event: any) {
        event.preventDefault()
        var newSkill = emptySkill
        newSkill.id = window.crypto.randomUUID()
        skillList.push(newSkill)
        mononoke.skills = skillList
        setSkillList(skillList)
        setMononoke(mononoke)
        setReload(true)
    }

    function hideSkillList() {
        var cardBody = document.getElementById('card-skills-' + mononoke.id)
        cardBody?.classList.toggle('hide')
        setToggleHide(!toggleHide)
    }

    function SkillDisplay(props: any) {

        const [skill, setSkill] = useState(props.skill)

        function handleEdit(e: any) {
            skillList.map((listSkill: any) => {
                if (listSkill.id === skill.id) {
                    skill.lockEdit = false
                    listSkill = skill
                }
            })

            setSkill(skill)
            setSkillList(skillList)
            setReload(true)
        }

        function hideSkill() {
            var cardBody = document.getElementById('card-skill-' + skill.id)
            cardBody?.classList.toggle('hide')
        }

        return (
            <div className="skill-wrapper">
                <div className="skill-header" onClick={() => hideSkill()}>
                    <p className="header-title">{skill.name}
                        {
                            props.isEditing ? (
                                <button className="toggle-edit-button" onClick={handleEdit}><EditPencil /></button>
                            ) : (<></>)
                        }
                    </p>
                </div>
                <div className="skill-detail-wrapper" id={'card-skill-' + skill.id}>
                    <div className="skill-data">
                        <div className="skill-data-box">
                            <div className="skill-data-box-header">
                                <p className="data-label">Timing:</p>
                            </div>
                            <div className="skill-data-box-content">
                                <p>{skill.timing}</p>
                            </div>
                        </div>
                        <div className="skill-data-box">
                            <div className="skill-data-box-header">
                                <p className="data-label">Range:</p>
                            </div>
                            <div className="skill-data-box-content">
                                <p>{skill.range}</p>
                            </div>
                        </div>
                        <div className="skill-data-box">
                            <div className="skill-data-box-header">
                                <p className="data-label">Target:</p>
                            </div>
                            <div className="skill-data-box-content">
                                <p>{skill.target}</p>
                            </div>
                        </div>
                        <div className="skill-data-box">
                            <div className="skill-data-box-header">
                                <p className="data-label">Cost:</p>
                            </div>
                            <div className="skill-data-box-content">
                                <p>{skill.cost}</p>
                            </div>
                        </div>
                    </div>
                    <div className="skill-fluff">
                        <p>{skill.fluff}</p>
                    </div>
                    <div className="skill-desc">
                        <p>{skill.description}</p>
                    </div>
                </div>

            </div>
        )
    }

    function SkillEdit(props: any) {

        const [skill, setSkill] = useState(props.skill)

        function handleChange(e: any) {
            const { name, value } = e.target
            skill[name] = value
            setSkill(skill)
        }

        function handleSave(e: any) {
            skillList.map((listSkill: any) => {
                if (listSkill.id === skill.id) {
                    listSkill = skill
                    listSkill.lockEdit = true
                }
            })
            setSkillList(skillList)
            mononoke['skills'] = skillList
            setMononoke(mononoke)
            setReload(true)
        }

        function handleRemove(e: any) {
            skillList.map((listSkill: any) => {
                if (listSkill.id === skill.id) {
                    mononoke.skills.splice(mononoke.skills.indexOf(listSkill), 1)
                }
            })
            setSkillList(skillList)
            mononoke['skills'] = skillList
            setMononoke(mononoke)
            setReload(true)
        }

        return (
            <div className="skill-wrapper">
                <div className="skill-header">
                    <input name="name" type="text" placeholder="Name" defaultValue={skill.name} onChange={(e) => handleChange(e)} />
                    {
                        props.isEditing ? (
                            <>
                                <button className="edit-button" onClick={handleSave}><FloppyDisk /></button>
                                <button className="edit-button" onClick={handleRemove}><Trash /></button>
                            </>
                        ) : (<></>)
                    }
                </div>
                <div className="skill-data">
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Timing:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <select name="timing" onChange={(e) => handleChange(e)} className="target-select" defaultValue={skill.timing}>
                                {
                                    defaultTiming.map((time: string) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Range:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <input name="range" type="text" defaultValue={skill.range} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Target:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <input name="target" type="text" defaultValue={skill.target} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Cost:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <input name="cost" type="text" defaultValue={skill.cost} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
                <div className="skill-fluff">
                    <textarea name="fluff" placeholder="Skill fluff text" defaultValue={skill.fluff} rows={4} cols={50} onChange={(e) => handleChange(e)} />
                </div>
                <div className="skill-desc">
                    <textarea name="description" placeholder="Description" defaultValue={skill.description} rows={4} cols={50} onChange={(e) => handleChange(e)} />
                </div>
            </div>
        )
    }

    return (
        <div className="skill-list-wrapper">
            <div className='card-body-skills'>
                <h4 onClick={() => hideSkillList()}>Skills {toggleHide ? (<NavArrowDownSolid />) : (<NavArrowUpSolid />)}</h4>
                {
                    props.isEditing ? (
                        <button className="skill-add-btn" onClick={(e) => addSkill(e)}><PlusCircle /></button>
                    ) : (<></>)
                }
            </div>
            <div className="skill-list hide" id={'card-skills-' + mononoke.id}>
                {
                    !reload ? (
                        skillList.map((skill: any) => (
                            skill.lockEdit || !props.isEditing ? (
                                <SkillDisplay key={'display-' + skill.id} skill={skill} isEditing={props.isEditing} />
                            ) : (
                                <SkillEdit key={'edit-' + skill.id} skill={skill} isEditing={props.isEditing} />
                            )
                        ))
                    ) : (
                        setReload(false)
                    )
                }
            </div>
        </div>
    )

}