import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NamePicker from './namePicker';
import {db, useDB} from './db'
import { BrowserRouter, Route } from 'react-router-dom'
import Camera from 'react-snap-pic'
import {FiCamera} from 'react-icons/fi'
import * as firebase from "firebase/app"
import "firebase/storage"
// import Div100vh from 'react-div-100vh'

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
  const [showCamera, setShowCamera] = useState(false)

  // console.log(messages)

  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ 
      img: imgID, name, ts: new Date(), room 
    })
  }

  return <main>

    {showCamera && <Camera takePicture={takePicture}/>}

    <header>
      <div style={{display:'flex',alignItems:'center'}}>
      <img className="logo" 
        src="https://static.thenounproject.com/png/1797692-200.png" alt="loose lips logo"
      />
      Loose Lips
      </div>
      <NamePicker onSave={setName} />
    </header>

{/* making the message map */}
    <div className="field">
      {messages.map((m, i)=> <Message key={i} m={m} name={name}
      />)}
    </div>

    <TextInput 
      showCamera={()=>setShowCamera(true)}
      onSend={(text)=>{
      db.send ({
        text, name, ts:new Date(), room
      })
    }}/>
  </main>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/loose-lips-2020.appspot.com/o/'
const suffix = '.jpg?alt=media'
// finishing the message component
function Message({m, name}) {
  return <div className='message-wrap'
    from={m.name===name?'me': 'you'}>
    <div className='message'>
      {m.text}
      {m.img && <img src={bucket + m.img + suffix} alt="pic" />}
    </div>
    <div className='username'>{m.name}</div>
  </div>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className='text-input'>
    <button onClick={props.showCamera}
      style={{position:'absolute', left:2, top:10}}>
      <FiCamera style={{height:15, width:15}} />
    </button>
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
        onKeyPress={e=> {
          if(e.key==='Enter') {
            if(text) props.onSend(text)
            setText('')
          }
        }}
      />

      <button className='send-button'>
        <img className= "send-icon" src="https://static.thenounproject.com/png/383448-200.png" alt="send icon"/>
      </button>
    </form>
  </div>
}

export default App;
