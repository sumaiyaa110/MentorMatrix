// SidebarData.jsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Available Sessions',
    path: '/sessions',
    icon: <FaIcons.FaBook />,
  },
  {
    title: 'Available Mentors',
    path: '/available-mentors',
    icon: <FaIcons.FaUsers />,
  },
  
  {
    title: 'Feedback',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: 'FAQs',
    path: '/faqs',
    icon: <FaIcons.FaQuestionCircle />,
  },
 
];
