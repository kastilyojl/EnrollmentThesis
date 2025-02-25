import CarouselCard from "@/components/carousel";
import Topbar from "@/components/topbar";
import React from "react";
import ProgramOffer from "./Section/ProgramOffer";

export default function LandingPage() {
    return (
        <div>
            <Topbar />
            <CarouselCard />
            <ProgramOffer />
        </div>
    );
}
