import { useState } from 'react';
import Dashboard from './components/dashboard'
import Sidebar from './components/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router';
import './components/style/index.css'
import SkillDatabase from './components/skilldatabase';

export default function Index() {

    const [mononokeList, setMononokeList] = useState(
        localStorage.getItem('savedMononoke') !== null ?
            JSON.parse(localStorage.getItem('savedMononoke')) : [])
    const [skillList, setSkillList] = useState(
        localStorage.getItem('savedSkills') !== null ?
            JSON.parse(localStorage.getItem('savedSkills')) : []
    )
    const [reload, setReload] = useState(false)

    const emptyMononoke = {
        id: '',
        name: 'Unnamed',
        lv: 1,
        xp: 10,
        type: 'Humanoid',
        weaknesses: [],
        size: 2,
        ident: 8,
        perception: '',
        movement: [],
        cunning: '',
        speech: false,
        reaction: '',
        stats: {
            hp: 0,
            guard: 0,
            ward: 0,
            init: 5,
            speed: 1,
            acc: 0,
            eva: 0,
            inv: 0,
            res: 0,
            chk: 0,
            customInit: false,
            customSpd: false
        },
        xpAward: 1,
        gold: 0,
        loot: [

        ],
        skills: [

        ]
    }

    function save(itemToSave: any) {
        if (mononokeList !== null) {
            mononokeList.map((stored: any) => {
                if (stored.id === itemToSave.id) {
                    stored = itemToSave
                }
            })
            setMononokeList(mononokeList)
            localStorage.setItem('savedMononoke', JSON.stringify(mononokeList))
        } else {
            setMononokeList([itemToSave])
            localStorage.setItem('savedMononoke', JSON.stringify([itemToSave]))
        }
        setReload(true)
    }

    function remove(itemToRemove: any) {
        if (mononokeList !== null) {
            mononokeList.map((stored: any) => {
                if (stored.id === itemToRemove.id) {
                    mononokeList.splice(mononokeList.indexOf(itemToRemove), 1)
                }
            })
            setMononokeList(mononokeList)
            localStorage.setItem('savedMononoke', JSON.stringify(mononokeList))
        }
        setReload(true)
    }

    function addMononoke() {
        var newMononoke = emptyMononoke
        newMononoke.id = window.crypto.randomUUID()
        mononokeList.push(newMononoke)
        setMononokeList(mononokeList)
        save(mononokeList)
        window.location.href = '/'
    }

    function copyMononoke(mononokeToCopy: any) {
        var copyMononoke = { ...mononokeToCopy, id: window.crypto.randomUUID() }
        mononokeList.push(copyMononoke)
        setMononokeList(mononokeList)
        save(mononokeList)
    }

    function syncToDatabase(mononokeToSync: any) {
        var storedSkills = skillList
        mononokeToSync.skills.map((skill: any) => {
            if (storedSkills.find((stored: any) => stored.id === skill.id) === undefined) {
                storedSkills.push(skill)
            }
        })

        setSkillList(storedSkills)
        if (storedSkills.length > 0) {
            localStorage.setItem('savedSkills', JSON.stringify(storedSkills))
        }
    }

    function importSkills() {
        var storedSkills = skillList
        mononokeList.map((mononoke: any) => {
            mononoke.skills.map((skill: any) => {
                if (storedSkills.find((stored: any) => stored.id === skill.id) === undefined) {
                    storedSkills.push(skill)
                }
            })
        })

        setSkillList(storedSkills)
        if (storedSkills.length > 0) {
            localStorage.setItem('savedSkills', JSON.stringify(storedSkills))
        }
    }

    return (
        <div className='index-wrapper' onLoad={() => {localStorage.setItem('isEdit', 'false')}}>
            <Sidebar list={mononokeList} addMononoke={addMononoke} setReload={setReload} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard save={save} remove={remove} copy={copyMononoke} sync={syncToDatabase} mononokeList={mononokeList} reload={reload} />} />
                    <Route path="database" element={<SkillDatabase savedSkillList={skillList} importSkills={importSkills} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}