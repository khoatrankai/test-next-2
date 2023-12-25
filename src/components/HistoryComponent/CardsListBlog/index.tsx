import React from 'react';
import CardListBlogSave from '../CardListBlogSave';
import CardListBlogCreate from '../CardListBlogCreate';

interface ICardsApplied {
  activeChild: string;
}

const CardsListBlog: React.FC<ICardsApplied> = (props) => {
  const { activeChild } = props;
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListBlogSave = React.useMemo(() => {
    if (activeChild === '3-0') {
      return (
        <CardListBlogSave />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild]);

  const ListBlogCreate = React.useMemo(() => {
    if (activeChild === '3-1') {
      return (
        <CardListBlogCreate />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild]);

  return (
    <>
      {ListBlogSave}
      {ListBlogCreate}
    </>
  )
};

export default CardsListBlog;
