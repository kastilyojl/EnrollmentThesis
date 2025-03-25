import { Link } from "@inertiajs/react";
import React from "react";

function Banner() {
    return (
        <div className="h-auto mt-4 lg:mt-24 p-4 bg-[#00004C] flex flex-col items-center gap-5 justify-center">
            <div>
                <h1 className="text-white text-2xl lg:text-[32px] text-center">
                    Start your journey today and unlock endless possibilities in
                    your education at
                    <span
                        className="text-[#ED1C24] font-bold block
                    "
                    >
                        Westbridge Institue of Technology Inc.
                    </span>{" "}
                    where innovation meets excellence.
                </h1>
            </div>
            <div className="flex gap-5">
                <Link
                    href={route("landing-page.section.application")}
                    className="group cursor-pointer relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                    <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                        Apply Now
                    </span>
                </Link>

                <a
                    className="group relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                    href="https://www.facebook.com/WITIofficial"
                    target="_blank"
                >
                    <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                    <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                        Follow Us
                    </span>
                </a>
            </div>
        </div>
    );
}

export default Banner;
