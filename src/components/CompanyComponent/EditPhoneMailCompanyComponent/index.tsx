import React, {memo} from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import { Input } from 'antd';

import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};
interface NumericInputProps {
  value: any;
  onChange: (value: any) => any;
  languageRedux: any;
  language: any;
  is_profile: boolean;
}

interface IEditPhoneMailCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const NumericInput = (props: NumericInputProps) => {
  const {value, onChange, languageRedux, language, is_profile} = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value: inputValue} = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange((preValue: any) => ({...preValue, phone: inputValue}));
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange((preValue: any) => ({
      ...preValue,
      phone: valueTemp.replace(/(\d+)/, '$1'),
    }));
  };
  return (
    <TextField
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Nhập số điện thoại"
      inputProps={{maxLength: 10}}
      size="small"
      sx={{width: '100%', marginTop: '8px'}}
      disabled={is_profile ? true : false}
    />
  );
};

const EditPhoneMailCompany: React.FC<IEditPhoneMailCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {dataCompany, setDataCompany, is_profile} = props;

  const handleEditCompanyMail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value} = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      email: value,
    }));
  };

  return (
    <div className="edit-phone-mail-company-container">
      <div className="edit-phone-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {languageRedux === 1 ? 'Số điện thoại' : 'Phone'}{' '}
          <span style={{color: 'red'}}>*</span>
        </Typography>
        <NumericInput
          value={dataCompany?.phone}
          onChange={setDataCompany}
          languageRedux={languageRedux}
          language={language}
          is_profile={is_profile}
        />
      </div>
      <div className="edit-mail-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          Email <span style={{color: 'red'}}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.email}
          onChange={handleEditCompanyMail}
          size="small"
          sx={{width: '100%', marginTop: '8px'}}
          placeholder={languageRedux === 1 ? 'Nhập email' : 'Enter email'}
          disabled={is_profile ? true : false}
        />
      </div>
    </div>
  );
};

export default memo(EditPhoneMailCompany);
