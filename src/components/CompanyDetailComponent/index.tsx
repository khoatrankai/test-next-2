'use client';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import './style.scss';
import {useSelector} from 'react-redux';
import {Skeleton, Tabs} from 'antd';
import type {TabsProps} from 'antd';
import {RootState} from '@/redux/reducer';
import apiCompany from '@/api/company/apiCompany';
import ContactInfo from './ContactInfo';
import ApplyPosition from './ApplyPosition';
import {CateIcon, LocationHomeIcon} from '@/icons';
import ShowCancleSave from '../HistoryComponent/ShowCancelSave';
import ModalLogin from '../ModalLogin/ModalLogin';
import ReviewCompany from './ReviewCompany';
import {useParams} from 'next/navigation';
import searchApi from '@/api/search/apiSearch';
import {useSrollContext} from '@/context/AppProvider';
const DetailCompany = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [applyPostitions, setApplyPositions] = useState(0);
  const [company, setCompanyData] = useState<any>();
  const [nameCompany, setNameCompany] = useState<any>();
  const [postOfCompany, setPostOfCompany] = useState<any>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState<any>('0');
  const [loading, setLoading] = React.useState(true);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const {handleLoadHrefPage} = useSrollContext();
  const searchParams = useParams();
  const companyId = searchParams?.id;

  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      const result = await apiCompany.getDetailCompany(
        companyId as any,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result && result.status === 200) {
        setLoading(false);
        setCompanyData(result.data);
        setNameCompany(result.data.name);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleLoadHrefPage();
  }, []);

  const getApplicationPositionCount = async () => {
    try {
      setLoading(true);

      const result = (await searchApi.getSearchByQueryV2(
        nameCompany,
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        null,
        [],
        null,
        null,
        null,
        languageRedux === 1 ? 'vi' : 'en',
      )) as any;

      if (result.success === true && result.data.posts.length === 20) {
        setLoading(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setHasMore(true);
      } else if (
        result.data.posts.length < 20 &&
        result.data.posts.length > 0
      ) {
        setHasMore(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setPage('0');
      } else {
        setHasMore(false);
        setApplyPositions(result.data.total);
        setPostOfCompany(result.data.posts);
        setPage('0');
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCompanyInfo();
  }, [languageRedux, companyId]);

  useEffect(() => {
    getApplicationPositionCount();
  }, [languageRedux, companyId, company, nameCompany]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <p>{languageRedux === 1 ? 'Thông tin liên hệ' : 'Contact Info'}</p>
      ),
      children: <ContactInfo company={company} />,
    },
    {
      key: '2',
      label: (
        <p>
          {languageRedux === 1 ? 'Vị trí ứng tuyển' : 'Application positions'}
          <span style={{color: '#0D99FF'}}>
            {' '}
            {'('}
            {applyPostitions}
            {')'}
          </span>
        </p>
      ),
      children: (
        <ApplyPosition
          nameCompany={company?.name}
          postOfCompany={postOfCompany}
          setPostOfCompany={setPostOfCompany}
          hasMore={hasMore}
          setHasMore={setHasMore}
          page={page}
          setPage={setPage}
          companyId={companyId}
          accountId={company?.accountId}
        />
      ),
    },
    {
      key: '3',
      label: <p>{languageRedux === 1 ? 'Đánh giá' : 'Review'}</p>,
      children: <ReviewCompany company={company} companyId={companyId} />,
    },
  ];

  return (
    <div className={styles.detail_company_container}>
      <div className={styles.detail_company_content}>
        <div className={styles.detail_company_title}>
          <h3 className="mt-5">
            {languageRedux === 1 ? 'Chi tiết công ty' : 'View detail Company'}
          </h3>
        </div>
        <Skeleton loading={false} active>
          <div className={styles.detail_company_intro}>
            <div className={styles.logo_company}>
              <img
                src={company?.logoPath ? company.logoPath : ''}
                alt=""
                loading="lazy"
              />
            </div>
            <div className={styles.info_company}>
              <div className={styles.company_name}>
                <h3>
                  {company?.name
                    ? company.name
                    : languageRedux === 1
                    ? 'Thông tin công ty chưa cập nhật'
                    : 'Company information not updated yet'}
                </h3>
              </div>
              <div className={styles.company_address}>
                <div className={styles.address_item}>
                  <LocationHomeIcon />
                  <p>
                    {company?.address
                      ? company.address
                      : languageRedux === 1
                      ? 'Thông tin công ty chưa cập nhật'
                      : 'Company information not updated yet'}
                  </p>
                </div>
                <div className={styles.address_item}>
                  <CateIcon />
                  <p>
                    {languageRedux === 1
                      ? `${applyPostitions} vị trí ứng tuyển`
                      : `${applyPostitions} application positions`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail_company_tabs">
            <Tabs defaultActiveKey="1" items={items} animated={false} />
          </div>
        </Skeleton>
      </div>
      <ShowCancleSave />
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={setOpenModalLogin}
      />
    </div>
  );
};

export default DetailCompany;
