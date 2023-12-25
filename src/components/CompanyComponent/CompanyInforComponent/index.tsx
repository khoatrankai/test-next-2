'use client';
import React, {useEffect, FormEvent, useState} from 'react';
import {Skeleton, Space} from 'antd';
import {message} from 'antd';
import {useSelector} from 'react-redux';
import './style.scss';
import {RootState} from '@/redux/reducer';
import {PencilIcon} from '@/icons';
import RollTop from '@/components/RollTop';
import EditLogoCompanyComponent from '../EditLogoCompanyComponent';
import apiCompany from '@/api/company/apiCompany';
import EditNameTaxCompanyComponent from '../EditNameTaxCompanyComponent';
import EditAddressCompanyComponent from '../EditAddressCompanyComponent';
import EditPhoneMailCompanyComponent from '../EditPhoneMailCompanyComponent';
import EditRoleWebCompanyComponent from '../EditRoleWebCompanyComponent';
import EditFieldScaleCompanyComponent from '../EditFieldScaleCompanyComponent';
import EditDescripeCompanyComponent from '../EditDescripeCompanyComponent';
import ModalEditCompanySuccessComponent from '../ModalEditCompanySuccessComponent';
import EditImageCompanyComponent from '../EditImageCompanyComponent';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {useSrollContext} from '@/context/AppProvider';
import {CircularProgress} from '@mui/material';

export interface FormValues {
  id: string;
  name: string;
  address: string;
  companyLocation: {
    district: {
      province: {
        id: string;
        fullName: string;
      };
      id: string;
      fullName: string;
    };
    id: string;
    fullName: string;
  };
  companyRoleInfomation: {
    id: number;
    nameText: string;
  };
  companyCategory: {
    id: number;
    nameText: string;
  };
  companySizeInfomation: {
    id: number;
    nameText: string;
  };
  taxCode: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
  logoPath: string;
}

export interface FormCompanyValues {
  // id: string;
  name: string;
  address: string;
  wardId: string;
  taxCode: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
  companyRoleId: number | null;
  companySizeId: number | null;
  categoryId: number | null;
  logo: string;
}

interface ICompany {
  display: string;
  is_profile: boolean;
}

