"use client"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // To ensure the component is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div>
      <Button variant={"destructive"} className="rounded-lg m-1"  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
        {theme == "dark" ? "light" : "dark"}
      </Button>
    </div>
  );
}
