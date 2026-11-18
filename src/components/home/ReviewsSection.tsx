import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Carousel } from "@/components/common/Carousel";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { REVIEWS_DATA } from "@/data/reviews";
import { ArrowRight } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-[#ffffff]" id="reviews">
      <Container>
        <SectionHeading
          eyebrow="COMMUNITY STORIES"
          title="Traveller Reviews"
          subtitle="Real memories, unscripted moments, and unfiltered feedback from our 13,000+ member travel community."
          action={
            <Button
              href="/reviews"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Read All Reviews (4.9★)
            </Button>
          }
        />

        <Carousel itemClassName="w-[90%] sm:w-[50%] lg:w-[32%]">
          {REVIEWS_DATA.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};
