import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import jobTypeApi from '@/api/job-type/jobTypeApi';
import {RootState} from '@/redux';
import {useSelector} from 'react-redux';
import {PaperFilterIcon} from '@/icons';

type Props = {
  checkSizeMin: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}
const TypeJob = (props: Props) => {
  const ref_typeJob = useRef<any>();
  const {checkSizeMin, dataRequest, setDataRequest} = props;
  const [dataTypeJob, setDataTypeJob] = useState<any>([]);
  const [tabType, setTabType] = useState<boolean>(false);
  const dataRequestObj = JSON.parse(
    localStorage.getItem('dataRequest') || '{}',
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleChangeTypeJob = (id: any) => {
    setDataRequest({...dataRequest, jobTypeId: id});
  };
  const handleCheckName = (id: any) => {
    return dataTypeJob.filter((dt: any) => {
      return dt.id === id;
    })[0]?.name;
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = (await jobTypeApi.getJobType(
        languageRedux === 1 ? 'vi' : 'en',
      )) as unknown as IData;
      if (res && res.code === 200 && res.data) {
        setDataTypeJob(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (!ref_typeJob.current.contains(e.target)) {
        setTabType(false);
      }
    };
    document.addEventListener('click', handleBlurTab);
    return () => {
      document.removeEventListener('click', handleBlurTab);
    };
  }, [tabType]);

  return (
    <div
      className={`flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
        checkSizeMin ? 'w-full' : 'w-[32%] min-w-[302px]'
      }`}
      ref={ref_typeJob}
      onClick={() => {
        setTabType(!tabType);
      }}
    >
      <div className="flex items-center">
        <div className="w-6 mx-2">
          <PaperFilterIcon />
        </div>
        <h2>
          {dataRequest?.jobTypeId || dataRequestObj?.jobTypeId
            ? handleCheckName(
                dataRequest.jobTypeId
                  ? dataRequest.jobTypeId
                  : dataRequestObj?.jobTypeId
                  ? dataRequestObj?.jobTypeId
                  : null,
              )
            : languageRedux === 1
            ? 'Loại công việc'
            : 'Type job'}
        </h2>
      </div>
      <div
        className={`absolute inset-x-0 py-4 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 z-10 ${
          tabType ? '' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <ul className="w-full h-80">
          {dataTypeJob.map((dt: any, index: number) => {
            return (
              <li
                key={dt.id}
                className="flex px-5 h-10 items-center item-filter-checkbox group cursor-pointer hover:bg-gray-300/40"
                onClick={() => {
                  handleChangeTypeJob(dt.id);
                }}
              >
                <input
                  className="mr-2 group-hover:bg-black"
                  checked={
                    dt.id ===
                    (dataRequest?.jobTypeId
                      ? dataRequest?.jobTypeId
                      : dataRequestObj?.jobTypeId
                      ? dataRequestObj?.jobTypeId
                      : null)
                  }
                  onChange={() => {
                    handleChangeTypeJob(dt.id);
                  }}
                  type="radio"
                />
                <label className="group-hover:font-bold group-hover:text-blue-600 cursor-pointer">
                  <span>{dt.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <button>
        <Image
          className={`w-5 transition-transform duration-300 ${
            tabType && '-rotate-90'
          }`}
          src={'/iconleft.svg'}
          alt=""
          width={200}
          height={200}
        />
      </button>
    </div>
  );
};

export default TypeJob;
