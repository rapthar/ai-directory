"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export default function BuyMeCoffeeButton() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => window.open("https://www.buymeacoffee.com/rapthar", "_blank")}
    >
      <Coffee className="h-4 w-4" />
      Buy me a coffee
    </Button>
  );
}
