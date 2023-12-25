import React, {memo} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditNameFaxCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditNameFaxCompany: React.FC<IEditNameFaxCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {dataCompany, setDataCompany, is_profile} = props;

  const handleEditCompanyFax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value} = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      taxCode: value,
    }));
  };

  const handleEditCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value} = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      name: value,
    }));
  };

  return (
    <div className="edit-name-tax-company-container">
      <div className="edit-name-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {languageRedux === 1 ? 'Tên công ty' : 'Company name'}{' '}
          <span style={{color: 'red'}}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          name="title"
          value={dataCompany?.name}
          onChange={handleEditCompanyName}
          size="small"
          sx={{width: '100%', marginTop: '8px'}}
          placeholder={
            languageRedux === 1 ? 'Nhập tên công ty' : 'Enter company name'
          }
          disabled={is_profile ? true : false}
        />
      </div>
      <div className="edit-tax-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {languageRedux !== 1 ? 'Tax code' : 'Mã số thuế'}{' '}
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.taxCode}
          onChange={handleEditCompanyFax}
          size="small"
          sx={{width: '100%', marginTop: '8px'}}
          placeholder={
            languageRedux === 1 ? 'Nhập mã số thuế' : 'Enter tax code'
          }
          disabled={is_profile ? true : false}
        />
      </div>
    </div>
  );
};

export default memo(EditNameFaxCompany);
