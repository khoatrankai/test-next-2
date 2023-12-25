'use client';
import React, {useEffect} from 'react';
import './page.scss';
import Image from 'next/image';
import communityApi from '@/api/community/apiCommunity';
import {useRouter} from 'next/navigation';
import {SaveIconFill, SaveIconOutline} from '@/icons';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux';
import {useSrollContext} from '@/context/AppProvider';

type Props = {};

const page = (props: Props) => {
  const [communityUser, setCommunityUser] = React.useState<any>([]);
  const [communityAdmin, setCommunityAdmin] = React.useState<any>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const router = useRouter();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {handleLoadHrefPage} = useSrollContext();

  useEffect(() => {
    handleLoadHrefPage();
    const fetchData = async () => {
      const res = await communityApi.getCommunityNews('0', '6', 'cm', 0, 'vi');

      if (res && res.status === 200) {
        setCommunityAdmin(res.data.communications);
      }

      const resUser = await communityApi.getCommunityNews(
        '0',
        '6',
        'cm',
        1,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (resUser && resUser.status === 200) {
        setCommunityUser(resUser.data.communications);
      }
    };

    fetchData();
  }, [bookmarked, languageRedux]);

  const handleBookmarked = async (id: number) => {
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 201) {
        setBookmarked(!bookmarked);
        toast.success('Save post success', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error('Save post failed', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    };
    fetchData();
  };

  const handleDeleteBookmarked = async (id: number) => {
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 200) {
        setBookmarked(!bookmarked);
        toast.success('Unsave post success', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error('Unsave post failed', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    };
    fetchData();
  };

  return (
    <div className="flex justify-center relative">
      <div className="max-w-6xl w-full">
        <div className="h-80">
          <div className="bg-blog transition-all absolute z-0 top-0 inset-x-0 h-80 flex justify-center">
            <div className="w-full max-w-6xl relative">
              <div className="absolute inset-x-0 top-8">
                {/* <MenuBlogComponent /> */}
              </div>
            </div>
            <h1 className="text-6xl text-white font-bold absolute inset-y-0 flex justify-center items-center pointer-events-none">
              {languageRedux === 1
                ? 'Blog - Ý tưởng phát triển sự nghiệp IT của bạn'
                : 'Blog - Your IT career development ideas'}
            </h1>
          </div>
        </div>
        <div className="my-8 relative">
          <h1 className="text-2xl font-bold my-4">
            {languageRedux === 1 ? `Mới nhất` : `Newest`}
          </h1>
          <div className="max-w-full">
            <ul className="-mx-[10.5px] flex flex-wrap justify-around gap-y-16">
              {communityAdmin &&
                communityAdmin.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="w-[370px] group cursor-pointer bg-white shadow-[7px_8px_40px_6px_#00000024] mx-[10.5px] rounded-lg overflow-hidden flex flex-col justify-between gap-8"
                      onClick={(e) => {
                        router.push(
                          `/detail-community?post-community=${item.id}&type=0`,
                        );
                        e.stopPropagation();
                      }}
                    >
                      <div className=" h-52 overflow-hidden">
                        <Image
                          className="w-full h-full transition-all duration-500 group-hover:scale-110"
                          alt=""
                          width={1920}
                          height={1080}
                          src={item?.images[0]?.image}
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = '/logo/iphone15.png';
                          }}
                        />
                      </div>
                      <div className="px-8 flex flex-col gap-4">
                        <h2 className="font-bold text-lg h-16">{item.title}</h2>
                        <div className="max-h-20">
                          <p
                            className="text-sm max-h-20 overflow-hidden text-ellipsis"
                            dangerouslySetInnerHTML={{__html: item?.content}}
                          />
                        </div>
                      </div>
                      <div className="h-fit p-4 flex gap-x-2 justify-end">
                        <div className="flex items-center">
                          <h3 className="text-sm">
                            {item.communicationLikesCount}
                          </h3>
                          <Image
                            className="w-4"
                            alt=""
                            src={'/iconheart.svg'}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="flex items-center">
                          <h3 className="text-sm">
                            {item.communicationCommentsCount}
                          </h3>
                          <Image
                            className="w-4"
                            alt=""
                            src={'/iconcomment.svg'}
                            width={200}
                            height={200}
                          />
                        </div>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.bookmarked === true) {
                              handleDeleteBookmarked(item.id);
                            } else {
                              handleBookmarked(item.id);
                            }
                          }}
                          className="flex items-center p-2 rounded-md bg-yellow-500 shadow-[7px_8px_40px_6px_#00000024] cursor-pointer ml-4"
                        >
                          {item.bookmarked === true ? (
                            <>
                              <SaveIconFill width={22} height={22} />
                              <h2 className="text-base ml-2">
                                {' '}
                                {languageRedux === 1 ? `Đã lưu` : `Saved`}
                              </h2>
                            </>
                          ) : (
                            <>
                              <SaveIconOutline width={22} height={22} />
                              <h2 className="text-base ml-2">
                                {' '}
                                {languageRedux === 1 ? `Lưu tin` : `Save news`}
                              </h2>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            className="absolute top-0 right-0"
            onClick={() => {
              router.push('/blog/see-all-admin');
            }}
          >
            <button className="font-bold text-yellow-600 text-lg border-b-4 border-yellow-500 hover:text-yellow-500">
              {languageRedux === 1 ? `Xem thêm` : `See more`}
            </button>
          </div>
        </div>

        <div className="my-8 relative">
          <h1 className="text-2xl font-bold my-4">
            {languageRedux === 1 ? `Cẩm nang chia sẻ` : `Sharing handbook`}
          </h1>
          <div className="max-w-full">
            <ul className="-mx-[10.5px] flex flex-wrap justify-around gap-y-16">
              {communityUser &&
                communityUser.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="w-[370px] group cursor-pointer bg-white shadow-[7px_8px_40px_6px_#00000024] mx-[10.5px] rounded-lg overflow-hidden flex flex-col justify-between gap-8"
                      onClick={(e) => {
                        router.push(
                          `/detail-community?post-community=${item.id}&type=1`,
                        );
                        e.stopPropagation();
                      }}
                    >
                      <div className=" h-52 overflow-hidden">
                        <Image
                          className="w-full h-full transition-all duration-500 group-hover:scale-110"
                          alt=""
                          width={1920}
                          height={1080}
                          src={item?.images[0]?.image}
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = '/logo/iphone15.png';
                          }}
                        />
                      </div>
                      <div className="px-8 flex flex-col gap-4">
                        <h2 className="font-bold text-lg h-16">{item.title}</h2>
                        <div className="max-h-20">
                          <p
                            className="text-sm max-h-20 overflow-hidden text-ellipsis"
                            dangerouslySetInnerHTML={{__html: item?.content}}
                          />
                          ...
                        </div>
                      </div>
                      <div className="h-fit p-4 flex gap-x-2 justify-end">
                        <div className="flex items-center">
                          <h3 className="text-sm">
                            {item.communicationLikesCount}
                          </h3>
                          <Image
                            className="w-4"
                            alt=""
                            src={'/iconheart.svg'}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="flex items-center">
                          <h3 className="text-sm">
                            {item.communicationCommentsCount}
                          </h3>
                          <Image
                            className="w-4"
                            alt=""
                            src={'/iconcomment.svg'}
                            width={200}
                            height={200}
                          />
                        </div>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.bookmarked === true) {
                              handleDeleteBookmarked(item.id);
                            } else {
                              handleBookmarked(item.id);
                            }
                          }}
                          className="flex items-center p-2 rounded-md bg-yellow-500 shadow-[7px_8px_40px_6px_#00000024] cursor-pointer ml-4"
                        >
                          {item.bookmarked === true ? (
                            <>
                              <SaveIconFill width={22} height={22} />
                              <h2 className="text-base ml-2">
                                {' '}
                                {languageRedux === 1 ? `Đã lưu` : `Saved`}
                              </h2>
                            </>
                          ) : (
                            <>
                              <SaveIconOutline width={22} height={22} />
                              <h2 className="text-base ml-2">
                                {' '}
                                {languageRedux === 1 ? `Lưu tin` : `Save news`}
                              </h2>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            className="absolute top-0 right-0"
            onClick={() => {
              router.push('/blog/see-all');
            }}
          >
            <button className="font-bold text-yellow-600 text-lg border-b-4 border-yellow-500 hover:text-yellow-500">
              {languageRedux === 1 ? `Xem thêm` : `See more`}
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default page;
