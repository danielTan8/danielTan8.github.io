"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WorkItem {
  images: string[];
  slug: string;
  title: string;
  client: string;
}

const LatestWork = () => {
  const [workData, setWorkData] = useState<WorkItem[] | null>(null);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightbox.isOpen]);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
    setTouchStart(null);
  };

  return (
    <section>
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32 ">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>Latest Works</h2>
              <p className="text-xl text-orange-500">
                ( {workData ? workData.length.toString().padStart(2, "0") : "00"} )
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
              {workData?.map((value: WorkItem, index: number) => {
                return (
                  <div key={index} className="group flex flex-col gap-3 xl:gap-6">
                    <div className="relative">
                      <Image
                        src={getImgPath(value?.images[0])}
                        alt="image"
                        width={570}
                        height={414}
                        className="rounded-lg w-full h-full object-cover cursor-pointer"
                        onClick={() => openLightbox(value.images, 0)}
                      />
                      <div
                        onClick={() => openLightbox(value.images, 0)}
                        className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full hidden group-hover:flex rounded-lg cursor-pointer"
                      >
                        <span className="flex justify-center items-center p-5 w-full">
                          <svg
                            width="65"
                            height="64"
                            viewBox="0 0 65 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.333374"
                              width="64"
                              height="64"
                              rx="32"
                              fill="#FE4300"
                            />
                            <path
                              d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                              stroke="#FFFF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0 xl:gap-2">
                      <div className="flex items-center justify-between">
                        <Link href={value.slug} target="_blank">
                          <h5>{value?.title}</h5>
                        </Link>
                        <Image
                          src={getImgPath("/images/icon/right-arrow-icon.svg")}
                          alt="right-arrow-icon"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p>Client: {value?.client}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="absolute top-5 right-5 text-white text-5xl z-10 p-4 hover:text-orange-500 cursor-pointer before:hidden"
            onClick={closeLightbox}
          >
            &times;
          </button>

          {lightbox.images.length > 1 && (
            <>
              {/* Desktop/Mobile Navigation Arrows */}
              <button
                className="absolute left-2 md:left-5 text-white text-4xl md:text-6xl hover:text-orange-500 transition-colors z-50 p-4 cursor-pointer select-none bg-transparent before:hidden"
                onClick={prevImage}
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className="absolute right-2 md:right-5 text-white text-4xl md:text-6xl hover:text-orange-500 transition-colors z-50 p-4 cursor-pointer select-none bg-transparent before:hidden"
                onClick={nextImage}
                aria-label="Next image"
              >
                &#8250;
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[70vh] md:max-h-[80vh] w-full h-full flex items-center justify-center">
            <Image
              src={getImgPath(lightbox.images[lightbox.currentIndex])}
              alt={`Full size view ${lightbox.currentIndex + 1}`}
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>

          <div className="mt-4 text-white text-lg font-medium">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
          <p className="sm:hidden text-white/60 text-sm mt-2 font-medium">Swipe to navigate</p>
        </div>
      )}
    </section>
  );
};

export default LatestWork;
