import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
    // Detect theme changes by observing the html data-theme attribute
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Initial detection
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(initialTheme);

        // Observer for mutations on the html element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                    const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                    setTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const darkOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2, // Subtle links for dark mode
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce", // Bounce off canvas edges
                },
                random: true,
                speed: 1, // Slow movement
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 60, // Minimal count
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
        detectRetina: true,
    };

    const lightOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab", // Different interaction for light mode
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 0.5
                    }
                }
            },
        },
        particles: {
            color: {
                value: "#4b5563", // Dark gray particles
            },
            links: {
                color: "#9ca3af",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1.5, // Slightly faster for "airiness"
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 50, // Fewer particles for visual cleanliness
            },
            opacity: {
                value: 0.4,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={theme === 'dark' ? darkOptions : lightOptions}
            className="absolute inset-0 z-0 pointer-events-none" // Ensure it stays in background
            style={{
                // React-tsparticles sometimes needs explicit style to stay behind
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}
        />
    );
};

export default ParticlesBackground;
