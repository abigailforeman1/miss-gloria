"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Mousewheel, FreeMode } from "swiper/modules";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";
import { urlFor } from "@/lib/sanity.image";
import { Project } from "@/lib/sanity.types";

export default function Carousel({ projects }: { projects: Project[] }) {
  const { themeColor, setThemeColor } = useTheme();

  console.log(projects);

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
        spaceBetween={5}
        slidesPerView={5}
        freeMode={true}
        direction={"horizontal"}
        // height={"80%"}
        loop={true}
        // autoHeight={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        mousewheel={true}
        modules={[Mousewheel, FreeMode]}
      >
        {projects.map((project, i) => (
          <SwiperSlide key={project._id}>
              <div className="text-xs font-[family-name:var(--font-inter)] font-regular text-pink-100 mb-[10px] gap-[5px]">
                <h1>{i + 1}</h1>
                <h1>{project.client}</h1>
                <h1>{project.title}</h1>
              </div>
              <Image
                src={urlFor(project.mainImageUrl).width(250).quality(100).url()}
                alt={project.mainImage.alt || "Project image"}
                width={250}
                height={200}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
