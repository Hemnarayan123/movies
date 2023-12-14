import React, { useEffect, useState } from "react";
import { Audio, ProgressBar } from "react-loader-spinner";
import ReactStars from 'react-stars'
import { getDocs } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import { Link } from "react-router-dom";




function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      // Fetch data or perform any other asynchronous operations here
      setLoading(true);
      const _data = await getDocs(movieRef);
      _data.forEach((doc) =>{
        setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {loading ? (
        <div className="flex w-full justify-center items-center h-96"><ProgressBar height={80} width={80} color="white" /></div>
      ) : (
        data.map((e) => (
          <Link to={`/detail/${e.id}`} key={e.id}>
            <div
              className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500"
            >
              {e.image ? (
                <img className="h-60 md:h-72" src={e.image} alt={e.title} />
              ) : (
                <p>No Image Available</p>
              )}
              <h1>
                <span className="text-red-300">Name:</span>
                {e.title}
              </h1>
              <h1 className="flex items-center">
                <span className="text-red-300 mr-1">Rating:</span>
                <ReactStars 
                size={20} 
                half={true} 
                edit={false} 
                value={e.rating/e.rated} />
              </h1>
              <h1>
                <span className="text-red-300">Year:</span> {e.year}
              </h1>
            </div>
          </Link>
        ))
        
      )}
    </div>
  );
}

export default Cart;