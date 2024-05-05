import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/Constants';

const FeedbackForm = () => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [hasAppointment, setHasAppointment] = useState(false);

  const userId = Cookies.get('id');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAppointment = async () => {
      try {
        const response = await axios.get(`${baseUrl}upcoming-appointments/${userId}/`);

        const hasAppointmentWithDoctor = response.data.some(appointment => appointment.doctor.id === parseInt(id, 10));
        
        setHasAppointment(hasAppointmentWithDoctor);
        
      } catch (error) {
        console.error('Error checking appointment status:', error.message || error);
      }
    };

    checkAppointment();
  }, [userId, id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!hasAppointment) {
      console.log("User does not have an appointment with this doctor. Cannot submit feedback.");
      return;
    }
    const feedbackData = {
      user: parseInt(userId, 10),
      doctor: parseInt(id, 10),
      rating: rating,
      review_text: reviewText,
    };

    try {
      const response = await axios.post(`${baseUrl}submit-feedback/`, feedbackData);

      if (response.status === 201) {
        setShowForm(false);
        console.log('Feedback submitted successfully');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message || error);
    }
  };

  return (
    <div>
      {showForm ? (
        hasAppointment ? (
        <form onSubmit={handleSubmitReview}>
          <div>
            <h3 className='text-headingColor txt-[16px] leading-6 font-semibold mb-4 mt-0'>
              How would you rate the overall experience?
            </h3>

            <div>
              {[...Array(5).keys()].map((_, index) => {
                const starValue = index += 1;

                return (
                  <button
                    key={index}
                    type='button'
                    className={`${
                      starValue <= (hover || rating)
                        ? 'text-yellowColor'
                        : 'text-gray-400'
                    } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    onDoubleClick={() => {
                      setHover(0);
                      setRating(0);
                    }}
                  >
                    <span>
                      <AiFillStar />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='mt-[30px]'>
            <h3 className='text-headingColor txt-[16px] leading-6 font-semibold mb-4 mt-0'>
              Share your feedback or suggestions
            </h3>

            <textarea
              className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
              rows='5'
              placeholder='Write your message'
              onChange={(e) => setReviewText(e.target.value)}
              value={reviewText}
            ></textarea>

            <button type='submit' className='btn'>
              Submit Feedback
            </button>
          </div>
        </form>
        ) : (
          <p>You do not have an appointment with this doctor. Feedback cannot be submitted.</p>
        )
        ) : (
          <div>
            {/* Display the submitted feedback here */}
            <p>Thank you for your feedback!</p>
            {/* You can add more details or customize this section */}
          </div>
        )}
    </div>
  );
};

export default FeedbackForm;

