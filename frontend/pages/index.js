import First from '/components/MainPage/First.js';
import Second from '/components/MainPage/Second.js';
import Third from '/components/MainPage/Third.js';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { authService } from '../components/Firebase/firebase';
import { useEffect, useState } from 'react';

console.log(firebase);
console.log(authService.currentUser);

function Home() {
  return (
    <>
        <div>
          <First />
          <Second />
          <Third />
        </div>
    </>
    
  );
}

export default Home;
