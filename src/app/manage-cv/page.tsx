'use client';

import {useSrollContext} from '@/context/AppProvider';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from 'next/navigation';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import profileCvsApi from '@/api/profileCvs/profileCvsApi';
import {fetchProfile} from '@/redux/reducer/profileReducer/profileSlice';
import {Button, Modal} from 'antd';
import {PDFDownloadLink} from '@react-pdf/renderer';

type Props = {};

interface IDeleteProfileCv {
  statusCode: number;
  message: string;
}

const page = (props: Props) => {
  const {handleLoadHrefPage} = useSrollContext();
  const language = useSelector((state: any) => state.changeLaguage.language);
  const profile = useSelector((state: any) => state.profile.profile);
  const [profileCV, setProfileCV] = React.useState<any>([]);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] =
    React.useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [idDelete, setIdDelete] = React.useState<number>(0);
  const [openModalConfirmPushTop, setOpenModalConfirmPushTop] =
    React.useState<boolean>(false);
  const handleCloseModal = () => {
    setOpenModalConfirmDelete(false);
  };
  const handleCloseModalPushTop = () => {
    setOpenModalConfirmPushTop(false);
  };
  const [idPushTop, setIdPushTop] = React.useState<number>(0);
  const [openModalConfirmHideCV, setOpenModalConfirmHideCv] =
    React.useState<boolean>(false);
  useEffect(() => {
    setProfileCV(profile.profilesCvs);
  }, [profile]);

  useEffect(() => {
    handleLoadHrefPage();
  }, []);

  const handleDeleteCv = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.deleteCvs([
        id,
      ])) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        setOpenModalConfirmDelete(false);
        dispatch(fetchProfile(language ? 'vi' : 'en') as any);
      }
    };

    fetchData();
  };

  const handlePushTop = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.pushTopCv(
        id,
      )) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        dispatch(fetchProfile(language ? 'vi' : 'en') as any);
      }
      setOpenModalConfirmPushTop(false);
    };

    fetchData();
  };

  const handleHideCV = (id: number) => {
    const fetchData = async () => {
      const res = (await profileCvsApi.hideCV()) as unknown as IDeleteProfileCv;

      if (res && res.statusCode === 200) {
        dispatch(fetchProfile(language ? 'vi' : 'en') as any);
      }
      setOpenModalConfirmHideCv(false);
    };

    fetchData();
  };
  return (
    <div className="justify-center flex py-12 bg-[#f0f0f0] flex-col items-center">
      <div className="w-full max-w-6xl">
        <img
          className="w-full h-96 object-fill"
          src={
            'https://res.cloudinary.com/ddwjnjssj/image/upload/v1701330902/images/mailchimp/ads_mail/ghzzbtuds3w85n9y0odo.jpg'
          }
        />
      </div>
      <div className="w-full max-w-6xl">
        <div className="bg-[#fff] h-fit flex flex-col p-5">
          <div className="flex flex-wrap justify-between">
            <div className="text-2xl font-bold">
              {language === 1 ? 'CV đã tạo trên Jobs' : 'CV created on Jobs'}
            </div>
            <div
              className="flex items-center w-fit h-hit"
              style={{
                backgroundColor: '#00b14f',
                borderRadius: '32px',
                padding: '5px 10px',
              }}
            >
              <AddIcon
                sx={{
                  color: '#fff',
                }}
              />
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  router.push('/cv-all');
                }}
              >
                {language === 1 ? 'Tạo CV mới' : 'Create new CV'}
              </div>
            </div>
          </div>
          <div className="text-sm italic">
            {language === 1
              ? `Tổng số: ${profileCV?.length} CV`
              : `Total: ${profileCV?.length} CV`}
          </div>
          <div className="inline-flex flex-wrap w-full gap-2 justify-around my-5">
            {profileCV &&
              profileCV.length > 0 &&
              profileCV.map((item: any, index: number) => {
                return (
                  <div
                    className="flex flex-col w-1/2 h-fit min-w-[220px] max-w-[440px] mt-10"
                    key={index}
                  >
                    <div className="h-1/2 relative">
                      <img
                        src={item.imageURL}
                        alt=""
                        className="w-full h-full max-h-96"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                      <div>
                        <div className="absolute top-2 right-2">
                          {item.status === 1 && (
                            <div className="bg-[#212f3f] text-white rounded-lg p-1 flex gap-1 text-sm items-center">
                              <div>
                                <StarIcon
                                  sx={{
                                    color: 'yellow',
                                    fontSize: '14px',
                                  }}
                                />
                              </div>
                              <div>
                                {language === 1 ? 'CV chính' : 'Main CV'}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-2 flex gap-2 items-center w-full justify-center">
                          <div
                            className="flex gap-2 rounded-lg p-1 items-center w-fit cursor-pointer"
                            style={{
                              backgroundColor: 'rgba(0, 16, 0, 0.3)',
                            }}
                          >
                            <div>
                              <ReplyIcon
                                sx={{
                                  color: '#fff',
                                  fontSize: '14px',
                                }}
                              />
                            </div>
                            <div
                              className="text-[#fff] text-sm"
                              onClick={() => {
                                if (item.status === 0) {
                                  {
                                    setOpenModalConfirmPushTop(true);
                                    setIdPushTop(item.id);
                                  }
                                } else {
                                  {
                                    setOpenModalConfirmHideCv(true);
                                    setIdPushTop(item.id);
                                  }
                                }
                              }}
                            >
                              {item.status === 1
                                ? language === 1
                                  ? 'Ẩn CV'
                                  : 'Hide CV'
                                : language === 1
                                ? 'Đặt CV chính'
                                : 'Set main CV'}
                            </div>
                          </div>
                          <div
                            className="flex gap-2 rounded-lg p-1 items-center w-fit cursor-pointer"
                            style={{
                              backgroundColor: 'rgba(0, 16, 0, 0.3)',
                            }}
                          >
                            <div>
                              <DownloadIcon
                                sx={{
                                  color: '#fff',
                                  fontSize: '14px',
                                }}
                              />
                            </div>
                            <div
                              className="text-[#fff] text-sm w-fit cursor-pointer"
                              onClick={() => {
                                window.open(item.pdfURL, '_blank');
                              }}
                            >
                              {language === 1 ? 'Tải xuống' : 'Download'}
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              setIdDelete(item.id);
                              setOpenModalConfirmDelete(true);
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: 'black',
                                fontSize: '26px',
                                cursor: 'pointer',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-1/2 justify-center mt-2 text-lg flex gap-2 font-bold items-center">
                      <div>{item.name}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(`/cv/${item?.cvIndex}`);
                        }}
                      >
                        <EditIcon />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
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
            {language === 1 ? 'Xác nhận xóa CV' : 'Confirm deletion of CV'}
          </h3>
        }
        footer={null}
        open={openModalConfirmDelete}
        onCancel={handleCloseModal}
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
          {language === 1
            ? 'Bạn có chắc xoá CV này ?'
            : 'Are you sure to delete this CV?'}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handleDeleteCv(idDelete)}
            className="border-red-500 bg-red-500 mr-3 mt-2"
          >
            {language === 1 ? 'Xóa' : 'Delete'}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={handleCloseModal}
            className="bg-slate-300"
          >
            {language === 1 ? 'Hủy' : 'Cancel'}
          </Button>
        </div>
      </Modal>
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
            {language === 1
              ? 'Xác nhận hiển thị CV lên đầu'
              : 'Confirm CV display on top'}
          </h3>
        }
        footer={null}
        open={openModalConfirmPushTop}
        onCancel={handleCloseModalPushTop}
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
          {language === 1
            ? 'CV của bạn sẽ được hiển thị cho nhà tuyển dụng'
            : 'Your CV will be visible to employers'}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handlePushTop(idPushTop)}
            className=" bg-orange-400 mr-3 mt-2"
          >
            {language === 1 ? 'Xác nhận' : 'Confirm'}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={handleCloseModalPushTop}
            className="bg-slate-300"
          >
            {language === 1 ? 'Hủy' : 'Cancel'}
          </Button>
        </div>
      </Modal>
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
            {language === 1 ? 'Xác nhận ẩn CV' : 'Confirm hidden CV'}
          </h3>
        }
        footer={null}
        open={openModalConfirmHideCV}
        onCancel={() => setOpenModalConfirmHideCv(false)}
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
          {language === 1
            ? 'Bạn có chắt ẩn hết tất cả CV'
            : 'You can hide all your CVs'}
        </p>
        <div className="text-center">
          <Button
            type="text"
            shape="round"
            onClick={() => handleHideCV(idPushTop)}
            className=" bg-orange-400 mr-3 mt-2"
          >
            {language === 1 ? 'Xác nhận' : 'Confirm'}
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={() => setOpenModalConfirmHideCv(false)}
            className="bg-slate-300"
          >
            {language === 1 ? 'Hủy' : 'Cancel'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default page;
