import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from '../firstore';
import { onSnapshot, collection } from 'firebase/firestore';
import axios from 'axios';
import abc from '../styles/home2.module.css';
import NewsArticleCard from '../components/NewsArticleCard';
// state management using context API
import { createContext } from 'react';

export const newsContext = createContext();

const Home = () => {
  let {userID}  = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [gridView, setGridView] = useState(false)

  let styles = abc;

  const newsAPI = "https://gnews.io/api/v4/top-headlines?category=general&apikey=e35b132c59bec1e420858ce61de3837d"

  // for collecting the user's data
  useEffect(()=>{
    onSnapshot(collection(db, 'Users'), (snapShot)=>{
      let tempUser = snapShot.docs.map((doc)=>{
        if(doc.id == userID){
        setUser(doc.data())
        }
      });
    })
  },[])

  // for calling the news API
  useEffect(()=>{
    axios.get(newsAPI)
      .then(response => {
        setData(response.data.articles);
        console.log(response.data.articles);
      })
      .catch(error => {
        console.log(error.message);
      });
  },[data])

  function handleLogoutlick(){
    navigate('/', {replace: true})
  }

  function handleGridViewClick(){
    setGridView(!gridView)
  }

  return (
    <>
      <div className={styles.header}>
        <div><strong>Welcome</strong> {user.email}</div>
        <div style={{display:"flex"}}>
          <div className={styles.logout} onClick={handleGridViewClick}>Grid View</div>
          <div className={styles.logout} onClick={handleLogoutlick}>Logout</div>
        </div>
      </div>
      <div className={styles.container}>
        {data.map((item, index)=>{
          return <newsContext.Provider value={{item, gridView}} key={index}><NewsArticleCard/></newsContext.Provider>
        })}
      </div>
    </>
  )
}

export default Home