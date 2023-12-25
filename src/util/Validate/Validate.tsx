'use client';
import {RootState} from '@/redux';
import React from 'react';
import {useSelector} from 'react-redux';

type Props = {};

const Validate = () => {
  const ModalValidate = (value: any, handleYes: any, handleNo: any, languageRedux: any) => {

    return (
      <div className="fixed inset-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
        <div className="p-2 w-96 rounded-md bg-white">
          <h2 className="p-4 text-center">{value}</h2>
          <div className="flex justify-around">
            <button
              className="bg-slate-100 p-2 hover:bg-slate-200 rounded-xl hover:font-bold"
              onClick={handleYes}
            >
              {languageRedux === 1 ? `Có` : `Yes`}
            </button>
            <button
              className="bg-slate-100 p-2 hover:bg-slate-200 rounded-xl hover:font-bold"
              onClick={handleNo}
            >
              {languageRedux === 1 ? `Không` : `No`}
            </button>
          </div>
        </div>
      </div>
    );
  };
  return {ModalValidate};
};

export default Validate;
