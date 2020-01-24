import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

// const firebaseConfig = {
//     apiKey: "AIzaSyDe5hejNin_uspcktTCkhfQAhbWMIARuy0",
//     authDomain: "chatterrrrrrr.firebaseapp.com",
//     projectId: "chatterrrrrrr",
//     storageBucket: "chatterrrrrrr.appspot.com",
// }
const firebaseConfig = {
    apiKey: "AIzaSyA3sducOZmtL05_qmH9J6plcbthERSFStI",
    authDomain: "loose-lips-2020.firebaseapp.com",
    databaseURL: "https://loose-lips-2020.firebaseio.com",
    projectId: "loose-lips-2020",
    storageBucket: "loose-lips-2020.appspot.com",
    messagingSenderId: "771750076597",
    appId: "1:771750076597:web:569a2472bdb2c6e2075efc",
    measurementId: "G-0E2JY3HJWF"
};
firebase.initializeApp(firebaseConfig)
store = firebase.firestore()