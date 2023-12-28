import React, { useEffect, useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from 'firebase/firestore'
import { movieRef } from '../firebase/firebase'
import { Link } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const _data = await getDocs(movieRef);
        _data.forEach((doc) => {
          setData((prev) => [...prev, { ...(doc.data()), id: doc.id }])
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <ThreeDots height={40} color="white" />
        {/* Add loading text or message if needed */}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {data.map((movie) => (
        <Link to={`/detail/${movie.id}`} key={movie.id}>
          <div className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
            <img className="h-60 md:h-72" src={movie.image} alt={`${movie.title} Poster`} />
            <h1>{movie.title}</h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={movie.rating / movie.rated}
                edit={false}
              />
            </h1>
            <h1>
              <span className="text-gray-500">Year:</span> {movie.year}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cart;
