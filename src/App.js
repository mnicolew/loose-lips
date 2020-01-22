import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NamePicker from './namePicker';


function App() {
  const [messages, setMessages] = useState([])
  const[name, setName] = useState('')
  console.log(messages)
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
        return <div key={i} className='message-wrap'>
        <div className='message'>{m}</div>
        </div>
      })
    }
    </div>
    <TextInput onSend={(m)=>{
      setMessages([m, ...messages])
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
