import React, {useRef, useState} from 'react';
import Image from 'next/image';
import {useEffect} from 'react';
import categoryApi from '@/api/category/categoryApi';
import {getCookie, setCookie} from '@/cookies';
import useSwiperAutoSlider from '@/util/SwiperAutoSlider';
import jsCookie from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId} from '@/redux/reducer/categoryIdReducer';

type Props = {};

interface ICategory {
  data: any;
  code: number;
}

const NavbarComponent = (props: Props) => {
  const ref_nav = useRef<any>();
  const {
    position,
    setPosition,
    checkClick,
    setCheckClick,
    ref_list_slider,
    handleClickDown,
    handleNext,
    handlePrev,
    checkNext,
    checkPrev,
    handleUpData,
  } = useSwiperAutoSlider();
  const [checkLoadNav, setCheckLoadNav] = useState<any>(false);
  const [listParentCategory, setListParentCategory] = useState<any[]>([]);
  const [languageId, setLanguageId] = useState<string>('0');
  const [categoriesId, setCategoriesId] = useState<string>(
    getCookie('categoryId') as any,
  );
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const positionNav = Number(getCookie('positionNav'));
    if (positionNav !== position && checkLoadNav) {
      setCookie('positionNav', position.toString(), 365);
    } else {
      setCheckLoadNav(true);
    }
  }, [position, checkLoadNav]);
  useEffect(() => {
    const positionNavbar = Number(getCookie('positionNav'));
    if (positionNavbar) {
      setPosition(positionNavbar);
    }
  }, []);
  useEffect(() => {
    handleUpData();
  }, [listParentCategory]);
  useEffect(() => {
    const fetch = () => {
      setLanguageId(getCookie('languageId') as any);
    };
    fetch();
  }, [getCookie('languageId'), categoriesId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await categoryApi.getParentCategory(
          languageId as any,
        )) as unknown as ICategory;

        if (data && (data?.code as any) === 200) {
          setListParentCategory(data.data);
          const id = jsCookie.get('categoryId') as any;
          const category = data?.data.find((item: any) => item.id === +id);
          if (category) {
            document.cookie = `categoryName=${category.name}`;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [languageId, languageRedux]);
  const handleClickCategory = (id: number) => {
    jsCookie.set('categoryId', id.toString());
    const category = listParentCategory.find((item) => item.id === id);
    if (category) {
      document.cookie = `categoryName=${category.name}`;
    }
    dispatch(setCategoryId(id.toString()));
    setCategoriesId(id.toString());
  };
  useEffect(() => {
    const handleScroll = () => {
      // console.log(ref_nav.current?.getBoundingClientRect());
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref_nav]);
  useEffect(() => {
    const handleScroll = () => {
      // console.log(ref_nav.current?.getBoundingClientRect());
    };
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref_nav]);
  return (
    <div
      className="w-full max-w-6xl relative py-4 overflow-hidden"
      ref={ref_nav}
    >
      {checkPrev && (
        <div className="absolute group bg-white bg-opacity-70 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
          <button
            className="p-1 border-2 rounded-full transition-all group-hover:p-2"
            onClick={handlePrev}
          >
            <Image
              className="w-6"
              src={'/iconleft.svg'}
              alt="left"
              width={200}
              height={200}
            />
          </button>
        </div>
      )}

      <ul
        className="flex max-w-fit translate-x-2 item-center text-black select-none"
        ref={ref_list_slider}
        onMouseDown={handleClickDown}
      >
        {listParentCategory.map((item, index) => (
          <li
            key={index}
            className="flex flex-col justify-center items-center px-4 cursor-pointer group min-w-fit"
            onClick={() => {
              if (checkClick) {
                handleClickCategory(item.id);
              } else {
                setCheckClick(true);
              }
            }}
          >
            <Image
              className="pointer-events-none w-12"
              src={item.image}
              width={300}
              height={300}
              alt="anh"
            />
            <div className="text-center font-sm min-w-fit">{item.name}</div>
            {categoriesId === item.id.toString() && (
              <div
                className="border-selected"
                style={{
                  backgroundColor: '#d4a650',
                  height: '2px',
                  width: '100%',
                }}
              ></div>
            )}
          </li>
        ))}
      </ul>

      {checkNext && (
        <div className="absolute group bg-white bg-opacity-70 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
          <button
            className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
            onClick={handleNext}
          >
            <Image
              className="w-6"
              src={'/iconright.svg'}
              alt="left"
              width={200}
              height={200}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
