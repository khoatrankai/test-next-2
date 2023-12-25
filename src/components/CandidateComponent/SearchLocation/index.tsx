import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Cascader, Divider, Typography } from 'antd';

import './style.scss';
import { RootState } from '@/redux/reducer';
import { ArrowFilterIcon, LocationIcon } from '@/icons';
import { fetchLocation } from '@/redux/reducer/locationReducer';


interface ISearchLocation {
  setAddresses: any;
  setReset: Function;
  reset: boolean;
  addresses: any;
}

const SeachLocation: React.FC<ISearchLocation> = (props) => {
  const { setAddresses, reset, setReset, addresses } = props;
  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocation('vi') as any);
  }, []);

  const [disable, setDisable] = React.useState<Boolean>(false);

  const { SHOW_CHILD } = Cascader;
  const { Text } = Typography;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const onChange = (value: string[][]) => {
    setReset(false);
    setAddresses(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
      <Text className="title-filter_location">Địa điểm</Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable ? 'Vui lòng chọn địa điểm bạn muốn tìm kiếm.' : ''}
      </Divider>
    </div>
  );

  return (
    <div className="wrap-search_candidate">
      <div
        style={{ position: 'absolute', zIndex: '8', top: '10px', left: '10px' }}
      >
        <LocationIcon />
      </div>
      <Cascader
        allowClear
        style={{ width: '100%' }}
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
                  (child: { district_id: string; district: string }) => {
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

export default SeachLocation;
