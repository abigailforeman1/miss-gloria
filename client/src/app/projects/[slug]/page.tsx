"use client";
import React, { JSX } from "react";
import { useState, useEffect, use } from "react";
import { sanity } from "@/lib/sanity.client";
import { singleProjectQuery } from "@/lib/sanity.queries";
import { Project } from "@/lib/sanity.types";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/ThemeContext";
import Nav from "@/app/components/Nav";
import { Service } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import css from "@/app/ui/project.module.css";
import decodeAssetId from "@/app/utils/decodeAssetId";
import Shape1 from "@/app/assets/shape-1.svg";
import Shape2 from "@/app/assets/shape-2.svg";
import Shape3 from "@/app/assets/shape-3.svg";
import Shape4 from "@/app/assets/shape-4.svg";
import Shape5 from "@/app/assets/shape-5.svg";
import Shape6 from "@/app/assets/shape-6.svg";
import Shape7 from "@/app/assets/shape-7.svg";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // Unwrap the promise
  const [project, setProject] = useState<Project>();
  const pathname = usePathname();
  const { setThemeColor } = useTheme();

  console.log(project);
  useEffect(() => {
    setThemeColor("#4E0D30");
  });

  useEffect(() => {
    document.body.style.backgroundColor = pathname.includes("projects")
      ? "#4E0D30"
      : "#F670C7";

    return () => {
      document.body.style.backgroundColor = "#F670C7"; // reset on unmount
    };
  }, [pathname]);

  // Fetch all services on mount
  useEffect(() => {
    const fetchProject = async () => {
      const data: Project = await sanity.fetch(singleProjectQuery, {
        slug,
      });
      setProject(data);
    };
    fetchProject();
  }, [slug]);

  function getRandomThree() {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    // Shuffle the array
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    // Take the first 3
    return shuffled.slice(0, 3);
  }

  function getSvgComponentByNumber(num: number) {
    switch (num) {
      case 1:
        return <Shape1 />;
      case 2:
        return <Shape2 />;
      case 3:
        return <Shape3 />;
      case 4:
        return <Shape4 />;
      case 5:
        return <Shape5 />;
      case 6:
        return <Shape6 />;
      case 7:
        return <Shape7 />;
      default:
        return null;
    }
  }

  return (
    <>
      <Nav color={"#FCCEEE"} />
      {project && (
        <>
          <div className="m-[100px] flex flex-col gap-10">
            <div className="flex space-between">
              <div className="flex flex-col w-full justify-center">
                <h1 className="flex flex-col text-7xl font-[family-name:var(--font-inter)] font-bold text-pink-200 mb-[10px] gap-[2px]">
                  {project.client}
                </h1>
                <h1 className="flex flex-col text-6xl font-[family-name:var(--font-kalnia)] font-regular text-pink-200 mb-[10px] gap-[2px]">
                  {project.year}
                </h1>
              </div>

              <div className="flex flex-col min-w-[200px] text-right justify-center gap-3">
                <div className="flex flex-col text-s font-[family-name:var(--font-inter)] font-regular text-pink-200">
                  <h1>Services:</h1>
                  <h1 className="font-bold">
                    {project.services.map(
                      (service, i) =>
                        `${service.title}${
                          i < project.services.length - 1 ? `, ` : ``
                        }`
                    )}
                  </h1>
                </div>

                <div className="flex flex-col text-s font-[family-name:var(--font-inter)] font-regular text-pink-200">
                  <h1>Client:</h1>
                  <h1 className="font-bold">{project.client}</h1>
                </div>

                <div className="flex flex-col text-s font-[family-name:var(--font-inter)] font-regular text-pink-200">
                  <h1>Project:</h1>
                  <h1 className="font-bold">{project.title}</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {getRandomThree().map((x) => (
                <div key={x}>{getSvgComponentByNumber(x)}</div>
              ))}
            </div>
            <div className={`${css.gridWrapper}`}>
              {[project.mainImage, ...(project.gallery || [])].map(
                (image, i) => (
                  <React.Fragment key={i}>
                    {(() => {
                      if (
                        i === 2 &&
                        decodeAssetId(project.mainImage.asset._ref)?.dimensions
                          .width >
                          decodeAssetId(project.mainImage.asset._ref)
                            ?.dimensions.height
                      ) {
                        return (
                          <h1 className="col-span-full text-2xl font-[family-name:var(--font-inter)] font-regular text-pink-200 my-4">
                            {project.body}
                          </h1>
                        );
                      } else if (
                        i === 2 &&
                        decodeAssetId(project.gallery[0].asset._ref)?.dimensions
                          .width >
                          decodeAssetId(project.gallery[0].asset._ref)
                            ?.dimensions.height
                      ) {
                        return (
                          <h1 className="col-span-full text-2xl font-[family-name:var(--font-inter)] font-regular text-pink-200 my-4">
                            {project.body}
                          </h1>
                        );
                      } else if (
                        i === 3 &&
                        decodeAssetId(project.mainImage.asset._ref)?.dimensions
                          .width <=
                          decodeAssetId(project.mainImage.asset._ref)
                            ?.dimensions.height &&
                        decodeAssetId(project.gallery[0].asset._ref)?.dimensions
                          .width <=
                          decodeAssetId(project.gallery[0].asset._ref)
                            ?.dimensions.height
                      ) {
                        return (
                          <h1 className="col-span-full text-2xl font-[family-name:var(--font-inter)] font-regular text-pink-200 my-6">
                            {project.body}
                          </h1>
                        );
                      }
                    })()}

                    <div
                      key={i}
                      className={`grid-item w-full h-full object-cover ${
                        decodeAssetId(image.asset._ref)?.dimensions.width >
                        decodeAssetId(image.asset._ref)?.dimensions.height
                          ? `col-span-2`
                          : ``
                      }`}
                    >
                      <Image
                        key={i}
                        src={urlFor(image).width(900).quality(100).url()}
                        className="w-full h-full"
                        alt="miss gloria"
                        width={400}
                        height={400}
                        // fill={true}
                        priority
                      />
                    </div>

                    {(() => {
                      if (
                        (project.gallery.length === 1 && i === 1) ||
                        (project.gallery.length === 2 && i === 2)
                      ) {
                        return (
                          <h1 className="col-span-full text-2xl font-[family-name:var(--font-inter)] font-regular text-pink-200 my-6">
                            {project.body}
                          </h1>
                        );
                      }
                    })()}
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
