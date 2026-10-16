import { useState } from "react";
import DOMPurify from "dompurify";
import { PlusCircle, FloppyDisk, EditPencil, Trash, NavArrowUpSolid, NavArrowDownSolid, XmarkCircle, ExpandLines, CompressLines } from "iconoir-react";
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
    const [filteredDbSkill, setFilteredDbSkill] = useState(
        dbSkills.sort(function (a: any, b: any) {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        })
    )

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
            toggleDbPopup(event, mononoke.id)
            setReload(true)
        }
    }

    function hideSkillList() {
        var cardBody = document.getElementById('card-skills-' + mononoke.id)
        cardBody?.classList.toggle('hide')
        setToggleHide(!toggleHide)
    }

    function toggleDbPopup(e: any, id: string) {
        document.getElementById('skill-db-popup-' + id)?.classList.toggle('hide')
    }

    function callDatabase() {
        const dbSkills = localStorage.getItem('savedSkills') !== null ? JSON.parse(localStorage.getItem('savedSkills')) : []

        return (
            dbSkills !== undefined ? dbSkills : []
        )
    }

    function handleAddExistingSkill(e: any, id: string) {
        dbSkills.map((listSkill: any) => {
            if (listSkill.id === id && mononoke.skills.find((skill: any) => skill.id === id) === undefined) {
                mononoke.skills.push(listSkill)
            }
        })
        setMononoke(mononoke)
        setSkillList(mononoke.skills)
        toggleDbPopup(e, mononoke.id)
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

    function collapseExpandAll(type: boolean) {
        var cards = document.getElementsByClassName('skill-detail-wrapper')
        var index = 0
        while (index < cards.length) {
            if (type) {
                cards[index].classList.add('hide')
            } else {
                cards[index].classList.remove('hide')
            }
            index++
        }
    }

    function handleDbEdit() {
        localStorage.setItem('isEdit', (!dbEdit).toString())
        setDbEdit(!dbEdit)
        setReload(true)
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
            localStorage.setItem('isEdit', 'true')
            setReload(true)
        }

        function hideSkill() {
            var cardBody = document.getElementById('card-skill-' + skill.id)
            cardBody?.classList.toggle('hide')
        }

        // Source - https://stackoverflow.com/a/1026087
        // Posted by Steve Harrison, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-10-16, License - CC BY-SA 4.0

        function capitalizeFirstLetter(val) {
            return String(val).charAt(0).toUpperCase() + String(val).slice(1);
        }

        function displaySkillText(text: string): string {
            try {
                var display = text

                var commands = text.match(/```([^```]+)```/g)
                commands?.forEach((cmd: string) => {
                    var command = cmd !== null ? cmd : ''
                    var values = command.match(/\'([^'']+)\'/g)

                    if (values !== null && mononoke.stats !== undefined) {
                        if (values.length > 1) {
                            var stat = values[0].replaceAll("'", "").toString()
                            var val = values[1].replaceAll("'", "").toString()

                            var abvStat = ['acc', 'eva', 'inv', 'res', 'chk', 'init']
                            if (abvStat.includes(stat)) {
                                stat = stat + '.'
                            }

                            display = display.replace(cmd, '<span>' + capitalizeFirstLetter(val.replace('@', '')) + ' ' + capitalizeFirstLetter(stat.replace('@', '')) + '</span>')
                        } else {
                            var stat = values[0].replaceAll("'", "").toString()
                            var calcType = stat.match(/(\+|\-|\/|\*)/g)
                            if (calcType !== null) {
                                var calcVal = 0
                                var parsedStat = 0

                                var multStats = stat.match(/\@(\D+)[\+\-\/\*]@(\D+)/)
                                if (multStats === null) {
                                    var statName = stat.match(/\@(\D+)([\+\-\/\*])/)[1]
                                    parsedStat = parseInt(mononoke.stats[statName])
                                    calcVal = parseInt(values[0].match(/(\d+)/g)[0])
                                }

                                switch (calcType[0]) {
                                    case '+':
                                        if (multStats === null) {
                                            stat = calcVal + parsedStat
                                        } else {
                                            stat = parseInt(mononoke.stats[multStats[1]]) + parseInt(mononoke.stats[multStats[2]])
                                        }
                                        break;
                                    case '-':
                                        if (multStats === null) {
                                            stat = calcVal - parsedStat
                                        } else {
                                            stat = parseInt(mononoke.stats[multStats[1]]) - parseInt(mononoke.stats[multStats[2]])
                                        }
                                        break;
                                    case '/':
                                        if (multStats === null) {
                                            stat = calcVal / parsedStat
                                        } else {
                                            stat = parseInt(mononoke.stats[multStats[1]]) / parseInt(mononoke.stats[multStats[2]])
                                        }
                                        break;
                                    case '*':
                                        if (multStats === null) {
                                            stat = calcVal * parsedStat
                                        } else {
                                            stat = parseInt(mononoke.stats[multStats[1]]) * parseInt(mononoke.stats[multStats[2]])
                                        }
                                        break;
                                    default:
                                        if (multStats === null) {
                                            stat = calcVal + parsedStat
                                        } else {
                                            stat = parseInt(mononoke.stats[multStats[1]]) + parseInt(mononoke.stats[multStats[2]])
                                        }
                                }
                                display = display.replace(cmd, '<span>' + stat + '</span>')
                            } else {
                                display = display.replace(cmd, '<span>' + mononoke.stats[stat.replace('@', '')] + '</span>')
                            }
                        }
                    }

                })
                return display
            } catch (e) {
                console.log(e)
                return '<span style="color: red;">There was a problem parsing the variables in the description, please check the console for details.</span>'
            }
        }

        return (
            <div className="skill-wrapper">
                <div className="skill-header" onClick={() => hideSkill()}>
                    <p className="header-title">{skill.name}</p>
                    {
                        props.isEditing || dbEdit ? (
                            <button className="toggle-edit-button" onClick={handleEdit}><EditPencil /></button>
                        ) : (<></>)
                    }
                </div>
                <div className={'skill-detail-wrapper ' + (isDatabase ? 'hide' : '')} id={'card-skill-' + skill.id}>
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
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('<p>' + displaySkillText(skill.description) + '</p>') }} />
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
                localStorage.setItem('isEdit', 'false')
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

    function DbPopup() {
        return (
            <div id={'skill-db-popup-' + mononoke.id} className="skill-db-popup hide">
                <div className="skill-db-popup-header">
                    <h4>Select from Database</h4>
                    <button className="btn-popup-close" onClick={(e) => toggleDbPopup(e, mononoke.id)}><XmarkCircle width={18} /></button>
                </div>
                <button onClick={(e) => addSkill(e)}>New Talent</button>
                <input type="text" name="dbFilter" placeholder="filter (name)" onChange={(e) => filterDbSkill(e)} />
                <div className="skill-db-popup-list">
                    {
                        filteredDbSkill?.filter((skill: any) => (mononoke.skills.find((mononokeSkill: any) => (mononokeSkill.id === skill.id))) === undefined).map((skill: any) => (
                            <div className="skill-db-item" key={skill.id} onClick={(e) => handleAddExistingSkill(e, skill.id)}>
                                <div className="skill-data">
                                    <div className="skill-data-box db-name-box">
                                        <div className="skill-data-box-content db-name" >
                                            <p>{skill.name}</p>
                                        </div>
                                    </div>
                                    <div className="skill-data-box">
                                        <div className="skill-data-box-content">
                                            <p>{skill.timing}</p>
                                        </div>
                                    </div>
                                    <div className="skill-data-box">
                                        <div className="skill-data-box-content">
                                            <p>{skill.range}</p>
                                        </div>
                                    </div>
                                    <div className="skill-data-box">
                                        <div className="skill-data-box-content">
                                            <p>{skill.target}</p>
                                        </div>
                                    </div>
                                    <div className="skill-data-box cost">
                                        <div className="skill-data-box-content">
                                            <p>{skill.cost !== '' && skill.cost.toLowerCase() !== 'none' ? skill.cost : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="skill-list-wrapper">
            {
                !isDatabase ? (
                    <div className='card-body-skills'>
                        <h4 onClick={() => hideSkillList()}>Talents {toggleHide ? (<NavArrowDownSolid />) : (<NavArrowUpSolid />)}</h4>
                    </div>
                ) : (
                    <div className="db-header">
                        <button className="skill-add-btn" onClick={(e) => addSkill(e)}><PlusCircle /></button>
                        <button className="skill-add-btn" onClick={handleDbEdit}>{!dbEdit ? (<EditPencil />) : (<XmarkCircle />)}</button>
                        <button className='skill-add-btn import-skills' style={{ top: '-5.5px' }} onClick={importSkills}>Import Talents <span className='import-tooltip'>Imports Talents from every Mononoke's Talent list into the Database.</span></button>
                        <button className="skill-add-btn" onClick={() => collapseExpandAll(false)}><ExpandLines /></button>
                        <button className="skill-add-btn" onClick={() => collapseExpandAll(true)}><CompressLines /></button>
                    </div>
                )
            }
            <div className={isDatabase ? "skill-list" : "skill-list hide"} id={'card-skills-' + mononoke.id}>
                {
                    !reload ? (
                        skillList.map((skill: any) => (
                            skill.lockEdit || (!props.isEditing && !dbEdit) ? (
                                <SkillDisplay
                                    key={'display-' + skill.id}
                                    skill={skill}
                                    isEditing={props.isEditing} />
                            ) : (
                                <SkillEdit
                                    key={'edit-' + skill.id}
                                    skill={skill}
                                    isEditing={props.isEditing}
                                    saveDatabase={props.saveDatabase} />
                            )
                        ))
                    ) : (
                        setReload(false)
                    )
                }
                {!isDatabase && props.isEditing ? (
                    <button className="create-new-skill" onClick={(e) => toggleDbPopup(e, mononoke.id)}>Add Talent</button>
                ) : (<></>)}
            </div>
            <DbPopup />
        </div>
    )

}