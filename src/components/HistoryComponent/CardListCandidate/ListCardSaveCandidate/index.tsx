import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import moment from 'moment';
import { CalendarIcon, CateIcon, GenderIcon, LocationIcon, PersonIcon, SchoolIcon } from '@/icons/iconCandidate';
import { Tooltip } from 'antd';
import { SaveIconFill } from '@/icons';

interface IitemNewJob {
  item: any;
  handleDeleteBookmark: (event: any, index: number, bookmarkId: number) => any;
  index: number;
  language: any;
  languageRedux: any;
  hanhleClicKCandleSaveCandidate: Function;
}

const ListCardSaveCandidate: React.FC<IitemNewJob> = (props) => {
  const {
    language,
    languageRedux,
    item,
    index,
    hanhleClicKCandleSaveCandidate,
  } = props;
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    localStorage.setItem('candidateId', id);
    window.open(`/candidate-new-detail`, '_parent');
  };
  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          margin: '10px 0',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <div
          className="item-candidate-history"
          onClick={(e) => {
            e.stopPropagation();
            handleClickItem(e, props.item?.profileData?.accountId);
          }}
        >
          <div className="wrap-img_candidate">
            <img
              src={
                item?.imageData?.avatar ?
                  item?.imageData?.avatar :
                  'https://res.cloudinary.com/ddwjnjssj/image/upload/v1697830499/images/avatar/default.png'
              }
              style={{
                filter: item?.imageData?.avatar ? 'blur(3px)' : 'none'
              }}
              alt=""
              className="img-candidate"
            />
            <div className='wrap-name-age'>
              <div className="wrap-name-age_item">
                <span className="icon-age_item-candidate">
                  <PersonIcon />
                </span>
                <span>
                  {moment(new Date(item?.profileData?.birthdayData))
                    .format('yyyy')
                    .replace(/\d{2}$/, 'xx')}
                </span>
              </div>
              <div className="wrap-name-age_item">
                <span className="icon-age_item-candidate">
                  <GenderIcon />
                </span>
                <span>{item?.profileData?.genderData}</span>
              </div>
            </div>
          </div>
          <div className="info-candidate">
            <h3>{item?.profileData?.name}</h3>
            <ul>
              <li>
                <span className="icon-info-candidate">
                  <SchoolIcon />
                </span>
                <Tooltip
                  placement="top"
                  title={
                    item?.profileData?.profilesEducationsData?.length !== 0
                      ? item?.profileData?.profilesEducationsData?.map((value: any) => {
                        return `${value.data}, `;
                      })
                      : languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"
                  }
                >
                  <span className="text-info-candidate">
                    {item?.profileData?.profilesEducationsData?.length !== 0
                      ? item?.profileData?.profilesEducationsData?.map(
                        (value: any) => {
                          return `${value.data}, `
                        },
                      )
                      :

                      languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"

                    }
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
                    item?.profileData?.profilesLocationsData?.length !== 0
                      ? item?.profileData?.profilesLocationsData?.map((loc: any) => {
                        return `${loc.full_name}, `;
                      })
                      : languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"
                  }
                >
                  <span className="text-info-candidate">
                    {item?.profileData?.profilesLocationsData?.length !== 0
                      ? item?.profileData?.profilesLocationsData?.map(
                        (loc: any) => {
                          return `${loc.full_name}, `;
                        },
                      )
                      :
                      languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"
                    }
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
                    item?.profileData?.childCategoriesData?.length !== 0
                      ? item?.profileData?.childCategoriesData?.map((value: any) => {
                        return `${value.fullName}, `;
                      })
                      : languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"
                  }
                >
                  <span className="text-info-candidate">
                    {item?.profileData?.childCategoriesData?.length !== 0
                      ? item?.profileData?.childCategoriesData?.map(
                        (value: any) => {
                          return `${value.fullName}, `;
                        },
                      )
                      :
                      languageRedux === 1 ?
                        "Thông tin chưa cập nhật" :
                        "Not updated information"
                    }
                  </span>
                </Tooltip>
              </li>
              <li>
                <span className="icon-info-candidate">
                  <CalendarIcon />
                </span>
                <span className="text-info-candidate">
                  {moment(new Date(item?.profileData?.updatedAt)).format(
                    'DD/MM/yyyy',
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            right: '32px',
            top: '20px',
          }}
          onClick={(e) =>
            hanhleClicKCandleSaveCandidate(
              e,
              props?.item?.profileData?.accountId,
            )
          }
        >
          <SaveIconFill width={24} height={24} />
        </div>
      </Card>
    </>
  );
};

export default ListCardSaveCandidate;
