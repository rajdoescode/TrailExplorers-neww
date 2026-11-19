import type { Metadata } from "next";
import { NotFoundView } from "@/components/common/NotFoundView";

export const metadata: Metadata = {
  title: "Page Not Found — Trail Explorers",
  description: "Error 404 · Off the map. This page doesn't exist. Maybe the link is old, or the road got washed out.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Explicit404Page() {
  return <NotFoundView />;
}
