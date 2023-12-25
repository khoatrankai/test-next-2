import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Cascader, Divider, Typography} from 'antd';
import {RootState} from '@/redux/reducer';
import categoryApi from '@/api/category/categoryApi';
import {ArrowFilterIcon, CateIcon} from '@/icons';

interface ISearchCate {
  setCategories: any;
  setReset: Function;
  reset: boolean;
  categories: any;
}

const SearchCate: React.FC<ISearchCate> = (props) => {
  const {setCategories, reset, setReset, categories} = props;
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);
  const {SHOW_CHILD} = Cascader;
  const {Text} = Typography;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
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
  }, [profileV3]);

  const onChange = (value: string[][]) => {
    setReset(false);
    setCategories(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
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
    <div className="wrap-search_candidate">
      <div
        style={{position: 'absolute', zIndex: '8', top: '10px', left: '10px'}}
      >
        <CateIcon />
      </div>
      <Cascader
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
                children: parentCategory.childs.map((child: any) => {
                  var dis = false;

                  return {
                    value: child.id,
                    label: child.name,
                    disabled: dis,
                  };
                }),
              }))
            : []
        }
        placeholder={languageRedux === 1 ? 'Ngành nghề' : 'Career'}
      />
    </div>
  );
};

export default SearchCate;
