import React, { useEffect } from 'react'
import { useState,useRef } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
// import './App.css'


function NamePicker(props) {
    const[name,setName]= useState('')
    const[showName, setShowName] = useState(false)
    const inputEl= useRef(null)


    function save() {
        // inputEl.current.focus()
        if (name && !showName) {
            props.onSave(name)
            localStorage.setItem('name', name)
        }
        setShowName(!showName)
    }

    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n)
            setName(n)
            save()
    }, [])

    return <div>
        {!showName && <input value={name} ref={inputEl}
            className='name-input'
            style={{display: showName ? 'hidden' : 'visible'}}
            onChange={e=> setName(e.target.value)}
            onKeyPress={e=> {
                if (e.key==='Enter') props.onSave(name)
            }}
        />}
        {showName && <div>{name}</div>}
        <button   style={{margin: '0px 1.5vw'}} onClick={save
            // inputEl.current.focus()
            // if (name)
            // props.onSave(name)
            // setShowName(!showName)
        } >
            { showName ? <FiEdit/> : <FiSave/> }
        </button>
    </div>
}

export default NamePicker