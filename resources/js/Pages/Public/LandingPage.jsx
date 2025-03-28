import CarouselCard from "@/components/carousel";
import Topbar from "@/components/topbar";
import React from "react";
import ProgramOffer from "./Section/ProgramOffer";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import Branch from "@/components/Branch";
import Banner from "@/components/Banner";
import ChatBubbles from "@/components/ChatBubbles";
import VideoGuide from "./Section/VideoGuide";

export default function LandingPage({ FAQ = [], campus = [] }) {
    return (
        <div className="bg-gray-200 overflow-x-hidden">
            <Topbar />
            <CarouselCard className="pt-20" />
            <Banner />
            <VideoGuide />
            <ProgramOffer />
            <Branch campus={campus} />
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
            <ChatBubbles FAQ={FAQ} className="fixed bottom-0 right-0 m-4" />
        </div>
    );
}
