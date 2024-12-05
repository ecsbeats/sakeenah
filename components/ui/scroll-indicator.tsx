"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ScrollIndicator({ 
    className,
    containerRef
}: { 
    className?: string
    containerRef: React.RefObject<HTMLDivElement>
}) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768) // Adjust the breakpoint as needed
        }

        handleResize() // Check on mount
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const checkScroll = () => {
            const hasOverflow = container.scrollHeight > container.clientHeight
            setIsVisible(hasOverflow && !hasScrolled && isMobile)
        }

        const handleScroll = () => {
            setHasScrolled(true)
            setIsVisible(false)
        }

        checkScroll()
        container.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', checkScroll)

        return () => {
            container.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', checkScroll)
        }
    }, [containerRef, hasScrolled, isMobile])

    const handleClick = () => {
        if (!containerRef.current) return
        
        containerRef.current.scrollBy({
            top: 100,
            behavior: 'smooth'
        })
        setHasScrolled(true)
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <button
            onClick={handleClick}
            className={cn(
                "absolute bottom-4 left-1/2 transform -translate-x-1/2",
                "p-3 rounded-full bg-zinc-900/10 backdrop-blur-sm",
                "hover:bg-zinc-900/20 transition-colors",
                "animate-bounce cursor-pointer",
                "dark:bg-zinc-50/10 dark:hover:bg-zinc-50/20",
                className
            )}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-zinc-900/75 dark:text-zinc-50/75"
            >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
            </svg>
        </button>
    )
} 