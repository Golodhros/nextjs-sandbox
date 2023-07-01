import * as React from 'react';

import { DigitalCounter } from '@/components/DigitalCounter';

const SECOND_IN_MILLISECONDS = 1000;

type TimerProps = {
  isOn: boolean;
};

const Timer = ({ isOn }: TimerProps) => {
  const [seconds, setSeconds] = React.useState(0);
  const intervalId = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!isOn) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  }, [isOn]);

  React.useEffect(() => {
    // TODO: move out of SetInterval approach and into setTimeout (more accurate)
    // TODO: use a ready-made hook for this
    if (isOn) {
      intervalId.current = setInterval(() => {
        setSeconds((value) => value + 1);
      }, SECOND_IN_MILLISECONDS);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isOn]);

  return <DigitalCounter value={seconds} />;
};

export { Timer };
