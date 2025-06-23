// src\hooks\useInfiniteScroll.tsx

import { useEffect } from 'react';

type UseInfiniteScrollParams = {
  targetRef: React.RefObject<HTMLElement | null>;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  debounceMs?: number;
};

export function useInfiniteScroll({
  targetRef,
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.1,
  debounceMs = 300,
}: UseInfiniteScrollParams) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: carrega manualmente se não há suporte
      const interval = setInterval(() => {
        if (!loading && hasMore) {
          onLoadMore();
        }
      }, 2000);

      return () => clearInterval(interval);
    }

    let debounceTimer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            onLoadMore();
          }, debounceMs);
        }
      },
      { threshold }
    );

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      clearTimeout(debounceTimer);
      if (current) observer.unobserve(current);
    };
  }, [targetRef, hasMore, loading, onLoadMore, threshold, debounceMs]);
}
