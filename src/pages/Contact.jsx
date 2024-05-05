import React from 'react'

const Contact = () => {
  return (
    <section className=' '>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-4 font-light text-center text__para'>
          Got a technical issue? Want to send feedback about a beta fetature? Let us know.
        </p>
        <div className='flex w-full justify-center'>
          <form action='' className=''>
            <div className='grid grid-cols-3'>
              <label htmlFor='email' className='form__label'>
                Your Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='example@gmail.com'
                className='form__input mt-1 ml-2 w-80 col-span-2' />
            </div>
            <div className='grid grid-cols-3'>
              <label htmlFor='subject' className='form__label '>
                Subject
              </label>
              <input
                type='text'
                id='subject'
                placeholder='Let us know how we can help you'
                className='form__input mt-1 ml-2 w-80 col-span-2' />
            </div>
            <div className='sm:col-span-2 grid grid-cols-3'>
              <label htmlFor='message' className='form__label'>
                Your Message
              </label>
              <textarea
                rows='6'
                type='text'
                id='message'
                placeholder='Leave a comment...'
                className='form__input mt-1 ml-2  col-span-2' />
            </div>
            <div className='flex justify-center my-3'>

            <button type='submit' className='btn rounded sm:w-fit'>Submit</button>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Contact