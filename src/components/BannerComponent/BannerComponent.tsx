import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import bannersApi from "@/api/banner/apiBanner";
import { DotButton, NextButton, PrevButton } from "./Components";
import "./style.scss";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  // setScrollPosition: React.Dispatch<SetStateAction<Number>>;
};

const BannerComponent = (props: Props) => {
  const options: EmblaOptionsType = {
    loop: true,
    align: "center",
  };

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [dataBanners, setDataBanners] = useState<any>([]);
  const emblaContainerRef = React.useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const getBannersApi = async () => {
    const result = await bannersApi.getBannersApi("vi", null);
    try {
      if (result) {
        setDataBanners(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBannersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const SLIDE_COUNT = dataBanners.length;
  const slideCount = useRef(dataBanners.length);
  slideCount.current = dataBanners.length;
  const slides = useMemo(() => {
    return Array.from(Array(15).keys());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageByIndex = (index: number): any =>
    dataBanners[index % dataBanners.length];

  const handleMouseEvent = () => {
    const { current: emblaContainerEl } = emblaContainerRef;

    if (emblaContainerEl) {
      emblaContainerEl.addEventListener("mousedown", () => {
        emblaContainerEl.style.cursor = "grabbing";
        // (emblaApi as any)?.clickAllowed();
      });

      emblaContainerEl.addEventListener("mouseup", () => {
        emblaContainerEl.style.cursor = "grab";
      });
    }
  };

  React.useEffect(() => {
    handleMouseEvent();
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="flex flex-col items-center relative mt-[104px] w-full justify-center">
      <div className="embla max-w-6xl w-full">
        {dataBanners && dataBanners.length > 0 && (
          <>
            <div className="embla__viewport" ref={emblaRef}>
              <div
                className="embla__container"
                ref={emblaContainerRef}
                style={{ marginLeft: "1px", borderRadius: "20px" }}
              >
                {slides?.map((value: any, index: number) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__number">
                      <span>{index + 1}</span>
                    </div>
                    <img
                      className="embla__slide__img"
                      src={imageByIndex(index) ? imageByIndex(index).image : ""}
                      alt={`ảnh banner`}
                    />
                  </div>
                ))}
              </div>
              <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
              <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerComponent;
