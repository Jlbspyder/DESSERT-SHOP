import React, { useEffect, useState } from 'react';

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
   const timer = setTimeout(() => {
     setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer)
  }, [timeLeft]);

  const getTime = (millisec) => {
    let sec = parseInt(Math.floor(millisec / 1000));
    let min = parseInt(Math.floor(sec / 60));
    let hrs = parseInt(Math.floor(min / 60));

    let seconds = parseInt(sec % 60);
    let minutes = parseInt(min % 60);
    const secFormat = seconds.toString().padStart(2, "0");
    

    return `${minutes} Mins : ${secFormat} sec`;
  };

  return <>{getTime(timeLeft)}</>;
};

export default Timer;
