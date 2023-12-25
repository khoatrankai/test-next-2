"use client";
import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tooltip, Typography } from "antd";
import { useSelector } from "react-redux";
import historyRecruiter from "@/api/history/historyRecruiter";
import suggestApi from "@/api/suggest";
import { Box, Modal } from "@mui/material";
import {
  CalendarIcon,
  CateIcon,
  GenderIcon,
  LocationIcon,
  PersonIcon,
  SchoolIcon,
} from "@/icons/iconCandidate";
import moment from "moment";
import "./style.scss";
import { useRouter } from "next/navigation";
import { useSrollContext } from "@/context/AppProvider";

type Props = {};

interface ISuggest {
  status: number;
  data: any;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 330 },
  { field: "province_name", headerName: "Address", width: 130 },
  {
    field: "salary_max",
    headerName: "Salary",
    type: "number",
    width: 130,
  },
  {
    field: "created_at_text",
    headerName: "Create",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "744px",
  width: "100%",
  bgcolor: "background.paper",
  border: "none !important",
  boxShadow: 24,
  p: 4,
  height: "h-fit",
};

const SuggestJobComponent = (props: Props) => {
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const [dataPost, setDataPost] = React.useState<any>([]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { handleLoadHrefPage } = useSrollContext();
  useEffect(() => {
    handleLoadHrefPage();
    const getAllPosted = async () => {
      try {
        const result = await historyRecruiter.GetInformationAndCandidatesCount(
          0,
          20,
          "-1",
          languageRedux === 1 ? "vi" : "en"
        );

        if (result) {
          setDataPost(result.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllPosted();
  }, []);

  const handleGetSuggest = async (id: any) => {
    if (id === 0) {
      return;
    }
    const res = (await suggestApi.getSuggestOfPost(
      id,
      8,
      0
    )) as unknown as ISuggest;

    if (res && res.status === 200) {
      setOpen(true);
      setDataSuggest(res.data.suggestProfiles);
    }
  };

  const handleClickItemCandidate = async (accountId: any) => {
    router.push(`/candidate-detail/${accountId}`);
  };

  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-6xl">
        <Typography className="my-2 text-[10px] italic text-red-600">
          {languageRedux === 1
            ? "Lưu ý: Nhấn 2 lần vào hàng trong bảng để xem ứng viên gợi ý"
            : "Note: Double click on the row in the table to view the suggested candidate"}
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={dataPost}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            onRowDoubleClick={(params) => {
              handleGetSuggest(params.row.id);
            }}
          />
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Box sx={style}>
            <div className="text-center text-[14px] font-bold my-2">
              {languageRedux === 1
                ? `Tìm thấy ${dataSuggest.length} ứng viên gợi ý`
                : `Found ${dataSuggest.length} suggested candidates`}
            </div>
            <div className="w-full gap-3 flex flex-wrap">
              {dataSuggest.length > 0 &&
                dataSuggest.map((item: any) => {
                  return (
                    <div className="flex flex-wrap">
                      <div
                        className="item-candidate"
                        onClick={() => {
                          handleClickItemCandidate(item.accountId);
                        }}
                      >
                        <div className="wrap-img_candidate relative">
                          <img
                            src={item?.avatarPath ? item?.avatarPath : ""}
                            style={{
                              filter: item?.avatarPath ? "blur(3px)" : "none",
                            }}
                            alt=""
                            className="img-candidate"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://cdn1.vectorstock.com/i/thumb-large/62/60/default-avatar-photo-placeholder-profile-image-vector-21666260.jpg";
                            }}
                          />
                          <div className="wrap-name-age">
                            <div className="wrap-name-age_item">
                              <span className="icon-age_item-candidate">
                                <PersonIcon />
                              </span>
                              <span>
                                {moment(new Date(item?.birthday)).format(
                                  "yyyy"
                                )}
                              </span>
                            </div>
                            <div className="wrap-name-age_item">
                              <span className="icon-age_item-candidate">
                                <GenderIcon />
                              </span>
                              <span>
                                {item.gender === 1
                                  ? languageRedux === 1
                                    ? "Name"
                                    : "Male"
                                  : languageRedux === 1
                                  ? "Nữ"
                                  : "Female"}
                              </span>
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
                                  item.email
                                    ? item.email
                                    : languageRedux === 1
                                    ? "Thông tin chưa cập nhật"
                                    : "Not updated information"
                                }
                              >
                                <span className="text-info-candidate">
                                  {item.email}
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
                                  item.phone
                                    ? item.phone
                                    : languageRedux === 1
                                    ? "Thông tin chưa cập nhật"
                                    : "Not updated information"
                                }
                              >
                                <span className="text-info-candidate">
                                  {item.phone}
                                </span>
                              </Tooltip>
                            </li>
                            <li>
                              <span className="icon-info-candidate">
                                <CateIcon />
                              </span>
                              <Tooltip
                                placement="top"
                                title={item.percent ? item.percent : 0}
                              >
                                <span className="text-info-candidate">
                                  {languageRedux === 1
                                    ? `Độ phù hợp`
                                    : `Matching`}{" "}
                                  {item.percent ? item.percent : 0}%
                                </span>
                              </Tooltip>
                            </li>
                            <li>
                              <span className="icon-info-candidate">
                                <CalendarIcon />
                              </span>
                              <span className="text-info-candidate">
                                {moment(new Date(item?.updatedAt)).format(
                                  "DD/MM/yyyy"
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SuggestJobComponent;
