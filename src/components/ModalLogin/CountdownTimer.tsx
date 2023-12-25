import React, { useState, useEffect } from 'react';

interface PropsCountDown {
  setResendCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CountdownTimer: React.FC<PropsCountDown> = (props) => {
  const { setResendCode } = props;

  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setResendCode(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <p className="resend-otp_countDown" style={{ color: '#5d5d5d ' }}>
      {' sau ' + formatTime(seconds)}
    </p>
  );
};

export default CountdownTimer;
