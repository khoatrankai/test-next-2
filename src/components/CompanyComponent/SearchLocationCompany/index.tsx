import React from 'react';
import {useSelector} from 'react-redux';

// import ant
import {Button, Cascader, Divider, Typography} from 'antd';

import './style.scss';
import {RootState} from '@/redux/reducer';
import {ArrowFilterIcon, LocationIcon} from '@/icons';
interface ISearchLocation {
  setAddresses: any;
  setReset: Function;
  reset: boolean;
  addresses: any;
}

const SearchLocationCompany: React.FC<ISearchLocation> = (props) => {
  const {setAddresses, reset, setReset, addresses} = props;
  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const [disable, setDisable] = React.useState<Boolean>(false);
  const {SHOW_CHILD} = Cascader;
  const {Text} = Typography;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const onChange = (value: string[][]) => {
    setReset(false);
    setAddresses(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate filter-candidate">
      <Text className="title-filter_location">
        {languageRedux === 1 ? 'Địa điểm' : 'Location'}
      </Text>
      {menus}
      <Divider style={{margin: '8px 5px'}}>
        {disable ? 'Vui lòng chọn địa điểm bạn muốn tìm kiếm.' : ''}
      </Divider>
    </div>
  );

  return (
    <div className="wrap-search_company">
      <div
        style={{
          position: 'absolute',
          zIndex: '1',
          top: '10px',
          left: '10px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <LocationIcon />
      </div>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        allowClear
        style={{width: '100%'}}
        onChange={onChange as any}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        // inputIcon={<LocationIcon />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        size="large"
        dropdownRender={DropdownRender}
        value={reset ? [] : addresses}
        options={
          dataLocations
            ? dataLocations?.map((dataLocation: any) => ({
                value: dataLocation.province_id,
                label: dataLocation.province_fullName,
                children: dataLocation.districts.map(
                  (child: {district_id: string; district: string}) => {
                    var dis = false;
                    return {
                      value: child.district_id,
                      label: child.district,
                      disabled: dis,
                    };
                  },
                ),
              }))
            : []
        }
        placeholder={languageRedux === 1 ? 'Địa điểm' : 'Location'}
      />
    </div>
  );
};

export default SearchLocationCompany;
