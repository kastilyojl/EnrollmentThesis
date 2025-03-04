import CarouselCard from "@/components/carousel";
import Topbar from "@/components/topbar";
import React from "react";
import ProgramOffer from "./Section/ProgramOffer";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import Branch from "@/components/Branch";
import Banner from "@/components/Banner";

export default function LandingPage() {
    return (
        <div>
            <Topbar />
            <CarouselCard />
            <Banner />
            <ProgramOffer />
            <Branch />
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
        </div>
    );
}
