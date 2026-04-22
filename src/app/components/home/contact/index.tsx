"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SocialLink {
  title: string;
  href: string;
}

interface ContactInfo {
  type: string;
  label: string;
  link: string;
}

interface ContactData {
  socialLinks: SocialLink[];
  contactInfo: ContactInfo[];
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const reset = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://formsubmit.co/ajax/danieltan8@outlook.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        number: formData.number,
        email: formData.email,
        message: formData.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-semibold">Contact Me</h2>
            <p className="text-xl text-orange-500">( 05 )</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label htmlFor="name" className="text-sm text-gray-400 block mb-2">
                      Name *
                    </label>
                    <input
                      required
                      className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="text-sm text-gray-400 block mb-2">
                      Phone *
                    </label>
                    <input
                      required
                      className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      id="number"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-400 block mb-2">
                    Email *
                  </label>
                  <input
                    required
                    className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-gray-400 block mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={1}
                  />
                </div>
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getImgPath("/images/icon/success-icon.svg")}
                      alt="success-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-green-600">
                      Great!!! Email has been Successfully Sent. We will get in
                      touch asap.
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-fit py-4 px-10 border border-orange-500 rounded-full text-xl font-medium text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  Send Now
                </button>
              </div>
            </form>
            <div className="flex flex-col items-start md:items-end gap-12">
              {/* <div className="flex flex-col items-start md:items-end gap-4">
                {contactData?.socialLinks?.map(
                  (value: SocialLink, index: number) => {
                    return (
                      <Link
                        key={index}
                        className="text-lg text-gray-400 hover:text-orange-500 transition-colors"
                        href={value?.href || "#"}
                        target="_blank"
                      >
                        {value?.title}
                      </Link>
                    );
                  }
                )}
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 w-full md:w-auto">
                {contactData?.contactInfo?.map(
                  (value: ContactInfo, index: number) => {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <span className="text-sm text-orange-500 font-medium capitalize">
                          {value?.type}:
                        </span>
                        <Link
                          href={value?.link || "#"}
                          className="text-xl text-black font-normal border-b border-black pb-1 hover:text-orange-500 hover:border-orange-500 transition-all truncate"
                        >
                          {value?.label}
                        </Link>
                      </div>
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

export default Contact;
