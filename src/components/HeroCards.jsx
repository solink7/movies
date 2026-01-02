const HeroCards = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto h-[300px] flex items-center justify-center mt-10">
            {/* Cards Container */}
            <div className="relative w-[180px] h-[260px] flex items-center justify-center">

                {/* Card 1: Film Reel (Left Fan) */}
                <div className="hero-card hero-card-back absolute inset-0 rounded-xl p-4 shadow-lg transform origin-bottom animate-fan-left">
                    <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-current rounded-lg opacity-90">
                        {/* Hand-drawn Film Reel SVG */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2.5V5.5" />
                            <path d="M12 18.5V21.5" />
                            <path d="M2.5 12H5.5" />
                            <path d="M18.5 12H21.5" />
                            <path d="M5.5 5.5L7.5 7.5" />
                            <path d="M16.5 16.5L18.5 18.5" />
                            <path d="M18.5 5.5L16.5 7.5" />
                            <path d="M7.5 16.5L5.5 18.5" />
                        </svg>
                        <span className="mt-4 font-handwriting text-lg tracking-wider">Classic</span>
                    </div>
                </div>

                {/* Card 2: Clapperboard (Right Fan) */}
                <div className="hero-card hero-card-back absolute inset-0 rounded-xl p-4 shadow-lg transform origin-bottom animate-fan-right">
                    <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-current rounded-lg opacity-90">
                        {/* Hand-drawn Clapperboard SVG */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                            <path d="M4 11V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11" />
                            <path d="M4 11H20" />
                            <path d="M4 7V11H20V7" />
                            <path d="M4 7L8 3L10 7L14 3L16 7L20 3V7" />
                        </svg>
                        <span className="mt-4 font-handwriting text-lg tracking-wider">Action</span>
                    </div>
                </div>

                {/* Card 3: Camera (Center Main) */}
                <div className="hero-card hero-card-front absolute inset-0 rounded-xl p-4 shadow-xl transform origin-bottom animate-fan-center z-10">
                    <div className="w-full h-full flex flex-col items-center justify-center border-2 border-current rounded-lg">
                        {/* Hand-drawn Camera SVG */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
                            <path d="M15 8V4H9V8" />
                            <rect x="2" y="8" width="20" height="12" rx="2" />
                            <circle cx="12" cy="14" r="3" />
                            <path d="M18 11H19" />
                        </svg>
                        <span className="mt-4 font-handwriting text-xl font-bold tracking-widest uppercase">Movie</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroCards;
