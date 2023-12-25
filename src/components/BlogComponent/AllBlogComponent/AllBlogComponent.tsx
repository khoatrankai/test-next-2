import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { BackIcon, SaveIconFill, SaveIconOutline } from "@/icons";
import communityApi from "@/api/community/apiCommunity";
import "react-toastify/dist/ReactToastify.css";
import "./AllBlogComponent.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

type Props = {
  typeName: any;
  data: any;
  setBookmark: any;
  total: number;
};

const AllBlogComponent = (props: Props) => {
  const [communityUser, setCommunityUser] = React.useState<any>([]);
  const router = useRouter();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );

  useEffect(() => {
    setCommunityUser(props.data);
  }, [props.data]);

  const handleBookmarked = async (id: number) => {
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 201) {
        props.setBookmark();
        toast.success("Save post success", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Save post failed", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    fetchData();
  };

  const handleDeleteBookmarked = async (id: number) => {
    const fetchData = async () => {
      const res = await communityApi.postCommunityBookmarked(id);

      if (res && res.status === 200) {
        props.setBookmark();
        toast.success("Unsave post success", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Unsave post failed", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    fetchData();
  };

  return (
    <div className="my-8 relative">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="icon-back cursor-pointer"
          onClick={() => {
            router.push("/blog");
          }}
        >
          <BackIcon width={12} height={12} fill="white" />
        </div>
        <h1 className="text-2xl font-bold my-4">
          {languageRedux === 1
            ? `Xem ${props.total} Blog mới nhất`
            : `View ${props.total} Newest Blogs`}
        </h1>
      </div>
      <div className="max-w-full">
        <ul className="-mx-[10.5px] flex flex-wrap justify-around gap-y-16">
          {communityUser &&
            communityUser.map((item: any, index: number) => (
              <li
                key={index}
                onClick={(e) => {
                  router.push(
                    `/detail-community?post-community=${item.id}&type=0`
                  );
                  e.stopPropagation();
                }}
                className="w-[370px] group cursor-pointer bg-white shadow-[7px_8px_40px_6px_#00000024] mx-[10.5px] rounded-lg overflow-hidden flex flex-col justify-between gap-8"
              >
                <div className="h-52 overflow-hidden">
                  <Image
                    className="w-full h-full transition-all duration-500 group-hover:scale-110"
                    alt=""
                    width={1920}
                    height={1080}
                    src={item.images[0]?.image}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = "/logo/iphone15.png";
                    }}
                  />
                </div>
                <div className="px-8 flex flex-col gap-4">
                  <h2 className="font-bold text-lg h-16">{item.title} </h2>
                  <div className="max-h-20">
                    <p
                      className="text-sm max-h-20 overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    />
                  </div>
                </div>
                <div className="h-fit p-4 flex gap-x-2 justify-end">
                  <div className="flex items-center">
                    <h3 className="text-sm">{item.communicationLikesCount}</h3>
                    <Image
                      className="w-4"
                      alt=""
                      src={"/iconheart.svg"}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-sm">{item.communicationLikesCount}</h3>
                    <Image
                      className="w-4"
                      alt=""
                      src={"/iconcomment.svg"}
                      width={200}
                      height={200}
                    />
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.bookmarked === true) {
                        handleDeleteBookmarked(item.id);
                      } else {
                        handleBookmarked(item.id);
                      }
                    }}
                    className="flex items-center p-2 rounded-md bg-yellow-500 shadow-[7px_8px_40px_6px_#00000024] cursor-pointer ml-4"
                  >
                    {item.bookmarked === true ? (
                      <>
                        <SaveIconFill width={22} height={22} />
                        <h2 className="text-base ml-2">
                          {languageRedux === 1 ? `Đã lưu` : `Saved`}
                        </h2>
                      </>
                    ) : (
                      <>
                        <SaveIconOutline width={22} height={22} />
                        <h2 className="text-base ml-2">
                          {languageRedux === 1 ? `Lưu tin` : `Save news`}
                        </h2>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllBlogComponent;
