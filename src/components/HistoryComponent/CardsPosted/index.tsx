import React, { useEffect, useMemo } from 'react';
import './style.scss';
import CardsPostedClose from '../CardsPostedClose/CardsPostedClose';
import CardsPostedOpen from '../CardsPostedOpen';
import CardsPostedAll from '../CardsPostedAll';

interface ICardsApplied {
  activeChild: string;
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}

const CardsPosted: React.FC<ICardsApplied> = (props) => {
  const { activeChild, setShowDetailPosted, showDetailPosted } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PostedAll = useMemo(() => {
    if (activeChild === '2-0') {
      return (
        <CardsPostedAll
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  const PostedClose = useMemo(() => {
    if (activeChild === '2-2') {
      return (
        <CardsPostedClose
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  const PostedOpen = useMemo(() => {
    if (activeChild === '2-1') {
      return (
        <CardsPostedOpen
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild, showDetailPosted]);

  return (
    <>
      <>
        {PostedAll}
        {PostedClose}
        {PostedOpen}
      </>
    </>
  );
};

export default CardsPosted;
