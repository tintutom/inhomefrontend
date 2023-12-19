import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { HiStar } from 'react-icons/hi';
import { baseUrl, mediaUrl } from '../../utils/Constants';
import Feedback from '../../pages/Doctors/Feedback';

const Testimonial = () => {
  const [topRatedFeedback, setTopRatedFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${baseUrl}feedback-list/`);
        const data = await response.json();

        const sortedFeedback = data.sort((a, b) => b.rating - a.rating);

        const topFeedback = sortedFeedback.slice(0, 3);
        setTopRatedFeedback(topFeedback);
      } catch (error) {
        console.log('Error Fetching Feedback:', error);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className='mt-[30px] lg:mt-[55px]'>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {topRatedFeedback.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <div className='py-[30px] px-5 rounded-3'>
              <div className='flex items-center gap-[13px]'>
                <img
                  src={`${feedback.user.userimage}`}
                  alt=''
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                    {feedback.user.name}
                  </h4>
                  <div className='flex items-center gap-[2px]'>
                    {Array.from({ length: feedback.rating }, (_, index) => (
                      <HiStar key={index} className='text-yellowColor w-[18px] h-5' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                {feedback.review_text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
