import React from 'react';

const ExperienceSec = () => {
    const experiences = [
        {
            year: "08/2023 – Present",
            title: "Senior Software Engineer",
            company: "Hipster Pte. Ltd.",
            type: "Singapore",
            description: [
                "Leading the development of web apps using React, TypeScript, and Node.js.",
                "Building and managing AWS infrastructure like ECS, RDS, and Lambda.",
                "Mentoring the team and improving how we build and ship code."
            ]
        },
        {
            year: "07/2020 – 06/2023",
            title: "Senior Software Engineer",
            company: "Webpuppies Digital Pte. Ltd.",
            type: "Singapore",
            description: [
                "Built high-traffic web platforms using React and Node.js.",
                "Managed database design and improved performance on AWS.",
                "Worked with clients to translate business needs into technical features."
            ]
        },
        {
            year: "07/2018 – 06/2020",
            title: "Software Engineer",
            company: "Originally US Pte. Ltd.",
            type: "Singapore",
            description: [
                "Built full-stack features and connected third-party APIs.",
                "Set up and managed app deployments on AWS (EC2/S3).",
                "Refactored code to make apps faster and more responsive."
            ]
        },
        {
            year: "06/2012 - 05/2016",
            title: "Web front-end Developer",
            company: "Genius Web s.r.o.",
            type: "Děčín CZ",
            description: [
                "Developed responsive, pixel-perfect websites for local businesses using HTML, CSS, and JavaScript.",
                "Collaborated with design teams to create intuitive user interfaces and functional components.",
                "Customized e-commerce templates and integrated third-party services and payment gateways.",
                "Applied SEO best practices and ensured optimal performance and cross-browser compatibility."
            ]
        }
    ];

    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                        <h2>Experience</h2>
                        <p className="text-xl text-primary">( 02 )</p>
                    </div>

                    <div className="space-y-7 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative">
                                <div className="">
                                    <h3 className="text-sm md:text-base font-bold text-orange-500 uppercase tracking-widest mb-1">{exp.year}</h3>
                                    <h4 className="text-xl md:text-2xl font-bold text-black leading-tight">{exp.title}</h4>
                                </div>

                                <div className=" relative">
                                    {index < experiences.length && (
                                        <div className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? 'h-full' : 'h-30'} bg-softGray`}></div>
                                    )}

                                    <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                        <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${index === 0 ? 'border-primary' : 'border-black'
                                            }`}>
                                            {index === 0 && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 lg:pl-7">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-black font-semibold">{exp.company}</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{exp.type}</p>
                                    </div>
                                </div>

                                <div className="pl-8 sm:pl-0">
                                    <ul className="space-y-2">
                                        {Array.isArray(exp.description) ? (
                                            exp.description.map((item, i) => (
                                                <li key={i} className="flex gap-2 leading-relaxed text-base text-gray-700">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-softGray flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="flex gap-2 leading-relaxed text-base text-gray-700">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-softGray flex-shrink-0" />
                                                {exp.description}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSec;