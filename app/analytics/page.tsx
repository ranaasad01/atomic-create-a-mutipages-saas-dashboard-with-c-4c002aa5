"use client";

import { useState, useEffect } from "react";

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setCollapsed((c) => !c);
  const toggleMobile = () => setMobileOpen((o) => !o);
  const closeMobile = () => setMobileOpen(false);

  return { collapsed, toggle, mobileOpen, toggleMobile, closeMobile };
}
