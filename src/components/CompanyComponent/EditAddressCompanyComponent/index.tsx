import React, {useState, useEffect, memo} from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
import locationApi from '@/api/location/locationApi';
import {fetchLocation} from '@/redux/reducer/locationReducer';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditAddressCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {setDataCompany, dataCompany, is_profile} = props;

  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const dataProvinces = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocation('vi') as any);
  }, []);

  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces?.find(
          (dataProvince: any) =>
            dataProvince?.province_fullName ===
            dataCompany?.companyLocation?.district?.province?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProvinces, languageRedux]);

  useEffect(() => {
    if (dataDistricts && !selectedDistrict) {
      setSelectedDistrict(
        dataDistricts?.find(
          (dataDistrict: any) =>
            dataDistrict?.full_name ===
            dataCompany?.companyLocation?.district?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistricts, languageRedux]);

  useEffect(() => {
    if (dataWards && !selectedWard) {
      setSelectedWard(
        dataWards?.find(
          (dataWard: any) =>
            dataWard?.full_name === dataCompany?.companyLocation?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWards, languageRedux]);

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (
        dataCompany?.companyLocation?.district?.province?.id &&
        dataDistricts === null
      ) {
        const districts = await locationApi.getDistrictsById(
          dataCompany?.companyLocation?.district?.province?.id,
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (districts) {
          setDataDistrict(districts?.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.province_id,
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (districts) {
            setDataDistrict(districts?.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All ward by ward id
  const getDataWard = async () => {
    try {
      if (dataDistricts && dataWards === null) {
        const allward = await locationApi.getWardsId(
          dataCompany?.companyLocation?.district?.id,
          languageRedux === 1 ? 'vi' : 'en',
        );

        if (allward) {
          setDataWard(allward?.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            languageRedux === 1 ? 'vi' : 'en',
          );
          if (allward) {
            setDataWard(allward?.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDataDistrict();
  }, [selectedProvince, languageRedux]);

  React.useEffect(() => {
    getDataWard();
  }, [selectedDistrict, languageRedux]);

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(value);

    setDataWard([]);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setSelectedWard(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyLocation: {
        id: value?.id,
      },
    }));
  };

  const handleChangeAddress = (e: any) => {
    setDataCompany((preValue: any) => ({
      ...preValue,
      address: e.target?.value,
    }));
  };

  return (
    <div className="edit-address-company-container">
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="addressTitle"
          >
            {languageRedux === 1 ? 'Thành phố ' : 'City '}
            <span style={{color: 'red'}}>*</span>
          </Typography>

          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => languageRedux === 1 ? option?.province_fullName : option?.province_name || ''}
            value={selectedProvince || null}
            // onChange={handleProvinceChange}
            onChange={(event: any, newValue: any | null) => {
              handleProvinceChange(event, newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? 'Thành phố' : 'City'}
                size="small"
                value={selectedProvince?.province_fullName}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.province_fullName === value.province_fullName;
            }}
            style={{marginTop: '8px'}}
          />
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1 ? 'Quận/Huyện ' : 'District '}{' '}
            <span style={{color: 'red'}}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? 'Quận/Huyện ' : 'District '}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{marginTop: '8px'}}
          />
        </div>
      </div>
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1 ? 'Phường/Xã ' : 'Ward '}{' '}
            <span style={{color: 'red'}}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1 ? 'Phường/Xã ' : 'Ward '}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{marginTop: '8px'}}
          />
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1
              ? 'Tên đường, toà nhà, số nhà '
              : 'Street name, building name, house number '}{' '}
            <span style={{color: 'red'}}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={dataCompany?.address}
            onChange={handleChangeAddress}
            size="small"
            sx={{width: '100%', marginTop: '8px'}}
            placeholder={
              languageRedux === 1
                ? 'Tên đường, toà nhà, số nhà '
                : 'Street name, building name, house number '
            }
            disabled={is_profile ? true : false}
          />
        </div>
      </div>
    </div>
  );
});

export default memo(EditAddressCompany);
