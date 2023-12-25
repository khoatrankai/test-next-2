import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Button, Modal} from 'antd';

type Props = {
    profile: any
};

const CvProfile = (props: Props) => {
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language,
  );
  const {profile} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');
  const [pdf, setPdf] = useState<any>('');

  return (
    <div className="border-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 rounded-xl mb-8 relative">
      <div className="flex h-10 items-center mb-8">
        <div className="h-full w-3 bg-yellow-500 mr-4"></div>
        <h1 className="font-bold text-xl">
          {languageRedux === 1 ? `CV` : `CV`}
        </h1>
      </div>
      <div className="flex flex-wrap">
        {profile &&
          profile.profilesCvs?.map((item: any, index: number) => {
            return (
              item.status === 1 && (
                <div className="w-1/2" key={index}>
                  <div className="flex flex-col text-center relative">
                    <img
                      src={item.imageURL}
                      alt=""
                      className="w-fit h-50 max-w-50"
                    />
                    <div
                      onClick={() => {
                        setImg(item.imageURL);
                        setPdf(item.pdfURL);
                        setIsOpen(true);
                      }}
                      className="absolute top-1 right-1 bg-slate-400 rounded-md p-1 text-white hover:bg-red-400 cursor-pointer text-sm items-center"
                    >
                      <RemoveRedEyeIcon
                        sx={{
                          marginRight: '2px',
                        }}
                      />
                      {languageRedux === 1 ? 'Xem CV' : 'View CV'}
                    </div>
                    <div className="flex items-center justify-center mt-2 gap-2">
                      <div className="w-3 h-3 bg-yellow-500"></div>
                      <p className="font-bold text-base">{item.name}</p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        <Modal
          width={500}
          centered
          title={
            <h3
              style={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                lineHeight: '24px',
                letterSpacing: '0em',
                textAlign: 'center',
              }}
            >
              {languageRedux === 1 ? 'Chọn hành động' : 'Choose action'}
            </h3>
          }
          footer={null}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        >
          <p
            style={{
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              letterSpacing: '0.5px',
              textAlign: 'center',
            }}
          >
            {languageRedux === 1
              ? 'Bạn muốn xem ảnh hay tải CV ứng viên về máy tính ?'
              : 'Do you want to view photos or download candidate CVs to your computer?'}
          </p>
          <div className="text-center">
            <div className="h-fit w-full flex mt-5">
              <div className="basis-1/2 border-green-300">
                <div onClick={() => {
                    setIsOpen(false);
                    window.open(img, '_blank')
                }} className="flex flex-col items-center cursor-pointer">
                  <img
                    src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1701405544/images/mailchimp/ads_mail/ig75aqmwqkkai18qxyu8.jpg"
                    width={60}
                    height={60}
                  />
                  <div className="font-bold mt-2">
                    {languageRedux === 1 ? 'Xem ảnh' : 'View photo'}
                  </div>
                </div>
              </div>
              <div className="basis-1/2 border-green-300 cursor-pointer">
                <div onClick={() => {
                    setIsOpen(false);
                    window.open(pdf, '_blank')
                }} className="flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1701405898/images/mailchimp/ads_mail/yqucp1duame1x8u1xnwv.jpg"
                    width={60}
                    height={60}
                  />
                  <div className="font-bold mt-2">
                    {languageRedux === 1 ? 'Xem PDF' : 'View PDF'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CvProfile;
