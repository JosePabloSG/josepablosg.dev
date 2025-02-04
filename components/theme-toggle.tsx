"use client"

import { useMounted } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { MoonStar, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
  const isMounted = useMounted()
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  if (!isMounted) return null

  return (
    <button
      className="cancel-drag flex h-10 w-20 items-center rounded-full bg-gray-200 focus:outline-hidden lg:h-12 lg:w-24"
      onClick={handleToggle}
      aria-label="theme-toggle"
    >
      <motion.div
        className={cn(
          `flex size-10 items-center justify-center rounded-full border-2 border-gray-200 text-white lg:size-12 lg:border-4`,
          theme === "dark" ? "bg-dark-700" : "bg-yellow-500",
        )}
        animate={{
          x: theme === "dark" ? "100%" : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1], 
            }}
          >
            {theme === "dark" ? <MoonStar /> : <Sun />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  )
}

