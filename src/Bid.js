import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import firebase from './firebase';


const Bid = () => {
  const {bidderName} = useParams();
  let bidderNumber;

  switch (bidderName) {
      case 'adam': bidderNumber = '0'; break;
      case 'antony': bidderNumber = '1'; break;
      case 'curtis': bidderNumber = '2'; break;
      case 'dave': bidderNumber = '3'; break;
      case 'joel': bidderNumber = '4'; break;
      case 'mike': bidderNumber = '5'; break;
      case 'pat': bidderNumber = '6'; break;
      case 'steve': bidderNumber = '7'; break;
      case 'tristan': bidderNumber = '8'; break;
      case 'tyler': bidderNumber = '9'; break;
      default: bidderNumber = '10'; break;
  }

  const capFirstLetter = nameOfBidder => {
    const capitalizedName = nameOfBidder.charAt(0).toUpperCase() + nameOfBidder.slice(1);
    return capitalizedName;
  }

  const [bidding, setBidding] = useState(true);

  const bid = (bidderNumber, bidderName) => {
    
    const updatedBidStatus = {
        'name' : bidderName,
        'bidding' : false
    }
    const database = getDatabase(firebase);
    // we then create a variable that makes reference to our database
    const childRef = ref(database, bidderNumber);
    return set(childRef, updatedBidStatus);
  }

  useEffect(() => {
    const database = getDatabase(firebase);
    // we then create a variable that makes reference to our database
    const dbRef = ref(database);
    // add an event listener to that variable that will fire anytime a bidder is out
    // from the database, and call that data 'response'.
    onValue(dbRef, (res) => {
       // here we use Firebase's .val() method to parse our database info the way we want it
      let updatedData = res.val();

      setBidding(updatedData[bidderNumber].bidding);
    })
  },[setBidding,bidderNumber]);


    return(
        <div className="bidTracker">
            {bidderNumber === '10' ? 
                <h1>You fucked up - reinput your goddamn name the way I goddamn told you to!</h1> 
                : 
                <div className={bidding ? 'bidding' : 'notBidding'}>
                    <h1>{capFirstLetter(bidderName)}</h1>
                    <button className="bidButton" onClick={() => bid(bidderNumber, bidderName)} disabled={bidding ? false : true}>I'm fuckin out</button>
                </div>
            }
        </div>
    )
}

export default Bid; 