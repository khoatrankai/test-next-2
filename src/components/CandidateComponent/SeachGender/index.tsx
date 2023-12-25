import React from 'react';
import { useSelector } from 'react-redux';
import { Select, Space, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

import './style.scss';
import { RootState } from '@/redux/reducer';
import { GenderIcon } from '@/icons/iconCandidate';
import { ArrowFilterIcon } from '@/icons';

const CustomOption = ({
  genderType,
  setTypeAcademic,
  typeAcademic,
  setValueRender,
  setGender,
  reset,
}: {
  genderType: any;
  typeAcademic: number;
  setTypeAcademic: any;
  setValueRender: Function;
  setGender: Function;
  reset: boolean;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    const valueRender = genderType.find((item: any) => item.id === value);
    setGender(value);
    if (valueRender) {
      setValueRender(valueRender);
    }
    setTypeAcademic(value);
  };

  return (
    <div className="wrap-radio_candidate">
      <div className="title-candidate">
        <h3>Giới tính</h3>
      </div>
      <Radio.Group
        style={{ width: '100%' }}
        name="radiogroup"
        onChange={onChange}
        value={
          reset ? -1 : typeAcademic === -1 ? -1 : typeAcademic === 0 ? 0 : 1
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {genderType?.map((value: any, index: number) => {
            return (
              <Radio key={index} style={{ width: '100%' }} value={value.id}>
                {value.data}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

interface ISeachGender {
  setGender: any;
  setReset: Function;
  reset: boolean;
  genderValue: number | undefined;
}

const SeachGender: React.FC<ISeachGender> = (props) => {
  const { setGender, setReset, reset, genderValue } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const { Option } = Select;

  const [typeAcademic, setTypeAcademic] = React.useState(-1);

  const [valueRender, setValueRender] = React.useState<any>({
    id: -1,
    data: languageRedux === 1 ? 'Tất cả' : 'All',
  });
  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  var gender = [
    {
      id: -1,
      data: languageRedux === 1 ? 'Tất cả' : 'All',
    },
    {
      id: 1,
      data: languageRedux === 1 ? 'Nam' : 'Male',
    },
    {
      id: 0,
      data: languageRedux === 1 ? 'Nữ' : 'Female',
    },
  ];

  const handleChange = (value1: string) => {
    setReset(false);
  };

  React.useEffect(() => {
    if (reset) {
      setValueRender({ id: -1, data: languageRedux === 1 ? 'Tất cả' : 'All' });
    }
  }, [reset]);

  return (
    <div className="filter-candidate">
      <div className="filter-input_candidate">
        <GenderIcon />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={
          valueRender && reset
            ? languageRedux === 1
              ? 'Tất cả'
              : 'All'
            : valueRender?.data
        }
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder={languageRedux === 1 ? 'Giới tính' : 'Sex'}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="5" label="">
          <CustomOption
            genderType={gender}
            setTypeAcademic={setTypeAcademic}
            typeAcademic={typeAcademic}
            setValueRender={setValueRender}
            setGender={setGender}
            reset={reset}
          />
        </Option>
      </Select>
    </div>
  );
};

export default SeachGender;
