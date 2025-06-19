"use client";

import React, { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Mousewheel, FreeMode } from "swiper/modules";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";
import { urlFor } from "@/lib/sanity.image";
import { Project } from "@/lib/sanity.types";
import css from "@/app/ui/carousel.module.css";

export default function Carousel({ projects }: { projects: Project[] }) {
  const { themeColor, setThemeColor } = useTheme();
  // const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  useEffect(() => {
    setThemeColor(
      document.body.style.backgroundColor.length
        ? document.body.style.backgroundColor
        : "#F670C7"
    );
  }, [themeColor]);

  return (
    <div className="w-full h-full flex justify-center overflow-visible">
      <Swiper
        className="!pt-[25px] !pb-[50px]"
        spaceBetween={10}
        slidesPerView={5}
        // loop={true}
        centeredSlides={true}
        initialSlide={Math.floor(projects.length / 2)}
        slideToClickedSlide={true}
        freeMode={{
          enabled: true,
          momentum: true,
          sticky: false, // true = more snap, false = smoother
        }}
        speed={800}
        direction={"horizontal"}
        mousewheel={true}
        modules={[Mousewheel, FreeMode]}
        // onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          const newIndex = swiper.realIndex;
          if (newIndex !== prevIndex) {
            const direction = newIndex > prevIndex ? "right" : "left";
            console.log(direction);
            setSwipeDirection(direction);
            setPrevIndex(newIndex);
          }
        }}
      >
        {projects.map((project, i) => (
          <>
            <SwiperSlide
              className={`
                ${
                  activeIndex == i
                    ? `transition-transform duration-500
                      ${css.activeSlide}`
                    : ""
                }
                ${i > activeIndex ? `${css.nextSlide}` : ""}
                ${i < activeIndex ? `${css.prevSlide}` : ""}

                `}
              key={project._id}
            >
              <div className={css.slideInner}>
                <div
                  className={`${
                    i === activeIndex
                      ? css.activeText
                      : `transition-transform duration-500 ${
                          swipeDirection == "left"
                            ? `origin-bottom-right`
                            : "origin-bottom-left"
                        }`
                  } transition-transform duration-500 flex flex-col text-xs font-[family-name:var(--font-inter)] font-regular text-pink-100 mb-[10px] gap-[2px]`}
                >
                  {/* <h1>
                    {i < 10 ? "0" : ""}
                    {i + 1}.
                  </h1> */}
                  <h1>{project.client}</h1>
                  <h1>{project.title}</h1>
                </div>

                <Image
                  className={`${
                    activeIndex == i
                      ? css.activeImage
                      : `transition-transform duration-500 ${
                          swipeDirection == "left"
                            ? "origin-top-right"
                            : "origin-top-left"
                        }`
                  } transition-transform duration-500`}
                  src={urlFor(project.mainImageUrl)
                    .width(500)
                    .quality(100)
                    .url()}
                  alt={project.mainImage.alt || "Project image"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
