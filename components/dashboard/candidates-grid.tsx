"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Loader2 } from "lucide-react";
import { CandidateCard } from "./candidate-card";
import { SearchBar } from "./search-bar";

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
}

export function CandidatesGrid({
  initialCandidates,
  totalCount,
  initialSearchQuery,
}: CandidatesGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialCandidates.length < totalCount);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounced search handler
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== initialSearchQuery) {
        // Update URL with search query
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
          params.set("search", searchQuery);
        } else {
          params.delete("search");
        }
        router.push(`?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, initialSearchQuery, router, searchParams]);

  // Reset candidates when search changes (server will handle new results)
  useEffect(() => {
    setCandidates(initialCandidates);
    setHasMore(initialCandidates.length < totalCount);
  }, [initialCandidates, totalCount]);

  // Load more candidates
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("offset", candidates.length.toString());
      if (searchQuery) {
        params.set("search", searchQuery);
      }

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
    } finally {
      setIsLoading(false);
    }
  }, [candidates.length, searchQuery, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          {/* Infinite scroll trigger */}
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

          {/* Manual load more button (fallback) */}
          {hasMore && !isLoading && (
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
    </>
  );
}
