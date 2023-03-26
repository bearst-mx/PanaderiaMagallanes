import React from 'react';
import { BsDot } from "react-icons/bs"

export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  console.log("los eventos son:",day.event)
  return (
    <div onClick={onClick} className={className}>
      <p>{day.value === 'padding' ? '' : day.value}</p>
      {day.event && <div className='event'><BsDot size={60}/></div>}
    </div>
  );
};