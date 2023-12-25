'use client';
import React, { useEffect as useIsomorphicLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';
import HistoryPost from '@/components/HistoryComponent/History/history';

type Props = {};

const Page = (props: Props) => {
  useIsomorphicLayoutEffect(() => {
  }, []);

  return (
    <Provider store={store}>
      <HistoryPost />
    </Provider>
  );
};

export default Page;
