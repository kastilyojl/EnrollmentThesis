import {
    Bot,
    BotMessageSquare,
    HeartPulse,
    Send,
    User,
    User2,
    X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

export default function ChatBubbles({ className = "" }) {
    const [isVisible, setIsVisible] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!show) {
            const interval = setInterval(() => {
                setIsVisible((prev) => !prev);
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [show]);

    const handleChatBot = () => {
        setShow((prev) => !prev);
        setIsVisible(false);
    };

    const faq = {
        faq1: {
            question: "what is the color of banana",
            answer: "the color of banana is yellow",
        },
        faq2: {
            question: "what is the color of apple",
            answer: "the color of banana is red",
        },
        faq3: {
            question: "what is the color of water melon",
            answer: "the color of banana is green",
        },
    };

    return (
        <div className={`${className} space-y-2`}>
            {show && (
                <div className="bg-white border relative shadow-lg h-96 max-w-80 space-y-2 rounded-lg rounded-br-none">
                    <div className=" p-2 flex justify-between bg-yellow-500 rounded-lg rounded-bl-none rounded-br-none">
                        <p className="text-white font-medium">ChatBot</p>
                        <X className="h-5 text-white cursor-pointer hover:bg-slate-50 hover:text-black" />
                    </div>

                    <ScrollArea className="h-72">
                        <div className="flex flex-col gap-2">
                            <div className="chat chat-start px-4 flex gap-2 items-center">
                                <div className="chat-image avatar">
                                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex justify-center items-center">
                                        <Bot className="text-white" />
                                    </div>
                                </div>
                                <div className="chat-bubble text-sm p-2 even:bg-slate-100 max-w-96 border border-gray-300 rounded-lg relative">
                                    <ul>
                                        <li>
                                            <a href="">How to eat banana</a>
                                        </li>
                                        <li>
                                            <a href="">How to eat apple</a>
                                        </li>
                                        <li>
                                            <a href="">How to eat grapes</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="chat chat-start px-4 flex gap-2 items-center">
                                <div className="chat-bubble text-sm p-2 even:bg-slate-100 max-w-96 border border-gray-300 rounded-lg relative">
                                    It was said that you would, destroy the
                                    Sith, not join them.
                                </div>
                                <div className="chat-image avatar">
                                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex justify-center items-center">
                                        <User className="text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="chat chat-start px-4 flex gap-2 items-center">
                                <div className="chat-image avatar">
                                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex justify-center items-center">
                                        <Bot className="text-white" />
                                    </div>
                                </div>
                                <div className="chat-bubble text-sm p-2 even:bg-slate-100 max-w-96 border border-gray-300 rounded-lg relative">
                                    It was said that you would, destroy the
                                    Sith, not join them.
                                </div>
                            </div>

                            <div className="chat chat-start px-4 flex gap-2 items-center">
                                <div className="chat-bubble text-sm p-2 even:bg-slate-100 max-w-96 border border-gray-300 rounded-lg relative">
                                    It was said that you would, destroy the
                                    Sith, not join them.
                                </div>
                                <div className="chat-image avatar">
                                    <div className="w-10 h-10 rounded-full bg-yellow-600 flex justify-center items-center">
                                        <User className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="absolute bottom-0 right-0 left-0 py-2">
                        <Separator />
                        <div className="mt-2 px-4 flex items-center gap-2">
                            <div className="bg-gray-200 px-2 text-gray-600 font-medium w-full p-1 rounded text-sm cursor-not-allowed">
                                Tap to Choose Above
                            </div>
                            <Send className="h-5 cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`avatar space-y-2 ${!show ? "animate-bounce" : ""}`}
            >
                {isVisible && (
                    <div className="bg-yellow-500 shadow-lg text-sm p-2 text-white rounded rounded-br-none">
                        Chat with me?
                    </div>
                )}
                <div className="flex justify-end" onClick={handleChatBot}>
                    <div className="w-14 h-14 shadow-lg  cursor-pointer rounded-full left-0 flex justify-center items-center bg-yellow-500">
                        <BotMessageSquare className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
