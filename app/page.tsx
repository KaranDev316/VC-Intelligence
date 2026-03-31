"use client";

import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { LandingPage } from "../components/homepage/LandingPage";

export default function Page() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <AppShell />;
  }

  return <LandingPage onEnterApp={() => setShowApp(true)} />;
}

