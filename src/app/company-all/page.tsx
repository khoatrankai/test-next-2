'use client';
import React, { useEffect, useState } from 'react';
import {  Spin } from 'antd';
// import component
// import css
import './style.scss';
// import antIcon
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
// scroll data
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import { RootState } from '@/redux/reducer';
import locationApi from '@/api/location/locationApi';
import { setLocationApi } from '@/redux/reducer/locationReducer';
import SearchLocationCompany from '@/components/CompanyComponent/SearchLocationCompany';
import SearchCateCompany from '@/components/CompanyComponent/SearchCateCompany';
import SearchSizeCompany from '@/components/CompanyComponent/SearchSizeCompany';
import apiCompany from '@/api/company/apiCompany';
import { useStepContext } from '@mui/material';
import { useSrollContext } from '@/context/AppProvider';
import CompanyCard from '@/components/CompanyComponent/CompanyCard';

const CompanyAll = () => {
  const {handleLoadHrefPage} = useSrollContext();
  const dispatch = useDispatch();
  const [listData, setListData] = useState<any>([]);
  const [addresses, setAddresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState<number | undefined>();
  const [page, setPage] = React.useState<any>('0');
  const [reset, setReset] = useState(false);
  const [total, setTotal] = useState(0);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [hasMore, setHasMore] = React.useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    handleLoadHrefPage();
  }, [])
  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        dispatch(setLocationApi(result));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCompany = async () => {
    try {
      const result = await apiCompany.filterCompany(
        addresses,
        categories,
        size,
        20,
        0,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result && result?.data?.companies?.length !== 0) {
        setTotal(result?.data?.total);
        setListData(result.data?.companies);
      } else {
        setTotal(0);
        setHasMore(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  React.useEffect(() => {
    getAllLocaitions();
  }, [languageRedux]);

  React.useEffect(() => {
    getAllCompany();
  }, [languageRedux]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitSearchCompany = async () => {

    try {
      const result = await apiCompany.filterCompany(
        addresses,
        categories,
        size,
        20,
        0,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result && result?.data.companies?.length === 20) {
        setTotal(result?.data?.total);
        setListData(result.data.companies);
        setHasMore(true);
      } else if (
        result &&
        result?.data.companies?.length < 20 &&
        result?.data.companies?.length > 0
      ) {
        setTotal(result?.data?.total);
        setListData(result.data.companies);
        setHasMore(false);
      } else {
        setTotal(result?.data?.total);
        setListData([]);
        setHasMore(false);
        setListData([])
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleResetSearchCandidate = () => {
    setAddresses([]);
    setCategories([]);
    setSize(undefined);
    setReset(true);
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      const result = await apiCompany.filterCompany(
        addresses,
        categories,
        size,
        20,
        nextPage,
        languageRedux === 1 ? 'vi' : 'en',
      );
      setHasMore(true);
      if (result && result?.data?.companies?.length === 20) {
        setTotal(result?.data?.total);
        setListData((prev: any) => [...prev, ...result?.data.companies]);
        setPage(nextPage);
      } else if (
        result &&
        result?.data.companies?.length < 20 &&
        result?.data.companies?.length > 0
      ) {
        setTotal(result?.data?.total);
        setListData((prev: any) => [...prev, ...result?.data.companies]);
        setHasMore(false);
      } else {
        setTotal(result?.data?.total);
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title =
      languageRedux === 1
        ? 'Tìm kiếm công ty'
        : 'Search for company';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/list-company' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  return (
    <div className="company-all-container">
      {contextHolder}
      <div className="company max-w-6xl">
        <div className="header-company mb-2">
          <h3>
            {languageRedux === 1 ? 'Tìm kiếm công ty' : 'Looking company'}
          </h3>
        </div>
        <div className="search-company ">
          <p className='mb-3'>
            {languageRedux === 1
              ? 'Tìm công ty phù hợp với bạn!'
              : 'Find the company for your job!'}
          </p>
          <div className="list-search">
            <div className="list-search-filter">
              <SearchLocationCompany
                setAddresses={setAddresses}
                setReset={setReset}
                reset={reset}
                addresses={addresses}
              />
              <SearchCateCompany
                setCategories={setCategories}
                setReset={setReset}
                reset={reset}
                categories={categories}
              />
              <SearchSizeCompany
                setSize={setSize}
                setReset={setReset}
                reset={reset}
              />
            </div>
            <div className="submit-search">
              <div
                className="submit-seach_button seach-button_Confirm"
                onClick={handleSubmitSearchCompany}
              >
                {languageRedux === 1 ? 'Xác nhận' : 'Confirm'}
              </div>

              <div
                className="submit-seach_button seach-button_Reset"
                onClick={handleResetSearchCandidate}
              >
                {languageRedux === 1 ? 'Đặt lại' : 'Reset'}
              </div>
            </div>
          </div>
        </div>
        <div className="list-candidates">
          <div className="list-candidates_title">
            <h3>
              {languageRedux === 1 ? 'Kết quả tìm kiếm:' : 'Found results:'}
              <span>
                {total}
                {languageRedux === 1 ? ' công ty' : ' company'}
              </span>
            </h3>
          </div>

          <InfiniteScroll
            dataLength={listData?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
            style={{ overflow: 'unset' }}
          >
            <div className="list-company">
              {listData?.length !== 0 ? (
                listData?.map((item: any, index: any) => {
                  return (
                    <CompanyCard
                      item={item}
                      key={index}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>

    </div>
  );
};

export default CompanyAll;
