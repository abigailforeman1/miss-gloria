import React from "react";
import { sanity } from "@/lib/sanity.client";
import { projectsQuery } from "@/lib/sanity.queries";
import { Project } from "@/lib/sanity.types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export default async function Home() {
  const projects: Project[] = await sanity.fetch(projectsQuery);

  return (
    <div>
      hi
      {projects.map((project, i) => (
        <React.Fragment key={project._id || i}>
          <h1>{project.title}</h1>

          <Image
            src={urlFor(project.mainImage).width(800).quality(80).url()}
            alt={project.mainImage.alt || "Project image"}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </React.Fragment>
      ))}
    </div>
  );
}
