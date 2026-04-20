import Container from "./Container";

export default function Footer() {
    return (
        <footer className="w-full pt-16 pb-8 bg-primary dark:bg-black border-t border-slate-800 text-muted dark:text-slate-500 font-headline text-xs leading-relaxed hover:opacity-100 transition-opacity duration-300">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
                    {/* Brand / Copyright */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-amber-500 font-bold tracking-widest text-lg mb-4">Family JV International</div>
                        <p>© 2024 Family JV International Business Ltd. All rights reserved.</p>
                    </div>
                    {/* Links Column 1 */}
                    <div className="flex flex-col gap-3">
                        <a className="text-muted hover:text-amber-400 transition-colors" href="#">Privacy Policy</a>
                        <a className="text-muted hover:text-amber-400 transition-colors" href="#">Terms of Service</a>
                        <a className="text-muted hover:text-amber-400 transition-colors" href="#">Global Compliance</a>
                    </div>
                    {/* Links Column 2 */}
                    <div className="flex flex-col gap-3">
                        <a className="text-muted hover:text-amber-400 transition-colors" href="#">Sitemap</a>
                        <a className="text-muted hover:text-amber-400 transition-colors" href="#">Track Cargo</a>
                    </div>
                </div>
            </Container>

        </footer>
    );
}