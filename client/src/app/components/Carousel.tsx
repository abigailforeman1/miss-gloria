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
        className="!py-[50px]"
        spaceBetween={0}
        slidesPerView={5}
        loop={true}
        centeredSlides={true}
        slideToClickedSlide={true}
        // freeMode={{
        //   enabled: true,
        //   momentum: true,
        //   sticky: true, // true = more snap, false = smoother
        // }}
        direction={"horizontal"}
        mousewheel={true}
        modules={[Mousewheel, FreeMode]}
        // onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {/* ${i == activeIndex - 1 || i == activeIndex - 2 ? css.prevSlide : ""} */}
        {projects.map((project, i) => (
          <>
            <SwiperSlide
              className={`transition-transform duration-100 origin-top
                ${activeIndex == i ? css.activeSlide : css.inactiveSlide}
                ${
                  activeIndex <= projects.length - 3 &&
                  (i == activeIndex + 1 || i == activeIndex + 2
                    ? css.nextSlide
                    : "")
                }
                ${
                  activeIndex === projects.length - 2 &&
                  (i == 6 || i == 0 ? css.nextSlide : "")
                }
                ${
                  activeIndex === projects.length - 1 &&
                  (i == 0 || i == 1 ? css.nextSlide : "")
                }


                                ${
                                  activeIndex >= 2 &&
                                  (i == activeIndex - 1 || i == activeIndex - 2
                                    ? css.prevSlide
                                    : "")
                                }
                ${
                  activeIndex === 1 &&
                  (i == 0 || i == projects.length - 1 ? css.prevSlide : "")
                }
                ${
                  activeIndex === 0 &&
                  (i == projects.length - 1 || i == projects.length - 2
                    ? css.prevSlide
                    : "")
                }


                `}
              style={{
                transform:
                  i == 1 || i == 2
                    ? "translateX(50%) !important"
                    : i == 5 || i == 6
                    ? "translateX(-50%) !important"
                    : "",
              }}
              key={project._id}
            >
              <div className={css.slideInner}>
                <div className="flex flex-col text-xs font-[family-name:var(--font-inter)] font-regular text-pink-100 mb-[10px] gap-[2px]">
                  <h1>
                    {i < 10 ? "0" : ""}
                    {i + 1}.
                  </h1>
                  <h1>{project.client}</h1>
                  <h1>{project.title}</h1>
                </div>

                <Image
                  src={urlFor(project.mainImageUrl)
                    .width(500)
                    .quality(100)
                    .url()}
                  alt={project.mainImage.alt || "Project image"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }} // optional
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
