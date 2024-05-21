"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <span onClick={handleCopy} className="cursor-pointer w-fit">
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
        </>
      ) : (
        <>
          <Clipboard className="w-4 h-4" />
        </>
      )}
    </span>
  );
}
