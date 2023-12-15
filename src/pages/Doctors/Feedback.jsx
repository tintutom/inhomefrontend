import React, { useEffect, useState } from 'react'
import avatar from '../../assets/images/avatar-icon.png';
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
import { mediaUrl } from '../../utils/Constants';
import axios from 'axios';
import {baseUrl} from '../../utils/Constants'
import { useParams } from 'react-router-dom';
const Feedback = () => {
    const [showFeedbackForm, setShowFeedbackForm]=useState(false)
    const [feedbackData, setFeedbackData] = useState([]);
    const { id } = useParams();
    console.log('Doctorrrrrrrrrrrrr ID:', id);
    useEffect(()=>{
        const fetchFeedbackData=async()=>{
            try{
                const response = await axios.get(`${baseUrl}feedback-list/${id}/`);
                setFeedbackData(response.data);
            }catch (error){
                console.error("Error fetching feedback data:", error.message || error)
            }
        };
        fetchFeedbackData();
    },[]);
  return (
    <div>
        <div className='mb-[50px]'>
            <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
                All reviews ({feedbackData.length})
            </h4>
            {feedbackData.map((feedback,index)=>(
                <div  key={index} className='flex justify-between gap-10 mb-[30px]'>
                    <div className='flex gap-3'>
                        <figure className='w-10 h-10 rounded-full'>
                            <img className='w-full' src={`${feedback.user.userimage}`} alt=''/>
                        </figure>

                        <div>
                            <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                                 {feedback.user.name}
                            </h5>
                            <p className='text-[12px] leading-6 text-textColor'>
                            {new Date(feedback.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            </p>
                            <p className='text__para mt-3 font-medium text-[15px]'>
                                {feedback.review_text}
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        {[...Array(5).keys()].map((_,i)=> <AiFillStar 
                        key={i} color={i < feedback.rating ? '#FFD700' : '#FFFFFF'}
                        />)}
                    </div>
                </div>
            ))}
        </div>
        {!showFeedbackForm && (
            <div className='text-center'>
                <button className='btn' onClick={()=>setShowFeedbackForm(true)}>Give Feedback</button>
                </div>
            )}
            {showFeedbackForm && <FeedbackForm />}



        </div>
  )
}

export default Feedback