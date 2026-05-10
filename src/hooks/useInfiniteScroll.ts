import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  pageSize: number;
  loadDelay?: number;
}

export function useInfiniteScroll<T>({
  items = [],
  pageSize,
  loadDelay = 500
}: UseInfiniteScrollProps<T>) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const safeItems = items || [];
  const visibleItems = safeItems.slice(0, visibleCount);
  const hasMore = visibleCount < safeItems.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + pageSize, safeItems.length));
            setIsLoading(false);
          }, loadDelay);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, pageSize, safeItems.length, loadDelay]);

  return { visibleItems, isLoading, hasMore, observerRef };
}