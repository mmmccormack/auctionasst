import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import firebase from './firebase';
import { Routes, Route } from 'react-router-dom';
import Bid from './Bid';



const BidStation = () => {
  const [bidders, setBidders] = useState([]);
  const [timer, setTimer] = useState('Ready');
  const [timeRunning, setTimeRunning] = useState(false);
  const intervalRef = useRef();

  const decreaseNum = () => setTimer((prev) => prev - 1);

  const resetBidding = () => {
    setTimer('Ready')
    setTimeRunning((prev) => !prev);
    const resetBiddersList = [
      {'name' : 'Adam', 'bidding' : true},
      {'name' : 'Antony', 'bidding' : true},
      {'name' : 'Curtis', 'bidding' : true},
      {'name' : 'Wilson', 'bidding' : true},
      {'name' : 'Joel', 'bidding' : true},
      {'name' : 'Mike', 'bidding' : true},
      {'name' : 'Pat', 'bidding' : true},
      {'name' : 'Steve', 'bidding' : true},
      {'name' : 'Tristan', 'bidding' : true},
      {'name' : 'Tyler', 'bidding' : true},
      {'name' : 'Dummy', 'bidding' : true}
    ]
    setBidders(resetBiddersList)
    
    const database = getDatabase(firebase);
    const childRef = ref(database);
    return set(childRef, resetBiddersList);
  }

  if (timer <= -1) {
    setTimeRunning(false)
    setTimer('End');
  }
  

  useEffect(() => {
    if (timeRunning) {
      intervalRef.current = setInterval(decreaseNum, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [timeRunning]);
  
  const startCountdown = () => {
    resetBidding();
    setTimer(60)
    setTimeRunning(true)
    if (!timeRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
  }


  useEffect(() => {
    const database = getDatabase(firebase);
    // we then create a variable that makes reference to our database
    const dbRef = ref(database);
    // add an event listener to that variable that will fire anytime a bidder is out
    // from the database, and call that data 'response'.
    onValue(dbRef, (res) => {
      const newState = [];
       // here we use Firebase's .val() method to parse our database info the way we want it
      let updatedData = res.val();

      for (let key in updatedData) {
        // inside the loop, we push each book name to an array we already created inside the onValue() function called newState
        newState.push(updatedData[key]);
      }
      setBidders(newState);

    })
  },[setBidders]);

  const BLOCK = { display: 'block' };
  const NONE = { display: 'none' };

  return (
    <div className="bidTracker">
      <ul className="bidderList">
        {bidders.map((bidder, index) => {
          return (
            <li style={bidder.name === 'Dummy' ? NONE : BLOCK} key={index} className={bidder.bidding ? "bidding" : "notBidding"}>
              <p className="individualBidder">{bidder.name}</p>
              <p className="individualBidder">{bidder.bidding ? "IN" : "OUT"}</p>
            </li>
          )
        })}
      </ul>
      <div className="timerAndReset">
        <button className="resetButton" onClick={() => startCountdown() } disabled={timeRunning ? true : false}>Start</button>
        <div className={timer <= 10 && timer > 5 ? "almostUp" :
        timer <= 5 || timer === "End" ? "danger" : "timer"}>{timer}</div>
        <button className="resetButton" onClick={() => resetBidding() } disabled={timeRunning ? false : true}>Stop</button>
      </div>
    </div>
  )
}

function App() {
  return(
  <Routes>
    <Route path="/" element={ <BidStation /> } />
    <Route path="/bid/:bidderName" element={ <Bid /> } />
  </Routes>
  )
}

export default App;
