"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ContactItem {
  icon: string;
  type: string;
  label: string;
  link: string;
}

interface ContactBarData {
  contactItems: ContactItem[];
}

const HeroSection = () => {
  const [contactBarData, setContactBarData] = useState<ContactBarData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactBarData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative hero-section overflow-hidden pt-60 sm:pt-35 md:pt-40 pb-12 xl:pb-30 xl:pt-52">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-10 xl:gap-16 items-center">
          <div className="flex flex-col gap-4 md:gap-7 max-w-2xl">
            <div>
              <div className="flex items-center gap-8">
                <h1>I&apos;m Daniel</h1>
                <div className="wave">
                  <Image
                    src={getImgPath("/images/home/banner/wave-icon.svg")}
                    alt="wave-icon"
                    width={62}
                    height={62}
                    className=""
                  />
                </div>
              </div>
              <h1>Senior Software Engineer</h1>
            </div>
            <p className="text-secondary font-normal max-w-md xl:max-w-xl">
              I am a results-oriented Senior Software Engineer with over 10 years of experience
              in architecting and building high-performance, scalable web applications.
              Expert in modern frontend ecosystems, specialized in React, Node.js, and
              TypeScript to deliver robust, user-centric solutions.
            </p>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/10 via-orange-300/5 to-transparent rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border border-orange-500/20 bg-white/70 backdrop-blur-sm shadow-[0_10px_40px_-15px_rgba(249,115,22,0.25)] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-orange-500 font-semibold">
                  Get in touch
                </span>
                <span className="h-px flex-1 ml-4 bg-gradient-to-r from-orange-500/40 to-transparent" />
              </div>

              <ul className="flex flex-col gap-3">
                {contactBarData?.contactItems?.map(
                  (value: ContactItem, index: number) => (
                    <li key={index}>
                      <Link
                        href={value?.link || "#"}
                        className="group flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-100 shrink-0">
                          <Image
                            src={getImgPath(value?.icon)}
                            alt={value?.type}
                            width={22}
                            height={22}
                            className="w-5 h-5"
                          />
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
                            {value?.type}
                          </span>
                          <span className="text-base md:text-lg font-medium text-black group-hover:text-orange-500 transition-colors truncate">
                            {value?.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
