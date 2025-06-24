"use client";
import React from "react";
import { useState, useEffect } from "react";
import { sanity } from "@/lib/sanity.client";
import {
  allProjectsQuery,
  projectsByServiceQuery,
  allServicesQuery,
} from "@/lib/sanity.queries";
import { Project, Service } from "@/lib/sanity.types";
import Carousel from "./components/Carousel";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FilterBar from "./components/FilterBar";
import { useTheme } from "@/lib/ThemeContext";

export default function Home() {
  const { themeColor, setThemeColor } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setThemeColor(
      document.body.style.backgroundColor.length
        ? document.body.style.backgroundColor
        : "#F670C7"
    );
  }, [setThemeColor]);

  // Fetch all services on mount
  useEffect(() => {
    const fetchServices = async () => {
      const data: Service[] = await sanity.fetch(allServicesQuery);
      setServices(data);
    };
    fetchServices();
  }, []);

  // Fetch projects when a service is selected
  useEffect(() => {
    const fetchProjects = async () => {
      const query =
        selectedService === "all" ? allProjectsQuery : projectsByServiceQuery;

      const params =
        selectedService === "all" ? {} : { serviceId: selectedService };

      const data = await sanity.fetch(query, params);
      setProjects(data);
    };
    fetchProjects();
  }, [selectedService]);

  return (
    <>
      <Nav color={"#fef6fb"} />
      <main className="flex-grow">
        {services.length > 0 && (
          <FilterBar
            services={services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        )}
        {projects.length > 0 && <Carousel projects={projects} />}
      </main>
      <div className="absolute bottom-0 right-0">
        <Footer />
      </div>
    </>
  );
}
