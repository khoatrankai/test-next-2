"use client";
import React, { useState, useEffect, RefObject, forwardRef } from "react";
import Image from "next/image";
import hotTopicApi from "@/api/topics/hotTopicApi";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { analytics } from "../../configs/firebase";
import { logEvent } from "firebase/analytics";

type Props = {};

const HotJobComponent = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(13);
  const [topic, setTopic] = useState<any>([]);
  const router = useRouter();
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = (await hotTopicApi.getAllTopics()) as any;
        if (reponse && reponse?.status === 200) {
          setTopic(reponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleUpData();
  }, [topic]);
  return (
    <div className="flex justify-center w-full">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <h1 className="font-bold text-2xl mb-8">
          {language === 1 ? `Công việc nổi bật` : `Outstanding work`}
        </h1>
        <div className="relative" ref={ref}>
          {checkPrev && (
            <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 rounded-full transition-all group-hover:p-2"
                onClick={handlePrev}
              >
                <Image
                  className="w-6"
                  src={"/iconleft.svg"}
                  alt="left"
                  width={200}
                  height={200}
                />
              </button>
            </div>
          )}

          <ul
            ref={ref_list_slider}
            className={` select-none inline-flex justify-center`}
            onMouseDown={handleClickDown}
          >
            {topic &&
              topic?.length > 0 &&
              topic.map((item: any, index: number) => (
                <li
                  key={index}
                  className="w-[344px] h-[220px] relative bg-red-500 rounded-lg flex flex-col items-center justify-center item-company overflow-hidden cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch(`/more-hotjob/${item.id}`);
                  }}
                  onClick={() => {
                    if (checkClick) {
                      router.push(`/more-hotjob/${item.id}`);
                      logEvent(analytics, "select_hotjob");
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  {/* {checkClick && <a href="`/more-hotjob/${item.id}`"></a>} */}

                  <Image
                    src={item.image}
                    className="pointer-events-none w-full h-full"
                    width={344}
                    height={180}
                    alt="Kinh doanh"
                  />
                  <h2 className="absolute top-3 left-2 text-white font-semibold">
                    {item.title}
                  </h2>
                  <p className="font-bold absolute top-3 right-2 text-white">
                    {item.count}
                  </p>
                </li>
              ))}
          </ul>
          {checkNext && (
            <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
                onClick={handleNext}
              >
                <Image
                  className="w-6"
                  src={"/iconright.svg"}
                  alt="right"
                  width={200}
                  height={200}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HotJobComponent;
