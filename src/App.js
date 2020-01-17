import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  return <main>
    <header>
      <img className="logo" 
        src="https://static.thenounproject.com/png/1797692-200.png" alt="loose lips logo"
      />
      Loose Lips
    </header>
    <TextInput/>
  </main>
}

function TextInput(){
  const [text, setText] = useState('')

  return <div className='text-input'>
    <form 
      onSubmit={(e)=> {
        e.preventDefault()
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
