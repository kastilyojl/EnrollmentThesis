import CarouselCard from "@/components/carousel";
import Topbar from "@/components/topbar";
import React from "react";
import ProgramOffer from "./Section/ProgramOffer";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import Branch from "@/components/Branch";
import Banner from "@/components/Banner";
import ChatBubbles from "@/components/ChatBubbles";

export default function LandingPage() {
    return (
        <div className="bg-gray-200">
            <Topbar />
            <CarouselCard />
            <Banner />
            <ProgramOffer />
            <Branch />
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
            <ChatBubbles className="fixed bottom-0 right-0 m-10" />
        </div>
    );
}
