"use client";
import templateApi from "@/api/template/templateApi";
import { useSrollContext } from "@/context/AppProvider";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type Props = {};

const Page = () => {
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [age, setAge] = React.useState("");
  const [dataTemplate, setDataTemplate] = React.useState([]);
  const { handleLoadHrefPage } = useSrollContext();
  const router = useRouter();
  useEffect(() => {
    handleLoadHrefPage();
    const fetchData = async () => {
      const res = await templateApi.getAllTemplates();

      if (res && res.status === 200) {
        setDataTemplate(res.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="justify-center flex py-12 bg-[#f0f0f0]">
      <div className="w-full max-w-6xl ">
        <div className="flex flex-col">
          <div className="py-3 text-xl font-bold text-[#a18c2b]">
            {language === 1
              ? "Danh sách mẫu CV xin việc"
              : "List of job application CV samples"}
          </div>
          <div className="flex bg-[#fff] rounded-sm p-6 justify-center font-bold text-[#a18c2b] text-lg">
            {/* <FormControl sx={{m: 1, minWidth: 120, width: '100%'}}>
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Age"
                onChange={handleChange}
                size="medium"
                sx={{
                  width: '25%',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            {language === 1
              ? `Tìm thấy ${dataTemplate.length} mẫu CV`
              : `Found ${dataTemplate.length} CV template`}
          </div>
          <div className="flex flex-wrap w-full h-fit bg-[#fff] my-4 justify-center">
            {dataTemplate.map((item: any, index: number) => (
              <div key={index} className=" p-3">
                <div className="flex flex-col rounded-sm p-3 cursor-pointer">
                  <div
                    className="flex justify-center w-[200px] h-[300px]"
                    onClick={() => {
                      router.push(`/cv/create/template/${item.id - 1}`);
                    }}
                  >
                    <img src={item.image} alt="" />
                  </div>
                  <div className="flex justify-center mt-2 font-bold">
                    <div className="text-center">{item.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full h-fit bg-[#fff] my-4 p-5">
            <div className="text-[#a18c2b] font-bold mb-3">
              {language === 1
                ? "Tạo CV online miễn phí với các mẫu CV được thiết kế sẵn chỉ với 3 bước:"
                : "Create a free online CV with pre-designed CV templates in just 3 steps:"}
            </div>
            <div>
              <ul>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Bước 1: Chọn ngôn ngữ khác / thay đổi tiêu chí gợi ý mẫu CV để TopCV gợi ý các mẫu CV phù hợp với nhu cầu của bạn."
                    : "Step 1: Choose another language / change the CV template suggestion criteria to TopCV suggests CV templates that suit your needs."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Bước 2: Chọn mẫu CV miễn phí mà bạn ưng ý nhất và tiến hành viết CV."
                    : "Step 2: Choose the free CV template that you like best and proceed to write CV."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Bước 3: Sau khi hoàn thiện viết CV, bạn tiến hành lưu CV lại tải CV về dưới dạng PDF hoặc sử dụng link CV online để gửi cho nhà tuyển dụng."
                    : "Step 3: After completing writing CV, you proceed to save CV and continue to the next step."}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full h-fit bg-[#fff] my-4 p-5">
            <div className="text-[#a18c2b] font-bold mb-3">
              {language === 1
                ? "Tại sao nên tạo CV online trên TKV"
                : "Why should you create an online CV on TKV?"}
            </div>
            <div>
              <ul>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Nhiều mẫu CV đẹp, miễn phí, phù hợp nhu cầu ứng tuyển các vị trí khác nhau."
                    : "Many beautiful, free CV templates, suitable for applying for different positions."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Tương tác trực quan, dễ dàng chỉnh sửa thông tin, tạo CV online nhanh chóng trong vòng 5 phút."
                    : "Intuitive interaction, easy to edit information, quickly create online CV within 5 minutes."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Nhận gợi ý cách viết CV phù hợp cùng các mẫu CV tham khảo chi tiết theo ngành nghề."
                    : "Receive suggestions on how to write a suitable CV along with detailed reference CV samples by industry."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Mẫu CV đồng bộ với các mẫu thư xin việc (Cover Letter)."
                    : "The CV template is synchronized with the cover letter templates."}
                </li>
                <li className="mb-2 text-sm">
                  {language === 1
                    ? "Các mẫu CV hỗ trợ đa ngôn ngữ: tiếng Anh / Nhật / Việt."
                    : "CV templates support multiple languages: English / Japanese / Vietnamese."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
