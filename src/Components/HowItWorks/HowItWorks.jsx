import React from 'react';
import './HowItWorks.css';
import one from '../../assets/oneHow.png'
import two from '../../assets/twoHow.png'
import three from '../../assets/threeHow.png'

const HowItWorks = () => {
  return (
    <div className='how-it-works-container w-3/4 m-auto mt-20'>
      <h1 className='text-2xl font-bold text-center'>How It Works</h1>
      <div className='steps-grid mt-10'>
        {steps.map((step, index) => (
          <div key={index} className='step-item'>
            <img src={step.icon} alt={step.title} className='step-icon' />
            <h3 className='step-title'>{step.title}</h3>
            <p className='step-description'>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const steps = [
  {
    icon: one, // Replace with actual icon path
    title: 'Register as a Mentor or Mentee',
    description: 'Sign up on our platform to get started. Choose your role as a mentor or mentee.'
  },
  {
    icon: two, // Replace with actual icon path
    title: 'Select Available Sessions or Offer Time Slots',
    description: 'Browse available sessions or set your availability as a mentor to offer time slots.'
  },
  {
    icon: three, // Replace with actual icon path
    title: 'Join Sessions and Track Progress',
    description: 'Participate in your selected sessions and track your progress along the way.'
  },
];

export default HowItWorks;
