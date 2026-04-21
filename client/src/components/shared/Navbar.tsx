import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-secondary/50 shadow-sm no-border">
            <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
                <div className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white font-headline">
                    Family JV International
                </div>
                <div className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium">
                    <Link className="text-amber-700 dark:text-amber-500 font-bold border-b-2 border-amber-600 scale-95 active:scale-90 transition-transform pb-1" href="/">Home</Link>

                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:text-amber-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="/export">Export</Link>

                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:text-amber-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="/import">Import</Link>

                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:text-amber-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="/about">About</Link>

                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:text-amber-600 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="/contact">Contact</Link>
                </div>
                <div className="flex items-center gap-6 font-headline">
                    <button className="hidden md:block scale-95 active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-slate-600 hover:text-amber-600 transition-colors duration-300" data-icon="search">search</span>
                    </button>
                    <button className="bg-primary text-[#fcf9f4] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-container transition-colors duration-300 scale-95 active:scale-90 transition-transform">
                        Request Quote
                    </button>
                </div>
            </div>
        </nav>
    );
}