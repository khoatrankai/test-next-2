"use client";
// Import specific react components instead of importing all of React
import React, { useEffect, useRef, useState } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import BannerComponent from "@/components/BannerComponent/BannerComponent";
import TopCompanyComponent from "@/components/TopCompanyComponent/TopCompanyComponent";
import ListJobComponent from "@/components/ListJobComponent/ListJobComponent";
import SuggestJobComponent from "@/components/SuggestJobComponent/SuggestJobComponent";
import HotJobComponent from "@/components/HotJobComponent/HotJobComponent";
import AllCompanyComponent from "@/components/AllCompanyComponent/page";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import AppliedPostedJob from "@/components/AppliedPostedJob";
import FooterComponent from "@/components/FooterComponent/FooterComponent";

interface PageProps {}

const Home = () => {
  const persistor = persistStore(store);
  const [checkPage, setCheckPage] = useState<string>("/");
  const categoryId = useSelector((state: any) => state.categoryId);
  const hotJobRef = useRef<HTMLDivElement>(null);
  const profile = useSelector((state: any) => state.profile.profile);

  useEffect(() => {
    setCheckPage(location.pathname);
  }, []);

  useEffect(() => {
    if (hotJobRef.current && location.pathname === "/") {
      hotJobRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [categoryId]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="w-full h-full bg-slate-50">
        <BannerComponent />
        {profile && profile.roleData !== 3 && <AppliedPostedJob />}
        <HotJobComponent ref={hotJobRef} />
        <ListJobComponent />
        <AllCompanyComponent />
        {profile && profile.roleData !== 3 && <SuggestJobComponent />}
        <TopCompanyComponent />
        <FooterComponent />
      </div>
    </PersistGate>
  );
};

export default Home;
