'use client';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useSrollContext} from '@/context/AppProvider';
import {useRouter} from 'next/navigation';

type Props = {};

const BannerRecruiterPage: React.FC<Props> = () => {
  const language = useSelector((state: any) => state.changeLaguage.language);
  const {handleLoadHrefPage} = useSrollContext();
  const router = useRouter();
  useEffect(() => {
    handleLoadHrefPage();
  }, []);
  return (
    <div className="justify-center flex py-12 ">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col w-full">
          <div className="flex justify-center flex-col items-center">
            <div className="font-bold text-2xl mb-4">
              {language === 1 ? 'DỊCH VỤ CỦA CHÚNG TÔI' : 'OUR SERVICES'}
            </div>
            <div className="text-[#797979] text-justify">
              {language === 1
                ? 'Chúng tôi cung cấp nhiều dịch vụ giúp nhà tuyển dụng kết nối với nhiều nhân tài hơn, để họ có thể kết nối với ứng cử viên nhanh hơn'
                : 'We provide a variety of services to help employers connect with more talent, so they can connect with candidates faster'}
            </div>
          </div>
          <div className="flex gap-2 mt-10 justify-center">
            <div className="w-1/3 ">
              <img
                src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1701272239/images/mailchimp/ads_mail/jhaz3uwptx9of64e0ugb.jpg"
                alt=""
                width="80%"
                height="50%"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <div className="text-2xl font-bold my-2">
                {language === 1 ? 'Đăng Tuyển' : 'Recruit'}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? 'Đăng tuyển miễn phí'
                      : 'Post jobs for free'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? 'Đăng tuyển nhanh chóng và nhận hồ sơ ngay lập tức'
                      : 'Post jobs quickly and receive applications immediately'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? 'Quản lý hồ sơ trực tuyến của bạn dễ dàng'
                      : 'Manage your online resume easily'}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-3 text-[#797979] text-justify">
                {language === 1
                  ? 'Chương trình chỉ áp dụng cho đơn hàng trực tuyến, không áp dụng đồng thời với các chương trình khuyến mãi khác'
                  : 'The program only applies to online orders, not applicable at the same time as other promotions'}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-10 justify-center">
            <div className="w-2/3 flex flex-col justify-center">
              <div className="text-2xl font-bold my-2">
                {language === 1 ? 'Tìm hồ sơ' : 'Find profile'}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? 'Tìm ứng viên hiệu quả và nhanh chóng'
                      : 'Find candidates effectively and quickly'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? 'Chủ động tìm kiếm ứng viên ngay hôm nay'
                      : 'Proactively search for candidates today'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: '#ff5a5f',
                    }}
                  />
                  <div className="text-justify">
                    {language === 1
                      ? '30 ngày truy cập không giới hạn hệ thống dữ liệu chuyên nghiệp'
                      : '30 days unlimited access to professional data systems'}
                  </div>
                </div>
              </div>
              <div className="text-sm mt-3 text-[#797979] text-justify">
                {language === 1
                  ? 'Chương trình chỉ áp dụng cho đơn hàng trực tuyến, không áp dụng đồng thời với các chương trình khuyến mãi khác'
                  : 'The program only applies to online orders, not applicable at the same time as other promotions'}
              </div>
            </div>
            <div className="w-1/3">
              <img
                src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg"
                alt=""
                width="80%"
                height="50%"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#d4a650] text-white px-4 py-2 rounded-md mt-10"
              onClick={() => {
                router.push('/new-post');
              }}
            >
              {language === 1
                ? 'Đăng bài tuyển dụng'
                : 'Post recruitment posts'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerRecruiterPage;
