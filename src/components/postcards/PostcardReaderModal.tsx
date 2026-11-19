"use client";

import React, { useEffect } from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X, ArrowRight } from "lucide-react";
import { Postcard } from "@/types";
import { normalizePostcardImg } from "./AttractionCard";
import Link from "next/link";

export interface PostcardReaderModalProps {
  postcard: Postcard;
  onClose: () => void;
}

export const PostcardReaderModal: React.FC<PostcardReaderModalProps> = ({
  postcard,
  onClose,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const imgSrc = normalizePostcardImg(postcard.image_url);
  const authorAvatar = postcard.author_avatar ? normalizePostcardImg(postcard.author_avatar) : null;
  const authorName = postcard.author || "Team Trail Explorers";
  const readTime = postcard.read_time || "5 min read";

  // Parse markdown-style headings in content
  const renderContent = (content?: string) => {
    if (!content) {
      return (
        <p className="text-base text-[#3d3d36] leading-relaxed">
          A captivating field report documenting genuine high-altitude experiences across the Indian Himalayas. Trail Explorers champions conscious, slow-paced exploration and authentic human connection.
        </p>
      );
    }

    const sections = content.split("\n\n");
    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-lg sm:text-xl font-bold text-[#14140f] mt-6 mb-2">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#14140f] mt-7 mb-3">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("---")) {
        return <hr key={idx} className="my-6 border-gray-200" />;
      }

      // Check if it's a markdown table
      if (trimmed.includes("|") && trimmed.includes("\n")) {
        const rows = trimmed.split("\n").filter((r) => r.trim().startsWith("|"));
        if (rows.length >= 2) {
          return (
            <div key={idx} className="overflow-x-auto my-4">
              <table className="w-full text-left text-sm border-collapse border border-gray-200 rounded-lg">
                <tbody>
                  {rows.map((row, rIdx) => {
                    const cols = row.split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1);
                    if (row.includes("---")) return null;
                    return (
                      <tr key={rIdx} className={rIdx === 0 ? "bg-gray-50 font-bold" : "border-t border-gray-100"}>
                        {cols.map((col, cIdx) => (
                          <td key={cIdx} className="p-2.5 sm:p-3 text-xs sm:text-sm">
                            {col.trim().replace(/\*\*/g, "")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-[#3d3d36] leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={postcard.title}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 touch-none overscroll-contain transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-t-[28px] sm:rounded-2xl max-w-2xl sm:max-w-3xl w-full p-5 sm:p-8 relative border-t-2 sm:border-2 border-[#14140f] max-h-[90dvh] sm:max-h-[calc(100dvh-40px)] overflow-y-auto overscroll-contain touch-pan-y shadow-2xl pb-[calc(20px+env(safe-area-inset-bottom,0px))] sm:pb-8">
        {/* Mobile drag handle */}
        <div className="w-10 h-1 bg-[#d5d5cd] rounded-full mx-auto mb-3 block sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center bg-[#f6f6f1] hover:bg-[#d6ff3f] active:scale-95 rounded-full transition-all cursor-pointer z-20"
          aria-label="Close story reader"
        >
          <X className="w-5 h-5 text-[#14140f]" />
        </button>

        {/* Category Badge */}
        <span className="text-xs font-bold uppercase tracking-wider text-[#d6ff3f] bg-[#14140f] px-3.5 py-1 rounded-full inline-block mb-3.5">
          {postcard.category || "Himalayan Story"}
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14140f] mb-3 leading-tight font-heading">
          {postcard.title}
        </h2>

        {/* Subtitle */}
        {postcard.subtitle && (
          <p className="text-sm sm:text-base text-[#6b6b63] mb-4 font-medium italic leading-relaxed">
            {postcard.subtitle}
          </p>
        )}

        {/* Author Info */}
        {postcard.category !== "Attraction" && (
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-100">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-7 h-7 rounded-full object-cover border border-[#e2e2dc]"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#d6ff3f] text-[#14140f] flex items-center justify-center font-bold text-xs">
                ✦
              </div>
            )}
            <span className="text-xs sm:text-sm font-semibold text-[#6b6b63]">
              {authorName} · {readTime}
            </span>
          </div>
        )}

        {/* Large Hero Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#f6f6f1]">
          <SkeletonImage
            src={imgSrc}
            alt={postcard.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            skeletonClassName="rounded-2xl"
          />
        </div>

        {/* Body Text */}
        <div className="article-body text-[#14140f]">
          {renderContent(postcard.content)}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/community-trips"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#14140f] hover:underline"
          >
            <span>Explore All Himalayan Expeditions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#14140f] text-white text-xs sm:text-sm font-bold hover:bg-[#2a2a22] transition-colors cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
