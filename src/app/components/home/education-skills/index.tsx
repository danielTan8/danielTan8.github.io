"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  subjects: string[];
}

interface SkillItem {
  icon: string;
  name: string;
  rating: number;
}

interface EducationData {
  education: EducationItem[];
  skills: SkillItem[];
}

const SkillCard = ({ value }: { value: SkillItem }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="p-4 xl:p-6 border border-softGray rounded-lg flex flex-col gap-5 sm:gap-10 items-center justify-between hover:border-orange-500 transition-all duration-300 group">
      <div className="flex flex-col items-center gap-5">
        <div className="w-[70px] h-[70px] flex items-center justify-center relative">
          {!imageError ? (
            <Image
              src={getImgPath(value?.icon)}
              alt={value?.name}
              width={70}
              height={70}
              onError={() => setImageError(true)}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
              <span className="text-2xl font-bold text-orange-500">
                {value?.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <p className="text-black font-semibold text-center">{value?.name}</p>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="9"
              height="9"
              rx="4.5"
              fill={i < value?.rating ? "#FE4300" : "#C0D8E0"}
              className="transition-colors duration-300"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

const EducationSkills = () => {
  const [educationData, setEductionData] = useState<EducationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-softGray overflow-hidden">
        <div className="container relative z-10">
          <Image
            src={getImgPath(
              "/images/home/education-skill/edu-skill-vector.svg"
            )}
            alt="vector"
            width={260}
            height={170}
            className="no-print absolute top-0 left-0 transform -translate-y-1/2"
          />
          <div className="relative z-10 py-16 md:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 xl:mb-16">
              <h2>Education & Skills</h2>
              <p className="text-xl text-orange-500">( 03 )</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-20">
              <div className="w-full lg:flex-1 flex flex-col gap-10">
                {educationData?.education?.map(
                  (value: EducationItem, index: number) => {
                    return (
                      <div key={index} className="flex items-start gap-6 group">
                        <div className="no-print mt-2 w-4 h-4 rounded-full border border-black flex items-center justify-center bg-white shrink-0">
                          <div className="w-2 h-2 rounded-full bg-black group-hover:bg-orange-500 transition-colors"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className="text-xl font-bold text-black">{value?.degree}</h4>
                            <span className="text-orange-500 font-semibold text-sm">{value?.period}</span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-gray-800">{value?.institution}</p>
                            <p className="text-gray-500 text-sm italic">{value?.location}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {value?.subjects?.map((subject, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs font-medium border border-gray-200"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7 w-full lg:max-w-xl">
                {educationData?.skills?.map(
                  (value: SkillItem, index: number) => {
                    return (
                      <SkillCard key={index} value={value} />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
