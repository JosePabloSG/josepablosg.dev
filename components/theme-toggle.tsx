"use client";

import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Variants for the sliding container.
 *
 * @constant {object}
 */
const containerVariants = {
  dark: { x: "100%" },
  light: { x: 0 },
};

/**
 * Variants for the icon animations.
 *
 * @constant {object}
 */
const iconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.5 },
};

/**
 * ThemeToggle component that toggles between dark and light themes.
 *
 * Uses framer-motion for animations and includes layering for complex animations.
 *
 * @component
 * @example
 * return <ThemeToggle />;
 */
export default function ThemeToggle() {
  const isMounted = useMounted();
  const { theme, setTheme } = useTheme();

  /**
   * Toggles the current theme between dark and light.
   *
   * @function handleToggle
   */
  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!isMounted) return null;

  return (
    <button
      className="cancel-drag flex h-10 w-20 cursor-pointer items-center rounded-full bg-gray-200 focus:outline-hidden lg:h-12 lg:w-24"
      onClick={handleToggle}
      aria-label="theme-toggle"
    >
      <motion.div
        className={cn(
          "flex size-10 items-center justify-center rounded-full border-2 border-gray-200 text-white lg:size-12 lg:border-4",
          theme === "dark" ? "bg-dark-700" : "bg-yellow-500"
        )}
        variants={containerVariants}
        animate={theme}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
      >
        {/* Layering: Relative container to show two animation layers */}
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Back Layer: Static layer that can be expanded for complex animations */}
          <motion.div
            className="absolute inset-0"
            variants={{
              initial: { opacity: 0.5, scale: 1 },
              animate: { opacity: 0.5, scale: 1 },
              exit: { opacity: 0.5, scale: 1 },
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Front Layer: Animated icon wrapped with AnimatePresence */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {theme === "dark" ? <MoonStar /> : <Sun />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </button>
  );
}

