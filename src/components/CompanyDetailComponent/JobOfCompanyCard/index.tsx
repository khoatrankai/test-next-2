import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import { Space, Tooltip } from "antd";
import { RootState } from "@/redux/reducer";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { setAlertCancleSave, setAlertSave } from "@/redux/reducer/alertReducer";
import {
  DolaIcon,
  LocationHomeIcon,
  SaveIconFill,
  SaveIconOutline,
} from "@/icons";
import ModalLogin from "@/components/ModalLogin/ModalLogin";
interface Iprops {
  item: any;
  accountId: any;
}

const JobOfCompanyCard: React.FC<Iprops> = (props) => {
  const profileInfoV3 = useSelector(
    (state: RootState) => state.profile.profile
  );
  const { accountId } = props;
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail/${id}`);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: "100%",
          display: "flex",
          padding: "12px",
          cursor: "pointer",
          "&:hover": {
            background: "#E7E7ED",
            transition: "all 0.3s linear",
          },
          boxShadow: "none",
          borderRadius: "5px",
          justifyContent: "space-between",
          overflow: "unset",
        }}
        onClick={(e) => {
          handleClickItem(e, props.item?.id);
        }}
        className={styles.job_of_company_card}
      >
        <ul className={styles.div_card_post}>
          <ImageListItem
            key={props.item?.image}
            sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
          >
            <img
              src={`${props.item?.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item?.title}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: 10,
              }}
            />
            <div className={styles.div_card_post_info}>
              {/* {' '} */}
              <div className={styles.div_card_post_info__title}>
                <Tooltip placement="top" title={props.item?.title}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "16px",
                      margin: 0,
                      whiteSpace: "nowrap",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontWeight: "700",
                      lineheight: "20px",
                      color: "#575757",
                    }}
                  >
                    {props?.item?.title}
                  </Typography>
                </Tooltip>
                <div
                  style={{
                    display:
                      accountId !== localStorage.getItem("accountId") &&
                      profileInfoV3.typeRoleData === 0
                        ? "block"
                        : "none",
                  }}
                  onClick={async (e) => {
                    try {
                      e.stopPropagation();
                      if (!localStorage.getItem("accessToken")) {
                        setOpenModalLogin(true);
                        return;
                      }
                      if (props.item?.bookmarked) {
                        const result = await bookMarkApi.deleteBookMark(
                          props.item?.id
                        );
                        props.item.bookmarked = false;
                        if (result) {
                          setCheckBookMark(!checkBookMark);
                          dispatch<any>(setAlertCancleSave(true));
                        }
                      } else {
                        const result = await bookMarkApi.createBookMark(
                          props.item?.id
                        );
                        props.item.bookmarked = true;
                        if (result) {
                          dispatch<any>(setAlertSave(true));
                          setCheckBookMark(!checkBookMark);
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {props.item?.bookmarked ? (
                    <SaveIconFill width={24} height={24} />
                  ) : (
                    <SaveIconOutline width={24} height={24} />
                  )}
                </div>
              </div>
              <div className={styles.div_card_post_info__name}>
                <Tooltip placement="top" title={props.item?.companyName}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontWeight: "400",
                      lineheight: "16px",
                      color: "#575757",
                    }}
                  >
                    {props?.item?.companyName}
                  </Typography>
                </Tooltip>
                <div>
                  {!error && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item?.companyResourceData?.logoPath
                          ? props.item?.companyResourceData?.logoPath
                          : ""
                      }
                      alt="ảnh"
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <LocationHomeIcon />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    marginLeft: "4px",
                  }}
                >
                  {`${props.item?.ward}, 
                                    ${props.item?.district}`}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <DolaIcon />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    marginLeft: "4px",
                  }}
                >
                  {new Intl.NumberFormat("en-US").format(
                    props.item?.salary_min
                  )}{" "}
                  {props?.item?.moneyTypeData} -{" "}
                  {new Intl.NumberFormat("en-US").format(
                    props.item?.salary_max
                  ) + ` ${props?.item?.money_type_text}`}
                </Typography>
              </div>
              <div
                className={styles.div_card_post_info__jobtype}
                style={{
                  marginTop: 5,
                }}
              >
                <p
                  style={{
                    color: "#575757",
                    fontSize: 12,
                    fontStyle: "italic",
                    fontWeight: "400",
                  }}
                >
                  {props.item?.createdAtText}
                </p>
                <p style={{ fontSize: 13, color: "#d4a650" }}>
                  {props.item?.job_type?.job_type_name}
                </p>
              </div>
            </div>
          </ImageListItem>
        </ul>
      </Card>
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={() => setOpenModalLogin(!openModalLogin)}
      />
    </>
  );
};

export default JobOfCompanyCard;
