import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/ls.module.css'
import { addDoc, collection,onSnapshot  } from 'firebase/firestore';
import { db } from '../firstore';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {

    const navigate = useNavigate()

    const [toggle, setToggle] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');


    const handleSignUp = () =>{
        if(password === cnfPassword){
            handleClickSubmit();
        }else{
            alert("password mismatch");
        }
    }
    async function handleClickSubmit(){
        // Using addDoc() to add new document
        await addDoc(collection(db, "Users"), {
          email: email,
          password: password,
          createdOn: new Date()
        });
        alert("New User added")
        setEmail('')
        setPassword('')
        setCnfPassword('')
    }

    const handleClickLogin = async() => {
        // an extra check just to check that it is a login request
        if(cnfPassword === ''){
            const realtimeData = onSnapshot(collection(db, 'Users'), (snapShot)=>{
                let userNotFound = true
                const persons = snapShot.docs.map((doc, index)=>{
                    if(doc.data().email == email && doc.data().password == password){
                        navigate(`home/${doc.id}`)
                        userNotFound = false
                    }
                    if(!userNotFound){
                        return;
                    }
                });
            });
        }
    }

  return (
    <div style={{width:"100%", display:"flex", alignItems:"center", flexDirection:"column"}}>
        <strong>News Hub</strong>
      {toggle?
      <div className={styles.form}>
        <input type="text" placeholder='Email' onChange={e=>setEmail(e.target.value)} value={email} className={styles.inputBox}/>
        <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)} value={password} className={styles.inputBox}/>
        <input type="Password" placeholder='Confirm Password' onChange={e=>setCnfPassword(e.target.value)} value={cnfPassword} className={styles.inputBox}/>
        <button onClick={handleSignUp} className={styles.button}>SignUp</button>
      </div>:
      <div className={styles.form}>
        <input type="text" placeholder='Email' onChange={e=>setEmail(e.target.value)} value={email} className={styles.inputBox}/>
        <input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)} value={password} className={styles.inputBox}/>
        <button onClick={handleClickLogin} className={styles.button}>Login</button>
      </div>}
      <div>
        {toggle?<div onClick={()=>setToggle(!toggle)} className={styles.toggleDiv}>go to Login Page</div>:<div onClick={()=>setToggle(!toggle)} className={styles.toggleDiv}>go to Signup Page</div>}
      </div>
    </div>
  )
}

export default LoginSignUp