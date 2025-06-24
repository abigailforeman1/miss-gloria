"use client";

import React, { useState } from "react";
// import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Mousewheel, FreeMode } from "swiper/modules";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { Project } from "@/lib/sanity.types";
import css from "@/app/ui/carousel.module.css";
import { useRouter } from "next/navigation";

export default function Carousel({ projects }: { projects: Project[] }) {
  // const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const router = useRouter();

  const handleSlideClick = (index: number, slug: string) => {
    if (index === prevIndex || index === 3) {
      router.push(`/projects/${slug}`);
    }
  };

  return (
    <div className="w-full h-full overflow-visible">
      <Swiper
        className="!pt-[25px] cursor-pointer !overflow-visible"
        spaceBetween={10}
        slidesPerView={projects.length >= 5 ? 5 : projects.length}
        // loop={true}
        centeredSlides={true}
        // initialSlide={Math.floor(projects.length / 2)}
        initialSlide={3}
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
            setSwipeDirection(direction);
          }
          setPrevIndex(activeIndex);
        }}
      >
        {projects.map((project, i) => (
          <>
            <SwiperSlide
              onClick={() => {
                setPrevIndex(activeIndex);
                handleSlideClick(i, project.slug.current);
              }}
              className={`swiperSlide group
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
              {/* <Link href={`/projects/${project.slug.current}`}> */}
              <div className={`${css.slideInner}`}>
                <div
                  className={`ease-in-out group-hover:-translate-y-[15%] ${
                    i === activeIndex
                      ? css.activeText
                      : `${
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
                      : `${
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
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              </div>
              {/* </Link> */}
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
