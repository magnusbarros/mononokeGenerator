import { useState } from "react";
import { PlusCircle, FloppyDisk, EditPencil, Trash, NavArrowUpSolid, NavArrowDownSolid, XmarkCircle } from "iconoir-react";
import './style/skilllist.css'

export default function SkillList(props: any) {

    const defaultTiming = ['Start', 'Start / Free', 'Start / End', 'Prep', 'Prep / Attack', 'Attack', 'Defense', 'Free', 'End', 'Constant']

    const [mononoke, setMononoke] = useState(props.mononoke)
    const [skillList, setSkillList] = useState(props.mononoke.skills)
    const [reload, setReload] = useState(false)
    const [toggleHide, setToggleHide] = useState(false)
    const isDatabase = props.isDatabase
    const [dbEdit, setDbEdit] = useState(false)
    const dbSkills = callDatabase()
    const [filteredDbSkill, setFilteredDbSkill] = useState(dbSkills)

    const emptySkill = {
        id: '',
        name: '',
        timing: 'Start',
        range: 'User',
        target: 'User',
        cost: '',
        fluff: '',
        description: '',
        lockEdit: false
    }

    function addSkill(event: any) {
        if (props.isDatabase) {
            props.addSkill(event)
        } else {
            event.preventDefault()
            var newSkill = emptySkill
            newSkill.id = window.crypto.randomUUID()
            skillList.push(newSkill)
            mononoke.skills = skillList
            setSkillList(skillList)
            setMononoke(mononoke)
            toggleDbPopup(mononoke.id)
            setReload(true)
        }
    }

    function hideSkillList() {
        var cardBody = document.getElementById('card-skills-' + mononoke.id)
        cardBody?.classList.toggle('hide')
        setToggleHide(!toggleHide)
        if (!document.getElementById('skill-db-popup-' + mononoke.id)?.classList.contains('hide')) {
            toggleDbPopup(mononoke.id)
        }
    }

    function toggleDbPopup(id: string) {
        document.getElementById('skill-db-popup-' + id)?.classList.toggle('hide')
    }

    function callDatabase() {
        const dbSkills = localStorage.getItem('savedSkills') !== null ? JSON.parse(localStorage.getItem('savedSkills')) : []

        return (
            dbSkills !== undefined ? dbSkills : []
        )
    }

    function handleAddExistingSkill(id: string) {
        dbSkills.map((listSkill: any) => {
            if (listSkill.id === id && mononoke.skills.find((skill: any) => skill.id === id) === undefined) {
                mononoke.skills.push(listSkill)
            }
        })
        setMononoke(mononoke)
        setSkillList(mononoke.skills)
        toggleDbPopup(mononoke.id)
        setReload(true)
    }

    function importSkills() {
        props.importSkills()
        setReload(true)
    }

    function filterDbSkill(e: any) {
        const { name, value } = e.target
        var sublist = []

        dbSkills?.map((skill: any) => {
            if (skill.name.toLowerCase().includes(value.toLowerCase())) {
                sublist.push(skill)
            }
        })
        setFilteredDbSkill(sublist)
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
                            props.isEditing || dbEdit ? (
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
                                <p>{skill.cost !== '' ? skill.cost : 'None'}</p>
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
            if (name === 'range') {
                if (value === '') {
                    skill[name] = 'User'
                } else skill[name] = value
            } else skill[name] = value
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
            if (isDatabase) {
                props.saveDatabase(skillList)
            }
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
            if (isDatabase) {
                props.saveDatabase(skillList)
            }
            setReload(true)
        }

        return (
            <div className="skill-wrapper">
                <div className="skill-header">
                    <input name="name" type="text" placeholder="Name" defaultValue={skill.name} onChange={(e) => handleChange(e)} />
                    {
                        props.isEditing || dbEdit ? (
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
                            <input name="range" type="text" defaultValue={skill.range} onChange={(e) => handleChange(e)} onFocus={(e) => e.target.select()} />
                        </div>
                    </div>
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Target:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <input name="target" type="text" defaultValue={skill.target} onChange={(e) => handleChange(e)} onFocus={(e) => e.target.select()} />
                        </div>
                    </div>
                    <div className="skill-data-box">
                        <div className="skill-data-box-header">
                            <p className="data-label">Cost:</p>
                        </div>
                        <div className="skill-data-box-content">
                            <input name="cost" type="text" defaultValue={skill.cost} onChange={(e) => handleChange(e)} onFocus={(e) => e.target.select()} />
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
            {
                !isDatabase ? (
                    <div className='card-body-skills'>
                        <h4 onClick={() => hideSkillList()}>Skills {toggleHide ? (<NavArrowDownSolid />) : (<NavArrowUpSolid />)}</h4>
                        {
                            props.isEditing ? (
                                <button className="skill-add-btn" onClick={() => toggleDbPopup(mononoke.id)} ><PlusCircle /></button>
                            ) : (<></>)
                        }
                        {
                            props.isEditing ? (
                                <div id={'skill-db-popup-' + mononoke.id} className="skill-db-popup hide">
                                    <div className="skill-db-popup-header">
                                        <h4>Select from Database</h4>
                                        <button className="btn-popup-close" onClick={() => toggleDbPopup(mononoke.id)}><XmarkCircle width={18} /></button>
                                    </div>
                                    <button onClick={(e) => addSkill(e)}>Create New Skill</button>
                                    <input type="text" name="dbFilter" placeholder="filter (name)" onChange={(e) => filterDbSkill(e)} />
                                    <div className="skill-db-popup-list">
                                        {
                                            filteredDbSkill?.filter((skill: any) => (mononoke.skills.find((mononokeSkill: any) => (mononokeSkill.id === skill.id))) === undefined).map((skill: any) => (
                                                <div className="skill-db-item" key={skill.id} onClick={() => handleAddExistingSkill(skill.id)}>
                                                    <p>{skill.name} ( {skill.timing} / {skill.range} / {skill.target} / {skill.cost !== '' ? skill.cost : 'None'} )</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) : (<></>)
                        }
                    </div>
                ) : (
                    <div className="db-header">
                        <button className="skill-add-btn" onClick={(e) => addSkill(e)}><PlusCircle /></button>
                        <button className="skill-add-btn" onClick={(e) => { setDbEdit(!dbEdit), setReload(true) }}><EditPencil /></button>
                        <button className='skill-add-btn import-skills' style={{ top: '-5.5px' }} onClick={importSkills}>Import Skills <span className='import-tooltip'>Imports the skills from every Mononoke's skill list into the database.</span></button>
                    </div>
                )
            }
            <div className={isDatabase ? "skill-list" : "skill-list hide"} id={'card-skills-' + mononoke.id}>
                {
                    !reload ? (
                        skillList.map((skill: any) => (
                            skill.lockEdit || (!props.isEditing && !dbEdit) ? (
                                <SkillDisplay key={'display-' + skill.id} skill={skill} isEditing={props.isEditing} />
                            ) : (
                                <SkillEdit key={'edit-' + skill.id} skill={skill} isEditing={props.isEditing} saveDatabase={props.saveDatabase} />
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