/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PersonIcon from "@mui/icons-material/Person";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
type Props = {};

const page = (props: Props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  return (
    <div className="flex bottom-0 w-full justify-center">
      <div className="w-full h-fit max-w-6xl flex flex-col mb-10">
        <div>
          <div className="flex flex-col justify-center items-center text-center ">
            <Image src="/logo/2023.png" width={200} height={200} alt={""} />
            <div className="font-bold text-2xl">
              {languageRedux === 1
                ? "GIẢI PHÁP QUẢN TRỊ TUYỂN DỤNG HIỆU SUẤT CAO"
                : "HIGH PERFORMANCE RECRUITMENT MANAGEMENT SOLUTION"}
            </div>
            <div className="flex flex-wrap gap-24 mt-5 mb-5 justify-center">
              <div>
                <div>
                  <PhoneIcon
                    sx={{
                      color: "#d4a650",
                    }}
                  />
                </div>
                <div>Hotline</div>
                <div className="font-bold">0765999xxxx</div>
              </div>
              <div>
                <div>
                  <EmailIcon
                    sx={{
                      color: "#d4a650",
                    }}
                  />
                </div>
                <div>Email</div>
                <div className="font-bold">hcmute@gmail.com</div>
              </div>
              <div>
                <div>
                  <LanguageIcon
                    sx={{
                      color: "#d4a650",
                    }}
                  />
                </div>
                <div>Website</div>
                <div className="font-bold">https://</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-black text-2xl font-bold mt-10">
              {languageRedux === 1
                ? "Công ty TNHH Công nghệ Jobs"
                : "Jobs Technology Company Limited"}
            </div>
            <div className="text-black text-sm">
              <AddLocationIcon />
              {languageRedux === 1
                ? "Địa chỉ: 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.HCM"
                : "Address: 1 Vo Van Ngan, Linh Chieu, Thu Duc, Ho Chi Minh City"}
            </div>
            <div className="text-black text-sm">
              <PersonIcon /> 20161385 - Huynh Bao Toan
            </div>
            <div className="text-black text-sm">
              <PersonIcon /> 20110505 - Tran Tan Khoa
            </div>
          </div>
          {/* add QR */}
          <div className="flex flex-col gap-2">
            <div className="text-black text-2xl font-bold mt-10">
              {languageRedux === 1 ? "Tải ứng dụng Jobs" : "Download Jobs app"}
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="https://happytime.vn/AppStore.svg"
                width={100}
                height={100}
                alt={""}
              />
              <Image
                src="https://happytime.vn/GooglePlay.svg"
                width={100}
                height={100}
                alt={""}
              />
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
