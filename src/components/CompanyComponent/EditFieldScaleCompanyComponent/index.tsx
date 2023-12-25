import React, {useState, useEffect, memo} from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {RootState} from '@/redux/reducer';
import apiCompany from '@/api/company/apiCompany';
import categoryApi from '@/api/category/categoryApi';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
}

const EditFieldScaleCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {setDataCompany, dataCompany, is_profile} = props;

  const [dataSizes, setDataSizes] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [dataCategories, setDataCategories] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    if (dataSizes && !selectedSize) {
      setSelectedSize(
        dataSizes?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companySizeInfomation?.nameText,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSizes]);
  useEffect(() => {
    if (dataCategories && !selectedCategory) {
      setSelectedCategory(
        dataCategories?.find(
          (dataCate: any) =>
            dataCate?.parent_category_id === dataCompany?.companyCategory?.id,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategories]);

  const getSizes = async () => {
    try {
      const sizes = await apiCompany.getAllSizesCompany(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (sizes) {
        setDataSizes(sizes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCateogrys = async () => {
    try {
      const result = await categoryApi.getAllCategorise(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  useEffect(() => {
    if (is_profile === false) {
      getCateogrys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanySize = (event: any, value: any) => {
    setSelectedSize(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companySizeInfomation: {
        id: value?.id,
      },
    }));
  };
  const handleEditCompanyCategory = (event: any, value: any) => {
    setSelectedCategory(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyCategory: {
        id: value?.parent_category_id,
      },
    }));
  };

  return (
    <div className="edit-field-scale-company-container">
      <div className="edit-field-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {languageRedux === 1 ? 'Lĩnh vực hoạt động' : 'Field of activity'}{' '}
          <span style={{color: 'red'}}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataCategories ? dataCategories : []}
          getOptionLabel={(option: any) => option?.parent_category || ''}
          value={selectedCategory || null}
          onChange={handleEditCompanyCategory}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                languageRedux === 1 ? 'Chọn lĩnh vực' : 'Select field'
              }
              size="small"
              value={selectedCategory?.parent_category}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.parent_category === value?.parent_category;
          }}
          style={{marginTop: '8px'}}
        />
      </div>

      <div className="edit-scale-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {languageRedux === 1 ? 'Quy mô công ty' : 'Company scale'}{' '}
          <span style={{color: 'red'}}>*</span>
        </Typography>
        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataSizes ? dataSizes : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedSize || null}
          onChange={handleEditCompanySize}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1 ? 'Chọn quy mô' : 'Select scale'}
              size="small"
              value={selectedSize?.nameText}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.nameText === value?.nameText;
          }}
          style={{marginTop: '8px'}}
        />
      </div>
    </div>
  );
});

export default memo(EditFieldScaleCompany);
