/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
const useSwiperAutoSlider = (gap: number = 0, typeSlider: boolean = false) => {
  const ref_list_slider = useRef<any>();
  const [checkDown, setCheckDown] = useState<boolean>(false);
  const [positionOld, setPositionOld] = useState<number>(0);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [widthList, setWidthList] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [checkNext, setCheckNext] = useState<boolean>(false);
  const [checkPrev, setCheckPrev] = useState<boolean>(false);
  const [checkClick, setCheckClick] = useState<boolean>(true);
  useEffect(() => {
    handleUpData();
  }, []);
  const handleCheckBtn = () => {
    if (position >= 0) {
      setCheckNext(true);
      setCheckPrev(false);
    } else {
      if (-position >= maxWidth - widthList) {
        setCheckNext(false);
        setCheckPrev(true);
      } else {
        setCheckNext(true);
        setCheckPrev(true);
      }
    }
  };

  useEffect(() => {
    if (ref_list_slider.current) {
      ref_list_slider.current.style.transform = `translateX(${position}px)`;
    }
    handleCheckBtn();
  }, [position, widthList]);
  useEffect(() => {
    if (checkDown) {
      const handleMove = (e: any) => {
        setPosition(position + e.clientX - positionOld);
        setCheckClick(false);
      };
      window.addEventListener('mousemove', handleMove);
      return () => {
        window.removeEventListener('mousemove', handleMove);
      };
    }
  }, [checkDown, positionOld, widthList]);
  const handleUpData = () => {
    const list = ref_list_slider.current?.querySelectorAll('li');
    let width = 0;
    list?.forEach((dt: any, index: number) => {
      if (index !== 0) {
        width = width + gap;
      }
      width = width + dt.getBoundingClientRect().width;
    });
    if (typeSlider) {
      setPosition(0);
    }
    setMaxWidth(width);
    setWidthList(
      ref_list_slider.current?.parentElement.getBoundingClientRect().width,
    );
  };
  const handleCheckPosition = () => {
    if (-position != maxWidth - widthList) {
      if (position > 0) {
        setPosition(0);
      } else {
        if (-position > maxWidth - widthList) {
          setPosition(-(maxWidth - widthList));
        } else {
          const list = ref_list_slider.current.querySelectorAll('li');
          let width = 0;
          let check = false;
          list.forEach((dt: any) => {
            const maxwidthItem = dt.getBoundingClientRect().width + gap + width;
            if (!check) {
              if (-position > width && -position < maxwidthItem) {
                const width2 = dt.getBoundingClientRect().width / 2;
                if (width + width2 > -position) {
                  setPosition(-width);
                  check = true;
                } else {
                  setPosition(
                    -(width + dt.getBoundingClientRect().width + gap),
                  );
                  check = true;
                }
              }
            }
            width = width + dt.getBoundingClientRect().width + gap;
          });
        }
      }
    }
  };
  useEffect(() => {
    const handleUp = () => {
      setCheckDown(false);
      ref_list_slider.current.classList.add(`transition-transform`);
      setTimeout(() => {
        ref_list_slider.current?.classList?.remove(`transition-transform`);
      }, 150);
      handleCheckPosition();
    };
    if (checkDown) {
      window.addEventListener('mouseup', handleUp);
      return () => {
        window.removeEventListener('mouseup', handleUp);
      };
    }
  }, [checkDown, position]);
  useEffect(() => {
    const handleResize = () => {
      setWidthList(
        ref_list_slider.current.parentElement.getBoundingClientRect().width,
      );
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleClickDown = (e: any) => {
    setCheckDown(true);
    setPositionOld(e.clientX);
  };
  const handleNext = () => {
    const list = ref_list_slider.current.querySelectorAll('li');
    let width = 0;
    let check = false;
    list.forEach((dt: any) => {
      const maxwidthItem = dt.getBoundingClientRect().width + gap + width;
      if (!check) {
        if (maxwidthItem > maxWidth - widthList) {
          setPosition(-(maxWidth - widthList));
          ref_list_slider.current.classList.add(`transition-transform`);
          setTimeout(() => {
            ref_list_slider.current?.classList.remove(`transition-transform`);
          }, 150);
          check = true;
        } else {
          if (width === -position) {
            setPosition(-maxwidthItem);
            ref_list_slider.current.classList.add(`transition-transform`);
            setTimeout(() => {
              ref_list_slider.current?.classList.remove(`transition-transform`);
            }, 150);
            check = true;
          }
        }
      }
      width = width + dt.getBoundingClientRect().width + gap;
    });
  };
  const handlePrev = () => {
    const list = ref_list_slider.current.querySelectorAll('li');
    let width = 0;
    let check = false;
    list.forEach((dt: any) => {
      const maxwidthItem = dt.getBoundingClientRect().width + gap + width;
      if (!check) {
        if (-position === maxWidth - widthList) {
          if (maxwidthItem >= maxWidth - widthList) {
            setPosition(-width);
            ref_list_slider.current.classList.add(`transition-transform`);
            setTimeout(() => {
              ref_list_slider.current?.classList.remove(`transition-transform`);
            }, 150);
            check = true;
          }
        } else {
          if (maxwidthItem === -position) {
            setPosition(-width);
            ref_list_slider.current.classList.add(`transition-transform`);
            setTimeout(() => {
              ref_list_slider.current?.classList.remove(`transition-transform`);
            }, 150);
            check = true;
          }
        }
      }
      width = width + dt.getBoundingClientRect().width + gap;
    });
  };
  return {
    position,
    setPosition,
    handleClickDown,
    ref_list_slider,
    checkNext,
    checkPrev,
    handleNext,
    handlePrev,
    checkClick,
    setCheckClick,
    handleUpData,
  };
};

export default useSwiperAutoSlider;
