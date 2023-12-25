/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import InfoPerson from "@/components/ProfileComponent/InfoPerson/InfoPerson";
import JobProfile from "@/components/ProfileComponent/JobProfile/JobProfile";
import EducationProfile from "@/components/ProfileComponent/EducationProfile/EducationProfile";
import ExperienceProfile from "@/components/ProfileComponent/ExperienceProfile/ExperienceProfile";
import AchivementProfile from "@/components/ProfileComponent/AchivementProfile/AchivementProfile";
import ContactProfile from "@/components/ProfileComponent/ContactProfile/ContactProfile";
import SkillProfile from "@/components/ProfileComponent/SkillProfile/SkillProfile";
import LanguageProfile from "@/components/ProfileComponent/LanguageProfile/LanguageProfile";
import AvatarProfile from "@/components/ProfileComponent/AvatarProfile/AvatarProfile";
import NameProfile from "@/components/ProfileComponent/NameProfile/NameProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import { useSrollContext } from "@/context/AppProvider";
import CvProfile from "@/components/ProfileComponent/CvProfile/CvProfile";

type Props = {};

const page = (props: Props) => {
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();
  const [dataInfo, setDataInfo] = useState<any>();
  const { handleLoadHrefPage } = useSrollContext();
  const [resizePage, setResizePage] = useState<boolean>(false);

  const handleUpdateApi = () => {
    dispatch(fetchProfile("vi") as any);
  };
  useEffect(() => {
    setDataInfo({
      ...dataProfile,
      address: dataProfile?.addressText?.id,
      categoryIds: dataProfile?.profileCategories?.map((dt: any) => {
        return dt.id;
      }),
      locationIds: dataProfile?.profileLocations?.map((dt: any) => {
        return dt.id;
      }),
      profilesSkills: dataProfile?.profilesSkills?.map((dt: any) => {
        return {
          id: dt?.id,
          skillName: dt?.skillName,
          skillLevelId: dt?.dataLevel?.id,
        };
      }),
      profilesLanguages: dataProfile?.profilesLanguages?.map((dt: any) => {
        return {
          id: dt?.id,
          languageName: dt?.languageName,
          languageLevelId: dt?.dataLevel?.id,
        };
      }),
    });
  }, [dataProfile]);
  useEffect(() => {
    handleLoadHrefPage();
    const handleResize = () => {
      if (window.innerWidth < 1152) {
        setResizePage(true);
      } else {
        setResizePage(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center bg-slate-50">
        <div className="max-w-6xl w-full flex flex-col items-center py-16">
          <AvatarProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={false}
          />
          <NameProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={false}
          />
          <div className={`flex w-full ${resizePage ? "flex-wrap px-16" : ""}`}>
            <div
              className={` ${resizePage ? "min-w-full" : "mr-9 basis-8/12"}`}
            >
              <InfoPerson
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <JobProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <EducationProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <ExperienceProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <AchivementProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <CvProfile profile={dataProfile} />
            </div>

            <div className={` ${resizePage ? "min-w-full" : "basis-4/12"}`}>
              <ContactProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <SkillProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
              <LanguageProfile
                dataInfo={dataInfo}
                handleUpdateApi={handleUpdateApi}
                checkUpdate={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
