import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, getData } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';

function Review(id, prevRating, userRated) {

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState()

    const sendReview = async () =>{
        setLoading(true)
        try{
            
            await addDoc(reviewsRef, {
                movieid: id,
                name: 'veer yadav',
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            setRating(0);
            setForm("");

            swal({
                title: "Review Sent",
                icon: 'success',
                buttons: false,
                timer: 3000
              })
        }
    catch(error){
        swal({
            title: error.message,
            icon: 'error',
            buttons: false,
            timer: 3000
          })
    }
    setLoading(false)
}
  useEffect(()=>{
    async function getData(){

    }
    getData();
  },[])

   


  return (
    <div className='mt-4 w-full py-2 border-t-2 border-gray-700'>
           <ReactStars 
                size={30} 
                value={rating}
                half={true} 
                onChange={(rate) => setRating(rate)} 
                />

        <input 
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder= 'Share you Thoughts'
            className=' w-full p-2 outline-none header'
        />

        <button 
        onClick={sendReview}
        className='bg-green-600 flex justify-center items-center w-full p-1'>
            
            { loading ? <TailSpin height={25} color='white'/>:'Share'}
            </button>

    </div>
  )
}

export default Review