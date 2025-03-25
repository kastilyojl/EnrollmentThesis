import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { usePage } from "@inertiajs/react";
import React from "react";
import educator from "../../../../../assets/undraw_educator_6dgp.svg";
import { Button } from "@/components/ui/button";

export default function WelcomeCard({ className = "" }) {
    const user = usePage().props.auth.user;
    return (
        <Card
            className={`${className} w-full bg-gray-50 grid grid-cols-[70%_30%] shadow-md justify-center items-center`}
        >
            <div>
                <CardHeader>
                    <CardTitle className="text-gray-900 text-lg">
                        Welcome back, {user.name} 👋
                    </CardTitle>
                    <p className="text-sm ">
                        We're glad to see you again.
                        <span className="font-medium italic">
                            'The journey of learning never ends'
                        </span>
                        .
                    </p>
                </CardHeader>
                <CardFooter className="text-[12px] text-gray-500  mt-4">
                    <Button>View Schedule</Button>
                </CardFooter>
            </div>
            <div>
                <CardContent className="text-4xl font-medium text-end">
                    <img src={educator} alt="educator" />
                </CardContent>
            </div>
        </Card>
    );
}
