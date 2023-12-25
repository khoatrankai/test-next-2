import React from "react";
import "./MenuBlogComponent.scss";
import Image from "next/image";
type Props = {};

const MenuBlogComponent = (props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="h-fit  w-full bg-white/40 rounded-xl p-2">
        <ul className="flex justify-around">
          <li className="flex gap-x-1 group relative cursor-pointer p-2">
            <h2>Cẩm Nang Tìm Việc</h2>
            <Image
              className="w-3"
              alt=""
              width={200}
              height={200}
              src={"/iconleft.svg"}
            />
            <div className="absolute h-80 -inset-x-10 bg-white rounded-lg top-full hidden group-hover:block shadow-[7px_8px_40px_6px_#00000024]"></div>
          </li>
          <li className="flex gap-x-1 group relative cursor-pointer p-2">
            <h2>Cẩm Nang Ứng Tuyển</h2>
            <Image
              className="w-3"
              alt=""
              width={200}
              height={200}
              src={"/iconleft.svg"}
            />
            <div className="absolute h-80 -inset-x-10 bg-white rounded-lg top-full hidden group-hover:block shadow-[7px_8px_40px_6px_#00000024]"></div>
          </li>
          <li className="flex gap-x-1 group relative cursor-pointer p-2">
            <h2>Kinh Nghiệm Chọn Ngành</h2>
            <Image
              className="w-3"
              alt=""
              width={200}
              height={200}
              src={"/iconleft.svg"}
            />
            <div className="absolute h-80 -inset-x-10 bg-white rounded-lg top-full hidden group-hover:block shadow-[7px_8px_40px_6px_#00000024]"></div>
          </li>
          <li className="flex gap-x-1 group relative cursor-pointer p-2">
            <h2>Chuyện Công Sở</h2>
            <Image
              className="w-3"
              alt=""
              width={200}
              height={200}
              src={"/iconleft.svg"}
            />
            <div className="absolute h-80 -inset-x-10 bg-white rounded-lg top-full hidden group-hover:block shadow-[7px_8px_40px_6px_#00000024]"></div>
          </li>
          <li className="flex gap-x-1 cursor-pointer p-2">
            <h2>Cộng Đồng</h2>
            <Image
              className="w-3"
              alt=""
              width={200}
              height={200}
              src={"/iconleft.svg"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBlogComponent;
