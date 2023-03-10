import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Sidebar from './sidebar/sidebar';
import Map from './map/map';
import PathFinder from './pathFinder';
import actionTypes from '../../../reducer/actionTypes';

function Home() {
  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  var n = myState.mapSize.n, m = myState.mapSize.m, maxCities = myState.maxCities,prevWidth = -1;

  // 2D array of size n x m for blocks of map
  const generateMap = () => {
    let grid = [];
    for(let i = 0; i < n; i++){
        let temp = [];
        for(let j = 0; j < m; j++){
            temp.push({
                r: i,
                c: j
            })
        }
        grid.push(temp)
    }
  
    dispatch({
      type: actionTypes.UPDATE_MAP,
      map: grid
    })

    dispatch({
      type: actionTypes.UPDATE_MAPSIZE,
      mapSize: {n,m}
    })

    dispatch({
      type: actionTypes.UPDATE_MAXIMUM_CITIES,
      maxCities: maxCities
    })
  }

  const handleWidth = () => {

    // agar hum reset karenge lekin window size same hi rakhe hai to wahi map rahenge matlab stop sab same rahega
    if(window.innerWidth === prevWidth)
      return;
    
    prevWidth = window.innerWidth;

    if(window.innerWidth > 1700){
      n = 45;
      m = 90;
      maxCities = 40;
    }
    else if(window.innerWidth > 1650){
      n = 45;
      m = 72;
      maxCities = 35;
    }
    else if(window.innerWidth > 1400){
      n = 41;
      m = 63;
      maxCities = 28;
    }
    else if(window.innerWidth > 1200){
      n = 38;
      m = 54;
      maxCities = 24;
    }
    else if(window.innerWidth > 830){
      n = 32;
      m = 50;
      maxCities = 20;
    }
    else{
      n = 25;
      m = 21;
      maxCities = 15;
    }
    
    generateMap();
  }

  useEffect(() => {
    handleWidth();
    window.addEventListener('resize',handleWidth);
    return () => window.removeEventListener('resize',handleWidth);
  },[])

  return (
    <div className='home'>
      / <Sidebar />
        <Map />
        <PathFinder /> 
    </div>
  )
}

export default Home

// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home