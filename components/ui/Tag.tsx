"use client";

import React from "react";

type Props = {
  label: string;
  color?: string;
};

export function Tag({ label, color }: Props) {
  return (
    <span
      style={{
        background: (color || "#334155") + "55",
        color: color || "#94a3b8",
        border: `1px solid ${(color || "#334155") + "44"}`,
        borderRadius: 5,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 0.3,
      }}
    >
      {label}
    </span>
  );
}

