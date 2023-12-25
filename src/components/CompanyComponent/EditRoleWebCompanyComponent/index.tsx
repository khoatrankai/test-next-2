import React, {useState, useEffect, memo} from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
import apiCompany from '@/api/company/apiCompany';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditRoleWebCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {setDataCompany, dataCompany, is_profile} = props;
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [dataRoles, setDataRoles] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  useEffect(() => {
    if (dataRoles && !selectedRole) {
      setSelectedRole(
        dataRoles?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companyRoleInfomation?.nameText,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoles]);

  const getRoles = async () => {
    try {
      const roles = await apiCompany.getAllRolesCompany(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (roles) {
        setDataRoles(roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (is_profile === false) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanyRole = (event: any, value: any) => {
    setSelectedRole(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyRoleInfomation: {
        id: value.id,
      },
    }));
  };

  const handleEditCompanyWeb = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {value} = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      website: value,
    }));
  };

  return (
    <div className="edit-role-web-company-container">
      <div className="edit-role-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {languageRedux === 1 ? 'Vai trò của bạn' : 'Your role'}{' '}
          <span style={{color: 'red'}}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataRoles ? dataRoles : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedRole || null}
          onChange={handleEditCompanyRole}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1 ? 'Chọn vai trò' : 'Select role'}
              size="small"
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option.nameText === value.nameText;
          }}
          style={{marginTop: '8px'}}
        />
      </div>

      <div className="edit-web-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          Website <span style={{color: 'red'}}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.website}
          onChange={handleEditCompanyWeb}
          size="small"
          sx={{width: '100%', marginTop: '8px'}}
          placeholder='http://"'
          disabled={is_profile ? true : false}
          //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
});

export default memo(EditRoleWebCompany);
