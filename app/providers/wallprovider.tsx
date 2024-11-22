"use client";

import clsx from "clsx";
import React from "react";

export const WallProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className={clsx("")}>{children}</div>;
};
