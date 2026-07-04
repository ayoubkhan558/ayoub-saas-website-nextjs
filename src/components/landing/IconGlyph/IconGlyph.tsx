"use client";

import { Icon } from "@iconify/react";
import arrowLeft from "@iconify/icons-lucide/arrow-left";
import arrowRight from "@iconify/icons-lucide/arrow-right";
import badgeCheck from "@iconify/icons-lucide/badge-check";
import check from "@iconify/icons-lucide/check";
import code2 from "@iconify/icons-lucide/code-2";
import database from "@iconify/icons-lucide/database";
import download from "@iconify/icons-lucide/download";
import externalLink from "@iconify/icons-lucide/external-link";
import gauge from "@iconify/icons-lucide/gauge";
import github from "@iconify/icons-lucide/github";
import globe2 from "@iconify/icons-lucide/globe-2";
import graduationCap from "@iconify/icons-lucide/graduation-cap";
import imageIcon from "@iconify/icons-lucide/image";
import layers from "@iconify/icons-lucide/layers";
import linkedin from "@iconify/icons-lucide/linkedin";
import lockKeyhole from "@iconify/icons-lucide/lock-keyhole";
import mail from "@iconify/icons-lucide/mail";
import menu from "@iconify/icons-lucide/menu";
import messageCircle from "@iconify/icons-lucide/message-circle";
import monitor from "@iconify/icons-lucide/monitor";
import moon from "@iconify/icons-lucide/moon";
import phone from "@iconify/icons-lucide/phone";
import penTool from "@iconify/icons-lucide/pen-tool";
import rocket from "@iconify/icons-lucide/rocket";
import search from "@iconify/icons-lucide/search";
import shieldCheck from "@iconify/icons-lucide/shield-check";
import shoppingCart from "@iconify/icons-lucide/shopping-cart";
import shuffle from "@iconify/icons-lucide/shuffle";
import sparkles from "@iconify/icons-lucide/sparkles";
import star from "@iconify/icons-lucide/star";
import sun from "@iconify/icons-lucide/sun";
import users from "@iconify/icons-lucide/users";
import x from "@iconify/icons-lucide/x";

const iconMap = {
  arrowLeft,
  arrowRight,
  badgeCheck,
  cart: shoppingCart,
  check,
  code: code2,
  code2,
  database,
  download,
  externalLink,
  gauge,
  github,
  globe: globe2,
  "graduation-cap": graduationCap,
  image: imageIcon,
  layers,
  linkedin,
  lock: lockKeyhole,
  mail,
  menu,
  messageCircle,
  monitor,
  moon,
  "pen-tool": penTool,
  phone,
  rocket,
  search,
  shield: shieldCheck,
  shieldCheck,
  shoppingCart,
  shuffle,
  sparkles,
  star,
  sun,
  users,
  x,
};

export type IconName = keyof typeof iconMap;

export function IconGlyph({ name, className = "" }: { name: IconName | string; className?: string }) {
  const icon = iconMap[name as IconName] ?? sparkles;

  return <Icon icon={icon} className={className} aria-hidden="true" />;
}
