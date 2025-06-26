"use client";
import React from "react";
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

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // Unwrap the promise
  const [project, setProject] = useState<Project>();
  const pathname = usePathname();
  const { setThemeColor } = useTheme();

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

  return (
    <>
      <Nav color={"#FCCEEE"} />
      {project && (
        <>
          <div className="m-[100px] flex flex-col gap-5">
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
            <div className="">
              {/* shapes */}
            </div>
            <div className={`${css.gridWrapper}`}>
              {[project.mainImage, ...(project.gallery || [])].map(
                (image, i) => (
                  <div key={i} className="grid-item">
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
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
