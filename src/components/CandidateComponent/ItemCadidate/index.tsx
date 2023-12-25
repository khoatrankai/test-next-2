import React from 'react';
import moment from 'moment';
import {Tooltip} from 'antd';
import './style.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
import 'react-toastify/dist/ReactToastify.css';
import {
  CalendarIcon,
  CateIcon,
  GenderIcon,
  LocationIcon,
  PersonIcon,
  SchoolIcon,
} from '@/icons/iconCandidate';
import { useRouter } from 'next/navigation';
import candidateSearch from '@/api/candidate/apiCandidates';
import { ToastContainer, toast } from 'react-toastify';
interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const {item} = props;
  const profileV3 = useSelector((state: RootState) => state.profile.profile);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const router = useRouter();
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const handleClickItemCandidate = async (accountId: any) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    try {
      if (profileV3?.roleData === 3) {
        const fetchData = async () => {
          const result = await candidateSearch.postCountShowCandidate(accountId);

          if (result && result.status === 200 && (result as any)?.total > 0) {
            toast.success(languageRedux ? `Bạn còn ${(result as any)?.total} lượt xem thông tin ứng viên` : `You still have ${(result as any)?.total} views of candidate information`, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            router.push(`/candidate-detail/${accountId}`);
          }
          else {
            toast.success(languageRedux ? `Bạn hết lượt xem ứng viên`: `You run out of candidate views`, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }

        fetchData();
       
      }
    } catch (error) {
      if (profileV3.roleData === 0 || profileV3.roleData === 1 || profileV3.roleData === 2) {
        window.open('/', '_parent');
      }
    }
  };
  React.useEffect(() => {
    document.title =
      languageRedux === 1 ? 'Tìm kiếm nhân tài' : 'Search for talent';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  return (
    <>
      <div
        className="item-candidate"
        onClick={() => {
          handleClickItemCandidate(item.accountId);
        }}
      >
        <div className="wrap-img_candidate relative">
          <img
            src={item?.imageData?.avatar ? item?.imageData?.avatar : ''}
            style={{
              filter: item?.imageData?.avatar ? 'blur(3px)' : 'none',
            }}
            alt=""
            className="img-candidate"
            onError={(e) => {
              e.currentTarget.src =
                'https://cdn1.vectorstock.com/i/thumb-large/62/60/default-avatar-photo-placeholder-profile-image-vector-21666260.jpg';
            }}
          />
          <div className="wrap-name-age">
            <div className="wrap-name-age_item">
              <span className="icon-age_item-candidate">
                <PersonIcon />
              </span>
              <span>
                {moment(new Date(item?.birthdayData))
                  .format('yyyy')
                  .replace(/\d{2}$/, 'xx')}
              </span>
            </div>
            <div className="wrap-name-age_item">
              <span className="icon-age_item-candidate">
                <GenderIcon />
              </span>
              <span>{item.genderData}</span>
            </div>
          </div>
        </div>
        <div className="info-candidate">
          <div className="info-candidate_item">
            <p>{item.name}</p>
          </div>
          <ul>
            <li>
              <span className="icon-info-candidate">
                <SchoolIcon />
              </span>
              <Tooltip
                placement="top"
                title={
                  item?.profilesEducationsData?.length !== 0
                    ? item.profilesEducationsData?.map((value: any) => {
                        return `${value.data}, `;
                      })
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.profilesEducationsData.length !== 0
                    ? item.profilesEducationsData.map(
                        (value: any, index: number) => {
                          return `${value.data}, `;
                        },
                      )
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <LocationIcon />
              </span>
              <Tooltip
                placement="top"
                title={
                  item?.profilesLocationsData?.length !== 0
                    ? item.profilesLocationsData?.map((value: any) => {
                        return `${value.fullName}, `;
                      })
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.profilesLocationsData.length !== 0
                    ? item.profilesLocationsData.map((loc: any) => {
                        return `${loc.fullName}, `;
                      })
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <CateIcon />
              </span>
              <Tooltip
                placement="top"
                title={
                  item?.categoriesData?.length !== 0
                    ? item.categoriesData?.map((value: any) => {
                        return `${value.fullName}, `;
                      })
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.categoriesData.length !== 0
                    ? item.categoriesData.map((value: any) => {
                        return `${value.fullName}, `;
                      })
                    : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <CalendarIcon />
              </span>
              <span className="text-info-candidate">
                {moment(new Date(item?.updatedAt)).format('DD/MM/yyyy')}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
    
  );
};

export default ItemCadidate;
