"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Loader2 } from "lucide-react";
import { CandidateCard } from "./candidate-card";
import { SearchBar } from "./search-bar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RecruiterLoginButton } from "../recruiter-login-button";

interface Candidate {
  id: string;
  full_name: string;
  bio: string;
  location: string;
  years_of_experience: number;
  skills: string[];
  profile_picture_url: string | null;
}

interface CandidatesGridProps {
  initialCandidates: Candidate[];
  totalCount: number;
  initialSearchQuery: string;
  initialLocationFilter?: string;
  initialNationalityFilter?: string;
  initialExperienceFilter?: string;
  isPublicView?: boolean;
}

export function CandidatesGrid({
  initialCandidates,
  totalCount,
  initialSearchQuery,
  initialLocationFilter = "",
  initialNationalityFilter = "",
  initialExperienceFilter = "",
  isPublicView = false,
}: CandidatesGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [locationFilter, setLocationFilter] = useState(initialLocationFilter);
  const [nationalityFilter, setNationalityFilter] = useState(
    initialNationalityFilter
  );
  const [experienceFilter, setExperienceFilter] = useState(
    initialExperienceFilter
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCandidates.length < totalCount);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout>();

  // Track filter changes separately to properly manage observer lifecycle
  const prevFiltersRef = useRef({
    searchQuery,
    locationFilter,
    nationalityFilter,
    experienceFilter,
  });

  // Update URL when filters change
  useEffect(() => {
    // Disconnect observer immediately when filters change
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Clear any existing timeout
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    filterTimeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (searchQuery) params.set("search", searchQuery);
      if (locationFilter) params.set("location", locationFilter);
      if (nationalityFilter) params.set("nationality", nationalityFilter);
      if (experienceFilter) params.set("experience", experienceFilter);

      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }, 500);

    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [
    searchQuery,
    locationFilter,
    nationalityFilter,
    experienceFilter,
    router,
  ]);

  // Reset candidates when initial data changes (after server refetch)
  useEffect(() => {
    // Disconnect observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    setCandidates(initialCandidates);
    setHasMore(initialCandidates.length < totalCount);
    setIsLoading(false);
    isLoadingMoreRef.current = false;
  }, [initialCandidates, totalCount]);

  // Load more candidates
  const loadMore = async () => {
    if (isLoadingMoreRef.current || isLoading || !hasMore || isPublicView) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("offset", candidates.length.toString());
      if (searchQuery) params.set("search", searchQuery);
      if (locationFilter) params.set("location", locationFilter);
      if (nationalityFilter) params.set("nationality", nationalityFilter);
      if (experienceFilter) params.set("experience", experienceFilter);

      const response = await fetch(`/api/candidates/list?${params.toString()}`);
      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        setCandidates((prev) => [...prev, ...data.candidates]);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more candidates:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      isLoadingMoreRef.current = false;
    }
  };

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore || isPublicView) {
      return;
    }

    // Don't setup observer if we don't have the ref element yet
    if (!loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isPublicView, candidates.length]); // Only depend on hasMore, isPublicView, and candidates.length

  return (
    <>
      {!isPublicView && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          nationalityFilter={nationalityFilter}
          onNationalityChange={setNationalityFilter}
          experienceFilter={experienceFilter}
          onExperienceChange={setExperienceFilter}
        />
      )}

      {candidates.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "No candidates found" : "No candidates yet"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Check back soon as talented candidates complete their profiles!"}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isPublicView={isPublicView}
                onPublicClick={() => setShowLoginModal(true)}
              />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          {!isPublicView && (
            <div ref={loadMoreRef} className="mt-8 flex justify-center">
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more candidates...</span>
                </div>
              )}
              {!hasMore && candidates.length > 0 && (
                <p className="text-muted-foreground text-sm">
                  You've reached the end of the list
                </p>
              )}
            </div>
          )}

          {/* Manual load more button (fallback) */}
          {!isPublicView && hasMore && !isLoading && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={loadMore}
                variant="outline"
                size="lg"
                className="cursor-pointer"
              >
                Load More Candidates
              </Button>
            </div>
          )}
        </>
      )}

      {/* Login Modal for Public View */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Login Required
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              To view full candidate profiles and access contact information,
              please login as a recruiter.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <RecruiterLoginButton />
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowLoginModal(false)}
              className="cursor-pointer"
            >
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
