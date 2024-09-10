"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          x: -100,
        }}
        animate={{
          x: visible ? 32 : -10,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed z-[5000] top-1/2 left-0 transform -translate-y-1/2 px-5 py-5 rounded-lg border border-black/.1 shadow-[0px_2px3px-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] space-y-6 flex flex-col items-start",
          className
        )}
        style={{
          backdropFilter: "blur(5px) saturate(0%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          width: "auto", // Width adjusts to content
          height: "auto", // Height adjusts to content
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={idx}
            href={navItem.link}
            className={cn(
              " relative flex items-center space-x-2 text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-500",
              {
                "justify-center": !expanded,
                "justify-start": expanded,
              }
            )}
          >
            <span className={cn("block", { "mr-2": expanded })}>
              {navItem.icon}
            </span>
            {expanded && (
              <span className="text-sm text-zinc-50 !cursor-pointer pr-2">{navItem.name}</span>
            )}
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
