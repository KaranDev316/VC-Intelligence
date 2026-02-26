"use client";

import React from "react";

type Props = {
  value: number;
  color?: string;
};

export function ProgressBar({ value, color }: Props) {
  const c = color || (value >= 70 ? "#22c55e" : value >= 40 ? "#f59e0b" : "#ef4444");
  return (
    <div
      style={{
        background: "#1e2130",
        borderRadius: 99,
        height: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          background: c,
          height: "100%",
          borderRadius: 99,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

