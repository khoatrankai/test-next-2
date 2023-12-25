import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
// import ant
import {Button, Cascader, Divider, Typography} from 'antd';
import './style.scss';
import {RootState} from '@/redux/reducer';
import categoryApi from '@/api/category/categoryApi';
import {ArrowFilterIcon, CateIcon} from '@/icons';
interface ISearchCate {
  setCategories: any;
  setReset: Function;
  reset: boolean;
  categories: any;
}

const SearchCateCompany: React.FC<ISearchCate> = (props) => {
  const {setCategories, reset, setReset, categories} = props;
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);
  const {SHOW_CHILD} = Cascader;
  const {Text} = Typography;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.profile.profile);
  const getCategories = async () => {
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

  React.useEffect(() => {
    if (dataCategories === null) {
      getCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3, languageRedux]);

  const onChange = (value: string[][]) => {
    setReset(false);
    setCategories(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-cate-company filter-company">
      <Text className="title-filter_location">
        {languageRedux === 1 ? 'Ngành nghề' : 'Career'}
      </Text>
      {menus}
      <Divider style={{margin: '8px 5px'}}>
        {disable ? 'Vui lòng chọn ngành nghề bạn muốn tìm kiếm.' : ''}
      </Divider>
    </div>
  );

  return (
    <div className="wrap-search_company" style={{width: '100%'}}>
      <div
        style={{position: 'absolute', zIndex: '1', top: '10px', left: '10px'}}
      >
        <CateIcon />
      </div>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        style={{width: '100%'}}
        onChange={onChange as any}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        // inputIcon={<CateIcon />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        size="large"
        dropdownRender={DropdownRender}
        value={reset ? [] : categories}
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
                value: parentCategory.parent_category_id,
                label: parentCategory.parent_category,
              }))
            : []
        }
        placeholder={languageRedux === 1 ? 'Ngành nghề' : 'Career'}
      />
    </div>
  );
};

export default SearchCateCompany;
