import React, { useEffect, useState } from "react";
// @ts-ignore
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { RootState } from "@/redux/reducer";
import { useSelector } from "react-redux";
import candidateSearch from "@/api/candidate/apiCandidates";
import SeachLocation from "./SearchLocation";
import SearchCate from "./SearchCate";
import SeachEducation from "./SeachEducation";
import SeachGender from "./SeachGender";
import SeachAge from "./SearchAge";
import ItemCadidate from "./ItemCadidate";
import "./style.scss";
import { useSrollContext } from "@/context/AppProvider";

const CandidatesAll = () => {
  const [listData, setListData] = useState<any>([]);
  const [addresses, setAddresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [educations, setEducations] = useState<number | undefined>();
  const [gender, setGender] = useState<undefined | number>(-1);
  const [ageMin, setAgeMin] = useState<number | null>(18);
  const [ageMax, setAgeMax] = useState<number | null>(35);
  const [page, setPage] = React.useState<any>("0");
  const [reset, setReset] = useState(false);
  const [total, setTotal] = useState(0);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const {handleLoadHrefPage} = useSrollContext();
  const [hasMore, setHasMore] = React.useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  useEffect(() => {
    handleLoadHrefPage();
  }, [])

  const getAllCandidates = async () => {
    try {
      setHasMore(true);
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        18,
        page,
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setTotal(result.data.total);
        setListData(result.data.cvFilters);
        if (result.data.cvFilters.length < 18) {
          setHasMore(false);
          setPage("0");
        } else if (result.data.cvFilters.length === 0) {
          setHasMore(false);
          setPage("0");
        } else {
          setHasMore(true);
        }
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    getAllCandidates();
  }, [languageRedux]);

  React.useEffect(() => {
    if (profileV3.length !== 0 && profileV3.typeRoleData === 0) {
      window.open("/", "_parent");
    }
  }, [profileV3]);

  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmitSearchCandidate = async () => {
    try {
      if (ageMin && ageMax && ageMin > ageMax) {
        message.error("Độ tuổi không hợp lệ!");
        return;
      }

      if (
        (ageMin && ageMax && ageMin < 18) ||
        (ageMin && ageMax && ageMax < 18)
      ) {
        message.error("Độ tuổi không hợp lệ!");
        return;
      }

      if (
        (ageMin && ageMax && ageMin > 60) ||
        (ageMin && ageMax && ageMax > 60)
      ) {
        message.error("Độ tuổi không hợp lệ!");
        return;
      }
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        19,
        page,
        "vi"
      );
      setPage("0");
      if (result) {
        setTotal(result.data.total);
        setListData(result.data.cvFilters);
        if (result.data.cvFilters.length < 18) {
          setHasMore(false);
          setPage("0");
        } else if (result.data.cvFilters.length === 0) {
          setHasMore(false);
          setPage("0");
        } else {
          setHasMore(true);
        }
      }
    } catch (error) {
      console.log("error", error);
      message.error("Lỗi server!");
      return;
    }
  };

  const handleResetSearchCandidate = () => {
    setAddresses([]);
    setCategories([]);
    setEducations(undefined);
    setGender(-1);
    setAgeMin(18);
    setAgeMax(35);
    setReset(true);
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = parseInt(page) + 1;
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        19,
        nextPage,
        "vi"
      );

      if (result && result.data.cvFilters.length !== 0) {
        setListData((prev: any) => [...prev, ...result?.data.cvFilters]);
        setPage(nextPage);
      } else {
        setHasMore(false);
        setPage("0");
      }
    } catch (error) {}
  };
  return (
    <div className="container-candidate">
      {contextHolder}
      <div className="candidate">
        <div className="header-candidate" style={{ marginBottom: "20px" }}>
          <h3>{languageRedux === 1 ? 'Tìm kiếm ứng viên' : 'Looking for candidates'}</h3>
          <Button
            type="primary"
            onClick={() => window.open(`/history?candidate=4`, "_parent")}
          >
            {languageRedux === 1
              ? "Danh sách ứng viên đã lưu"
              : "Saved candidate list"}
          </Button>
        </div>
        <div className="search-candidate">
          <p>{languageRedux === 1 ? 'Hãy tìm ứng viên phù hợp cho công ty của bạn!' : 'Find the right candidate for your company!'}</p>
          <div className="list-search">
            <SeachLocation
              setAddresses={setAddresses}
              setReset={setReset}
              reset={reset}
              addresses={addresses}
            />
            <SearchCate
              setCategories={setCategories}
              setReset={setReset}
              reset={reset}
              categories={categories}
            />
            <SeachEducation
              setEducations={setEducations}
              setReset={setReset}
              reset={reset}
            />
            <SeachGender
              setGender={setGender}
              setReset={setReset}
              reset={reset}
              genderValue={gender}
            />
            <SeachAge
              setAgeMin={setAgeMin}
              setAgeMax={setAgeMax}
              ageMin={ageMin}
              ageMax={ageMax}
              setReset={setReset}
              reset={reset}
            />
            <div className="submit-search">
              <div
                className="submit-seach_button seach-button_Confirm"
                onClick={handleSubmitSearchCandidate}
              >
                {languageRedux === 1 ? "Xác nhận" : "Confirm"}
              </div>

              <div
                className="submit-seach_button seach-button_Reset"
                onClick={handleResetSearchCandidate}
              >
                {languageRedux === 1 ? "Đặt lại" : "Reset"}
              </div>
            </div>
          </div>
        </div>
        <div className="list-candidates">
          <div className="list-candidates_title">
            <h3>
              Found results:
              <span>{` ${total}`} candidates</span>
            </h3>
          </div>
          <InfiniteScroll
            dataLength={listData && listData?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin style={{ width: "100%" }} indicator={antIcon} />}
            style={{ overflow: "unset" }}
          >
            <div className="list-candidate">
              {listData?.map((item: any, index: number) => {
                return <ItemCadidate item={item} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default CandidatesAll;
