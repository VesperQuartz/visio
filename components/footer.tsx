"use client";
import {Button} from "./ui/button";
import React from "react";

export const Footer = () => {
    return (
        <footer>
            <div className="m-3">
                <div className="flex gap-4">
                    <Button
                        className="rounded-2xl bg-[#C1A616] text-white"
                        variant={"outline"}
                    >
                        Help
                    </Button>
                    <Button
                        className="rounded-2xl border-[#C1A616]"
                        variant={"outline"}
                    >
                        Repeat
                    </Button>
                </div>
            </div>
        </footer>
    )
}
