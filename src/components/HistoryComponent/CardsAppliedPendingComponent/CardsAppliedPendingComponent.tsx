"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { message, Button } from "antd";
import { Box, Typography, MenuItem, TextField } from "@mui/material";

import { Skeleton } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import historyApplicator from "@/api/history/historyApplicator";
import sortData from "@/util/SortDataHistory/sortData";
import NoDataComponent from "@/util/NoDataPage";
import JobCardHistory from "../JobCardHistory/JobCardHistory";

interface ICardsAppliedPending {
  activeChild: string;
}

const CardsAppliedPending: React.FC<ICardsAppliedPending> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [dataApplied, setDataApplied] = useState<any>(null);
  const [newOld, setnewOld] = React.useState("Mới nhất");
  const [lastPostId, setLastPostId] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  //get post to check if length <= 10
  const getAllPostToCheck = async () => {
    const result = await historyApplicator.getAllSubmitedApplied(
      lastPostId,
      11,
      1,
      languageRedux === 1 ? "vi" : "en"
    );
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getAllPostToCheck();
  }, [languageRedux]);

  const getAllPending = async () => {
    try {
      const result = await historyApplicator.getAllSubmitedApplied(
        null,
        10,
        1,
        languageRedux === 1 ? "vi" : "en"
      );

      if (result) {
        setDataApplied(result.data);
        setLastPostId(result.data[result.data.length - 1].id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAllPending().then(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleChange = (event: any) => {
    setnewOld(event.target.value);
    setDataApplied(sortData.sortDataByDate(event.target.value, dataApplied));
  };

  const handleClickAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyApplicator.getAllSubmitedApplied(
        lastPostId,
        10,
        1,
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: "error",
            content:
              languageRedux === 1
                ? "Đã hết công việc để hiển thị"
                : `No more jobs to display`,
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].id);
        setDataApplied((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {}
  };

  return (
    <>
      {contextHolder}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {languageRedux === 1
            ? "Các công việc ứng tuyển đang chờ duyệt"
            : "Pending jobs"}
        </Typography>
        <TextField
          select
          id="sex"
          value={newOld}
          onChange={handleChange}
          variant="outlined"
          placeholder="Giới tính"
          size="small"
          sx={{ width: "120px" }}
        >
          <MenuItem value="Mới nhất">
            {languageRedux ? `Mới nhất` : `Newest`}
          </MenuItem>
          <MenuItem value="Cũ nhất">
            {languageRedux === 1 ? `Cũ nhất` : `Oldest`}
          </MenuItem>
        </TextField>
      </Box>
      <Skeleton loading={loading} active>
        {dataApplied?.length > 0 ? (
          <div className="history-post">
            <Grid container columns={{ xs: 6, sm: 4, md: 12 }}>
              {dataApplied?.map((posted: any, i: number) => (
                <JobCardHistory
                  key={""}
                  item={posted}
                  language={language}
                  languageRedux={languageRedux}
                />
              ))}
            </Grid>
            <Box
              sx={{
                margin: "12px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: `#d4a650`,
                  marginBottom: "2rem",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  display: isVisible ? "block" : "none",
                }}
                loading={uploading}
                onClick={handleClickAddItem}
              >
                {languageRedux === 1 ? "Xem thêm" : `See more`}
              </Button>
            </Box>
          </div>
        ) : (
          <NoDataComponent />
        )}
      </Skeleton>
    </>
  );
};

export default CardsAppliedPending;
