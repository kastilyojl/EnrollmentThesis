import React from "react";

export default function Branch() {
    const Branches = [
        {
            Name: "Cabuyao Laguna - Main Banlic Branch",
            Location:
                "#1 National Highway, Brgy. Banlic (Beside Puregold San Isidro)",
            Map: "https://maps.app.goo.gl/dZodVH6Du3WJsvj6A",
        },
        {
            Name: "Cabuyao Laguna - Uno Branch",
            Location: "JP Rizal St, Brgy. Uno (In front of NST Carage)",
            Map: "https://maps.app.goo.gl/KWsKvyA7KbRZzaHB8",
        },
        {
            Name: "San Jose, Occ. Mindoro - Pag-Asa Branch",
            Location: "G. Lopez Jaena St. Brgy. Pag-Asa (Near Narra House)",
            Map: "https://maps.app.goo.gl/Z4nu7tHt2Nt6oU7TA",
        },
        {
            Name: "San Mateo, Rizal - Sta. Ana Branch",
            Location: "#8 P. Burgos St. Brgy. Sta. Ana (Old SSS Bldg.)",
            Map: "https://maps.app.goo.gl/taFUH2af9MopqcxG9",
        },
        {
            Name: "San Mateo, Rizal - Sta. Ana Branch",
            Location:
                "254 Gen. Luna Ave, Brgy. Sta. Ana (Beside Desmark Corp.)",
            Map: "https://maps.app.goo.gl/taFUH2af9MopqcxG9",
        },
        {
            Name: "San Mateo, Rizal - Ampid Branch",
            Location:
                "Gen. Luna Ave,Brgy. Ampid (in front of SM City San Mateo)",
            Map: "https://maps.app.goo.gl/2iaWpFWwGuophCF4A",
        },
        {
            Name: "Montalban, Rizal - Balite Branch",
            Location:
                "417 Cruz-San Subd., Daang Hari Balite (Beside Peña Bldg.)",
            Map: "https://maps.app.goo.gl/WK3jpjYZ27wue34Y8",
        },
    ];

    return (
        <div className="py-10 px-6 lg:p-20 bg-slate-50">
            <p className="text-[32px] text-center py-4 text-[#00004C] font-bold">
                Visit any of our WITI Branches
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                {Branches.map((branch, index) => {
                    return (
                        <article
                            key={index}
                            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
                        >
                            <span className="inline-block rounded bg-[#00004C] p-2 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </span>

                            <a href="#">
                                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                    {branch.Name}
                                </h3>
                            </a>

                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                {branch.Location}
                            </p>

                            <a
                                href={branch.Map}
                                target="_blank"
                                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00004C]"
                            >
                                Show location
                                <span
                                    aria-hidden="true"
                                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                >
                                    &rarr;
                                </span>
                            </a>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
