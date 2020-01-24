import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NamePicker from './namePicker';
import {db, useDB} from './db'
import { BrowserRouter, Route } from 'react-router-dom'
function App() {

  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  // const [messages, setMessages] = useState([])
  const{room}= props.match.params
  const[name, setName] = useState('Name')
  const messages = useDB(room)

  // console.log(messages)
  return <main>
    <header>
      <div style={{display:'flex',alignItems:'center'}}>
      <img className="logo" 
        src="https://static.thenounproject.com/png/1797692-200.png" alt="loose lips logo"
      />
      Loose Lips
      </div>
      <NamePicker onSave={setName} />
    </header>

    <div className="field">
      {messages.map((m, i)=>{
        return <div key={i} className='message-wrap'
        from={m.name===name?'me': 'you'}>
        <div className='message'>{m.text}</div>
        <div className='username'>{m.name}</div>
        </div>
      })
    }
    </div>
    <TextInput onSend={(text)=>{
      db.send ({
        text:text, name:name, ts:new Date(), room
      })
    }}/>
  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className='text-input'>
    <form 
      onSubmit={(e)=> {
        e.preventDefault()
        if (text) props.onSend(text)
        setText('')
      }}
    className='form'>

      <input value={text} 
        placeholder=" type message here"
        onChange={e=> setText(e.target.value)} 
      />

      <button className='send-button'>
        <img className= "send-icon" src="https://static.thenounproject.com/png/383448-200.png" alt="send icon"/>
      </button>
    </form>
  </div>
}

export default App;
