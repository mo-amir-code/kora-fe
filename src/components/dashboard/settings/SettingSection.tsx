"use client";

import React from "react";
import { SettingItem, SettingItemProps } from "./SettingItem";

interface SettingSectionProps {
  title: string;
  items: SettingItemProps[];
}

export const SettingSection = ({ title, items }: SettingSectionProps) => (
  <div className="space-y-1.5">
    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 px-4 mb-1">
      {title}
    </h2>
    <div className="space-y-0.5">
      {items.map((item) => (
        <SettingItem key={item.title} {...item} />
      ))}
    </div>
  </div>
);
