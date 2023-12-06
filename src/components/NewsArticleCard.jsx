import React from 'react'
// import styles from '../styles/home.module.css';
import { useContext } from 'react';
import { newsContext } from '../pages/Home';
import abc from '../styles/home2.module.css'
import bcd from '../styles/home.module.css'


const NewsArticleCard = () => {

    const {item, gridView} = useContext(newsContext);
    let styles = bcd
    if(gridView){
      styles = abc;
    }

  return (
    <a href={item.url} style={{textDecoration:"none"}} className={styles.article}>
        <img src={item.image} alt="" className={styles.newsImage} />
        <div className={styles.textPart}>
            <div className={styles.heading}>{item.title}</div>
            <div className={styles.desc}>{item.description}</div>
        </div>
    </a>
  )
}

export default NewsArticleCard
