import './style/sidebar.css'
import icon from '../assets/icon.ico'
import { PlusCircle, Book, Settings } from 'iconoir-react'

export default function Sidebar(props: any) {

    function checkSaveTrigger(url: string) {
        const globalSaveTrigger = localStorage.getItem('isEdit') !== null ? JSON.parse(localStorage.getItem('isEdit')) : false
        if (globalSaveTrigger) {
            alert('Save your changes before leaving this page.')
        } else {
            window.location.href = url
        }
    }

    function addMononoke() {
        const globalSaveTrigger = localStorage.getItem('isEdit') !== null ? JSON.parse(localStorage.getItem('isEdit')) : false
        if (globalSaveTrigger) {
            alert('Save your changes before leaving this page.')
        } else props.addMononoke()
    }

    function toggleDarkMode() {
        //Dark Mode toggle goes here
        console.log('Not implemented.')
    }

    function importData() {
        //Import Data goes here
        console.log('Not implemented.')
    }

    function exportData() {
        //Export Data toggle goes here
        console.log('Not implemented.')
    }

    function OptionsPopup() {

        return (
            <div id='options-popup' className='options-popup hide'>
                <div className='options-header'>
                    <h1>Mononoke Generator</h1>
                    <h4>for the KamiGakari TTRPG system</h4>
                    <h5>by Magnus V. de Barros</h5>
                    <p>All rights to the KamiGakari TTRPG sistem belong to their respective owners. This is a fan project not associated with the owners of this IP.</p>
                </div>

                <div className='options-menu'>
                    <button className='options-btn' onClick={importData}>Import from Json</button>
                    <button className='options-btn' onClick={exportData}>Export Data</button>
                    <button className='options-btn' onClick={toggleDarkMode}>Toggle Dark Mode</button>
                </div>
            </div>
        )
    }

    return (
        <div className='sidebar'>
            <button style={{ marginLeft: '-5px' }} className='sidebar-button' onClick={() => checkSaveTrigger('/')}>
                <img src={icon} className='icon' />
            </button>
            <br />
            <button className='sidebar-button' onClick={addMononoke}><PlusCircle /></button>
            <button className='sidebar-button' onClick={() => checkSaveTrigger('/database')} ><Book /></button>

            <OptionsPopup />
            <button onClick={() => {document.getElementById('options-popup')?.classList.toggle('hide')}} className='sidebar-options'><Settings /></button>
        </div>
    )
}