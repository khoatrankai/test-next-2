import React, { useMemo } from 'react';
import CardsAppliedAll from '../CardsAppliedAll/CardsAppliedAll';
import CardsAppliedApproved from '../CardsAppliedApproved/CardsAppliedApproved';
import CardsAppliedPending from '../CardsAppliedPendingComponent/CardsAppliedPendingComponent';


interface ICardsApplied {
  activeChild: string;
}

const CardsApplied: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;

  const AppliedAll = useMemo(() => {
    if (activeChild === '0-0') {
      return <CardsAppliedAll activeChild={activeChild} />;
    }
  }, [activeChild]);

  const AppliedPending = useMemo(() => {
    if (activeChild === '0-2') {
      return <CardsAppliedPending activeChild={activeChild} />;
    }
    return null;
  }, [activeChild]);

  const AppliedApproved = useMemo(() => {
    if (activeChild === '0-1') {
      return <CardsAppliedApproved activeChild={activeChild} />;
    }
    return null;
  }, [activeChild]);

  return (
    <>
      <>
        {AppliedAll}
        {AppliedApproved}
        {AppliedPending}
      </>
    </>
  );
};

export default CardsApplied;
