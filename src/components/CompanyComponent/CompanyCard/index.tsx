import React from 'react';
import {useSelector} from 'react-redux';
//import scss
import './style.scss';
//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import {Tooltip} from 'antd';
import {RootState} from '@/redux/reducer';
import {CateIcon, LocationHomeIcon} from '@/icons';
interface Iprops {
  item: any;
  key: any;
}

const CompanyCard: React.FC<Iprops> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/company-detail/${props.item.id}`, '_parent');
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
          overflow: 'unset',
        }}
        onClick={(e) => {
          handleClickItem(e, props.item?.id);
        }}
        className="company-card-container"
      >
        <ul className="div-card-company_content">
          <ImageListItem
            key={props.item?.logoPath}
            sx={{
              flex: 1,
              display: 'flex',
              gap: '12px',
            }}
          >
            <img
              src={props.item?.logoPath ? props.item?.logoPath : 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg'}
              srcSet={props.item?.logoPath ? props.item?.logoPath : 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg'}
              alt={props.item?.title}
              loading="lazy"
              style={{
                width: '76px',
                height: '76px',
              }}
            />
            <div className="div-card-company_info">
              <div className="div-card-company_info__title">
                <Tooltip placement="top" title={props.item?.name}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '16px',
                      margin: 0,
                      width: '100%',
                      fontWeight: '700',
                      lineheight: '20px',
                    }}
                  >
                    {props.item?.name}
                  </Typography>
                </Tooltip>
              </div>
              <div className="div-card-company_info__bot">
                <div className="div-card-company_info__bot__item">
                  <div className="info-bot-icon">
                    <LocationHomeIcon />
                  </div>
                  <Tooltip
                    placement="top"
                    title={
                      languageRedux === 1
                        ? props.item?.ward.fullName
                        : props.item?.ward.fullNameEn
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {languageRedux === 1
                        ? props.item?.ward.fullName
                        : props.item?.ward.fullNameEn}
                    </Typography>
                  </Tooltip>
                </div>
                <div className="div-card-company_info__bot__item">
                  <div className="info-bot-icon">
                    <CateIcon />
                  </div>
                  <Tooltip
                    placement="top"
                    title={
                      languageRedux === 1
                        ? `${props.item.category.name}`
                        : `${props.item.category.nameEn}`
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {languageRedux === 1
                        ? `${props.item.category.name}`
                        : `${props.item.category.nameEn}`}
                    </Typography>
                  </Tooltip>
                </div>
              </div>
            </div>
          </ImageListItem>
        </ul>
      </Card>
    </>
  );
};

export default CompanyCard;
