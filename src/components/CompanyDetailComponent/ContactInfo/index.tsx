import {Box} from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './style.module.scss';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './style.scss';
import {RootState} from '@/redux/reducer';
import {
  CameraComunityIcon,
  IconCategory,
  LocationDetailPostIcon,
  MailDetailPostIcon,
  NoImageCompany,
  PhoneDetailPostIcon,
  TaxCodeDetailPostIcon,
  WebDetailPostIcon,
} from '@/icons';
import {PersonIcon} from '@/icons/iconCandidate';

interface IContactInfo {
  company: any;
}

const ContactInfo: React.FC<IContactInfo> = (props) => {
  const {company} = props;
  // const location = useLocation();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [position, setPosition] = useState<any>({});

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const handleClickShowMap = () => {
    if (company?.address) {
      window.open(
        'https://www.google.com/maps/place/' +
          `${company?.address}, ${
            company?.companyLocation ? company?.companyLocation.fullName : ''
          }, ${
            company?.companyLocation?.district
              ? company?.companyLocation?.district?.fullName
              : ''
          }, ${
            company?.companyLocation?.district?.province
              ? company?.companyLocation?.district?.province?.fullName
              : ''
          }`,
      );
    }
  };

  const getLocation = async (address: string) => {
    const apiKey = 'AIzaSyA8gjzoebEdb7Oy7x-StIr214ojMVq25qM';
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setPosition(location);
        return location;
      } else {
        throw new Error('Không tìm thấy địa điểm.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    const address = `${company?.address},${company?.wardData}`;

    getLocation(address);
  }, [company]);

  return (
    <div className={styles.contact_info_container}>
      <div className={styles.contact_info_content}>
        <div className={styles.company_information}>
          <div className={styles.company_information_left}>
            <div className={styles.company_information_describe}>
              <h3>{languageRedux === 1 ? 'Mô tả' : 'Describe'}</h3>
              <TextArea
                value={
                  company?.description
                    ? company.description
                    : languageRedux === 1
                    ? 'Thông tin công ty chưa cập nhật'
                    : 'Company information not updated yet'
                }
                autoSize
                // showCount
              />
            </div>
            <div className={styles.company_information_basic}>
              <h3>
                {languageRedux === 1 ? 'Thông tin cơ bản' : 'Basic information'}
              </h3>
              <ul>
                <li>
                  <TaxCodeDetailPostIcon />
                  <p>
                    {languageRedux === 1 ? 'Mã số thuế: ' : 'Tax code: '}
                    <span>
                      {company?.taxCode
                        ? company.taxCode
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <LocationDetailPostIcon />
                  <p>
                    {languageRedux === 1 ? 'Địa chỉ: ' : 'Address: '}
                    <span
                      onClick={handleClickShowMap}
                      style={company?.address ? {cursor: 'pointer'} : {}}
                    >
                      {company?.address
                        ? `${company.address}`
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <MailDetailPostIcon />
                  <p>
                    {'Email: '}
                    <span>
                      {company?.email
                        ? company.email
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <PhoneDetailPostIcon />
                  <p>
                    {languageRedux === 1 ? 'Điện thoại: ' : 'Phone: '}
                    <span>
                      {company?.phone
                        ? company.phone
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <WebDetailPostIcon />
                  <p>
                    {languageRedux === 1 ? 'Trang web: ' : 'Website: '}
                    <span>
                      {company?.website
                        ? company.website
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <IconCategory />
                  <p>
                    {languageRedux === 1 ? 'Ngành nghề: ' : 'Category: '}
                    <span>
                      {company?.categoryData
                        ? company.categoryData
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
                <li>
                  <PersonIcon />
                  <p>
                    {languageRedux === 1
                      ? 'Quy mô công ty: '
                      : 'Company size: '}
                    <span>
                      {company?.companySizeData
                        ? company?.companySizeData
                        : languageRedux === 1
                        ? 'Thông tin công ty chưa cập nhật'
                        : 'Company information not updated yet'}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={styles.company_information_right}
          >
            {Object.keys(position).length !== 0 ? (
              <>
                <h3>{languageRedux === 1 ? 'Xem bản đồ' : 'View the map'}</h3>
                <MapContainer
                  className="leaf_let_map"
                  center={[position.lat, position.lng]}
                  zoom={20}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[position.lat, position.lng]}>
                    <Popup>{`${company.address},${company.wardData}`}</Popup>
                  </Marker>
                </MapContainer>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.company_image}>
          <h3>
            {languageRedux === 1 ? 'Hình ảnh công ty' : "Company's images"}
          </h3>

          {company && company?.id && company.images?.length !== 0 ? (
            <div
              className={styles.company_role_images}
              style={{
                height:
                  company?.images && company?.images?.length > 0
                    ? 'fit-content'
                    : '310px',
                border:
                  company?.images && company?.images?.length > 0
                    ? 'none'
                    : '1px solid #ccc',
              }}
            >
              <Box p="0rem 0">
                <section className={styles.drag_img_container}>
                  <div
                    // {...getRootProps({
                    className={styles.dropzone}
                    // })}
                  >
                    {/* <input {...getInputProps()} /> */}
                    <div
                      className={styles.drag_img_camera}
                      style={{
                        display:
                          // company !== undefined ||
                          company &&
                          company?.images &&
                          company?.images?.length !== 0
                            ? 'none'
                            : 'flex',
                      }}
                    >
                      {location.pathname === '/profile' ? (
                        <></>
                      ) : (
                        <CameraComunityIcon />
                      )}
                      <div className={styles.noImage_company}>
                        <NoImageCompany />
                        <p>
                          {languageRedux === 1
                            ? 'Chưa có hình ảnh về công ty'
                            : 'No image of the company yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <Box className={styles.list_iamges}>
                  {company &&
                    company?.images?.map((item: any, index: number) => (
                      <div className={styles.item_image} key={index}>
                        <img
                          key={index}
                          src={item?.image}
                          alt={language?.err_none_img}
                        />
                      </div>
                    ))}
                </Box>
              </Box>
            </div>
          ) : company &&
            company?.images !== null &&
            company?.images?.length === 0 ? (
            <div className={styles.noImage_company}>
              <NoImageCompany />
              <p>
                {languageRedux === 1
                  ? 'Chưa có hình ảnh về công ty'
                  : 'No image of the company yet'}
              </p>
            </div>
          ) : (
            <p>
              {languageRedux === 1
                ? 'Thông tin công ty chưa cập nhật'
                : 'Company information not updated yet'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