const Company: React.FC<ICompany> = (props) => {
  const {display, is_profile} = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [haveCompany, setHaveCompany] = useState(false);
  const {handleLoadHrefPage} = useSrollContext();
  const [companyId, setCompanyId] = useState<any>();
  const profileV3 = useSelector((state: RootState) => state.profile.profile);
  const [dataCompany, setDataCompany] = useState<any | null>({
    name: '',
    address: '',
    companyLocation: '',
    companyRoleInfomation: '',
    companyCategory: '',
    companySizeInfomation: '',
    taxCode: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    logoPath: '',
  });
  const [openModalEditCompany, setOpenModalEditCompanySuccess] =
    React.useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  React.useEffect(() => {
    document.title =
      languageRedux === 1 ? 'Thông tin công ty' : 'Company Information';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  useEffect(() => {
    handleLoadHrefPage();
  }, []);

  const getCompanyInforByAccount = async () => {
    try {
      setLoading(true);
      if (profileV3?.companyInfomation !== null) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(true);
        setCompanyId(profileV3?.companyInfomation?.id);
        setDataCompany(profileV3?.companyInfomation);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setHaveCompany(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileV3.length !== 0) {
      getCompanyInforByAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, profileV3]);

  const validURL = (str: string) => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // valid values form data
  const validValue = () => {
    if (
      dataCompany?.logoPath === '' ||
      dataCompany?.logoPath?.status === 'removed'
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn logo công ty'
            : 'Please select company logo',
        checkForm: false,
      };
    }
    if (dataCompany?.name?.trim() === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập tên công ty'
            : 'Please enter company name',
        checkForm: false,
      };
    }
    if (dataCompany?.companyLocation === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn tỉnh thành phố'
            : 'Please select province',
        checkForm: false,
      };
    }
    if (dataCompany?.address === '' || dataCompany?.address?.length <= 10) {
      return {
        message:
          languageRedux === 1
            ? 'Địa chỉ phải dài hơn 10 ký tự'
            : 'Address must be longer than 10 characters',
        checkForm: false,
      };
    }
    if (
      dataCompany?.phone === '' ||
      (dataCompany?.phone && dataCompany?.phone?.length < 10) ||
      (dataCompany?.phone && dataCompany?.phone?.length > 11)
    ) {
      return {
        message:
          languageRedux === 1
            ? 'Số điện thoại sai định dạng'
            : 'Phone must be 10 or 11 characters',
        checkForm: false,
      };
    }
    if (dataCompany?.email === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập email công ty'
            : 'Please enter company email',
        checkForm: false,
      };
    }
    if (regexCheckEmail.test(dataCompany?.email) === false) {
      return {
        message:
          languageRedux === 1
            ? 'Định dạng email không đúng'
            : 'Email format is incorrect',
        checkForm: false,
      };
    }
    if (dataCompany?.companyRoleInfomation === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn vai trò của bạn'
            : 'Please select your role',
        checkForm: false,
      };
    }
    if (dataCompany?.website === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập website công ty'
            : 'Please select your website',
        checkForm: false,
      };
    }
    if (validURL(dataCompany?.website) === false) {
      return {
        message:
          languageRedux === 1
            ? 'Định dạng website không chính xác'
            : 'Website format is incorrect',
        checkForm: false,
      };
    }
    if (dataCompany?.companyCategory === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn danh mục nghề nghiệp'
            : 'Please select career category',
        checkForm: false,
      };
    }
    if (dataCompany?.companySizeInfomation === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng chọn quy mô công ty'
            : 'Please select company size',
        checkForm: false,
      };
    }
    if (dataCompany?.description === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập mô tả công ty'
            : 'Please select description',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  const handleCreateCompany = async (formData: any) => {
    const {message, checkForm} = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          setLoadingUpdate(true);
          const result = await apiCompany.createCampany(formData);

          if (result) {
            toast.success(
              languageRedux === 1
                ? 'Tạo công ty thành công'
                : 'Create a successful company',
              {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              },
            );
            setLoadingUpdate(false);
          } else {
            toast.error(
              languageRedux === 1
                ? 'Tạo công ty không thành công'
                : 'Creating a company fails',
              {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              },
            );
            setLoadingUpdate(false);
          }
        }
      } else {
        toast.warning(message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setLoadingUpdate(false);
      }
    } catch (error) {
      console.error('error', error);
    }
  };
  const handleUpdateCompany = async (formData: any) => {
    // valid value form data
    const {message, checkForm} = validValue();
    try {
      if (checkForm) {
        if (Array.from(formData.values()).some((value) => value !== '')) {
          setLoadingUpdate(true);
          const result = await apiCompany.updateCampany(companyId, formData);
          if (result) {
            setOpenModalEditCompanySuccess(true);
            toast.success(
              languageRedux === 1
                ? 'Tạo công ty thành công'
                : 'Create a successful company',
              {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              },
            );
            setLoadingUpdate(false);
          }
        }
      } else {
        toast.warning(message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setLoadingUpdate(false);
      }
    } catch (error) {
      console.error('error', error);
      setLoadingUpdate(false);
    }
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', String(dataCompany?.name?.trim()));
    formData.append('address', String(dataCompany?.address));
    formData.append('wardId', String(dataCompany?.companyLocation?.id));
    formData.append('taxCode', String(dataCompany?.taxCode));
    formData.append('phone', String(dataCompany?.phone));
    formData.append('email', String(dataCompany?.email));
    formData.append('website', String(dataCompany?.website));
    formData.append('description', String(dataCompany?.description));
    formData.append(
      'companyRoleId',
      String(dataCompany?.companyRoleInfomation?.id),
    );
    formData.append(
      'companySizeId',
      String(dataCompany?.companySizeInfomation?.id),
    );
    formData.append('categoryId', String(dataCompany?.companyCategory?.id));
    formData.append('logo', dataCompany?.logoPath);
    dataCompany?.images &&
      dataCompany?.images?.forEach((image: any) => {
        if (image.type) {
          formData.append('images', image);
        }
      });
    dataCompany.deleteImages &&
      dataCompany.deleteImages?.forEach((id: any) => {
        formData.append('deleteImages', id);
      });

    if (formData) {
      haveCompany
        ? handleUpdateCompany(formData)
        : handleCreateCompany(formData);
    }
  };

  return (
    <div
      className="company-container relative"
      style={{
        display: display,
        marginTop: is_profile ? '30px' : '50px',
        width: is_profile ? '100%' : 'unset',
      }}
    >
      {loadingUpdate && (
        <div className="absolute top-1/3 left-1/2">
          <CircularProgress />
        </div>
      )}
      {contextHolder}
      <div style={{display: loading ? 'none' : 'block'}}></div>
      <div
        className="company-content"
        style={{
          padding: is_profile ? '0px' : '0px 0px',
          pointerEvents: loadingUpdate ? 'none' : 'auto',
        }}
      >
        <div
          className="company-title"
          style={{
            marginBottom: is_profile ? '24px' : '32px',
          }}
        >
          <div className="company-title_top">
            <h1>
              {languageRedux === 1
                ? 'Thông tin công ty'
                : 'Company Information'}
            </h1>

            <Space
              style={{
                cursor: 'pointer',
                display: is_profile ? 'flex' : 'none',
              }}
              onClick={() => window.open(`/company-infor`, '_parent')}
            >
              <div className="edit-icon">
                <PencilIcon width={15} height={15} />
              </div>

              <p style={{color: '#d4a650', fontSize: '14px'}}>
                {languageRedux === 1 ? 'Chỉnh sửa' : 'Edit'}
              </p>
            </Space>
          </div>
          <div
            className="company-title_bottom"
            style={{display: is_profile ? 'block' : 'none'}}
          >
            <p>
              {languageRedux === 1
                ? 'Bạn cần điền thông tin công ty của mình để đăng tin tuyển dụng, tìm kiếm ứng viên.'
                : 'You need to fill in your company information to post job vacancies, search for candidates.'}
            </p>
          </div>
        </div>
        <Skeleton loading={loading} active>
          <form action="">
            <EditLogoCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              language={languageRedux}
              is_profile={is_profile}
            />
            <EditNameTaxCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditAddressCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditPhoneMailCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditRoleWebCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />

            <EditFieldScaleCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditImageCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />
            <EditDescripeCompanyComponent
              dataCompany={dataCompany}
              setDataCompany={setDataCompany}
              is_profile={is_profile}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-edit_submitForm"
              style={{display: is_profile ? 'none' : 'block'}}
            >
              {languageRedux === 1 ? 'Lưu thông tin' : 'Save information'}
            </button>
          </form>
        </Skeleton>
      </div>
      <ModalEditCompanySuccessComponent
        openModalEditCompany={openModalEditCompany}
        setOpenModalEditCompanySuccess={setOpenModalEditCompanySuccess}
        languageRedux={languageRedux}
        language={languageRedux}
      />
      <div style={{display: is_profile ? 'none' : 'block'}}>
        <RollTop />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Company;
