'use client'

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Container from "./Container";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const Links = <>
        <li>
            <Link href={"/"} className="hover:text-primary transition-colors duration-200 text-lg">Home</Link>
        </li>
        <li>
            <Link href={"/export"} className="hover:text-primary transition-colors duration-200 text-lg">Export</Link>
        </li>
        <li>
            <Link href={"/import"} className="hover:text-primary transition-colors duration-200 text-lg">Import</Link>
        </li>
        <li>
            <Link href={"/"} className="hover:text-primary transition-colors duration-200 text-lg">About</Link>
        </li>
        <li>
            <Link href={"/"} className="hover:text-primary transition-colors duration-200 text-lg">Contact</Link>
        </li>
    </>

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="w-full bg-secondary/50 shadow-xl">
            <Container className="flex items-center justify-between h-16">

                <Link href={'/'} className="text-lg md:text-xl font-bold tracking-tighter text-slate-900 dark:text-white font-headline hover:opacity-80 transition-opacity">
                    Family JV International
                </Link>

                <ul className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium text-slate-700 dark:text-slate-200">
                    {Links}
                </ul>

                <div className="hidden md:block">
                    <Button className="p-5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 cursor-pointer font-medium">
                        Request Quote
                    </Button>
                </div>

                <button
                    className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} className="text-slate-900 dark:text-white" /> : <Menu size={24} className="text-slate-900 dark:text-white" />}
                </button>
            </Container>

            {isOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
                    <Container className="py-6 space-y-4">
                        <ul className="flex flex-col gap-4 font-headline tracking-tight text-sm font-medium text-slate-700 dark:text-slate-200">
                            <li>
                                <Link href={"/"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Home</Link>
                            </li>
                            <li>
                                <Link href={"/export"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Export</Link>
                            </li>
                            <li>
                                <Link href={"/import"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Import</Link>
                            </li>
                            <li>
                                <Link href={"/"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">About</Link>
                            </li>
                            <li>
                                <Link href={"/"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Contact</Link>
                            </li>
                        </ul>
                        <Button className="w-full py-2.5 px-6 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 cursor-pointer font-medium mt-4">
                            Request Quote
                        </Button>
                    </Container>
                </div>
            )}
        </nav>
    );
}