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
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  console.log(swiperInstance);

  useEffect(() => {
    setThemeColor(
      document.body.style.backgroundColor.length
        ? document.body.style.backgroundColor
        : "#F670C7"
    );
  }, [themeColor]);

  return (
    <div className="flex">
      <Swiper
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
        // height={"80%"}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        mousewheel={true}
        modules={[Mousewheel, FreeMode]}
        onSwiper={setSwiperInstance}
      >
        {projects.map((project, i) => (
          <SwiperSlide
            key={project._id}
            // className="transition-transform duration-300 !w-[250px]"
            className={`transition-transform duration-300 ${
              swiperInstance?.activeIndex === i ? css.activeSlide : ""
            }`}
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
                src={urlFor(project.mainImageUrl).width(250).quality(100).url()}
                alt={project.mainImage.alt || "Project image"}
                width={250}
                height={300}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
