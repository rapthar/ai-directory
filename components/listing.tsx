"use client";

import Link from "next/link";
import {
  Search,
  Loader2,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  PlusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Agency } from "@/lib/types";
import { useTranslations } from "next-intl";

interface FetchResponse {
  agencies: Agency[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
}

export default function Listing() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const resultsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const fetchAgencies = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: pageNum.toString(),
          ...(debouncedSearch && { query: debouncedSearch }),
          ...(selectedCategory && { category: selectedCategory }),
        });

        const response = await fetch(`/api/agencies/search?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch agencies");
        }

        const data: FetchResponse = await response.json();

        setAgencies((prev) =>
          isNewSearch ? data.agencies : [...prev, ...data.agencies]
        );
        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching agencies:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearch, selectedCategory]
  );

  useEffect(() => {
    const fetchTopSkills = async () => {
      try {
        const response = await fetch("/api/agencies/top-skills");
        if (!response.ok) {
          throw new Error("Failed to fetch top skills");
        }
        const data = await response.json();
      } catch (err) {
        console.error("Error fetching top skills:", err);
      }
    };

    fetchTopSkills();
  }, []);

  // Reset and fetch when search or category changes
  useEffect(() => {
    setPage(1);
    setAgencies([]);
    fetchAgencies(1, true);
  }, [debouncedSearch, selectedCategory, fetchAgencies]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAgencies(nextPage);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);

    // Scroll to results with a slight delay to allow for data loading
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="py-12 px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-white">
            {t("listings.agencies")}
          </h1>
          <span className="text-gray-400">
            {t("listings.neural-networks")}
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative w-64 flex-shrink-0">
            <Input
              type="text"
              placeholder={t("listings.location-placeholder")}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-gray-50/5 text-white placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-white border-gray-700">
              {t("listings.services")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-white border-gray-700">
              {t("listings.budget")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-white border-gray-700">
              {t("listings.hourly-rate")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-white border-gray-700">
              {t("listings.industry")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-white border-gray-700">
              {t("listings.reviews")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="p-2.5 rounded-lg bg-gray-50/5 hover:bg-gray-50/10">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
            <Link href="#" className="flex items-center gap-2 text-blue-500 hover:text-blue-400">
              {t("listings.clear-all")}
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t("listing.errorTitle")}</h3>
              <p className="text-gray-400 mb-4">{t("listing.errorDescription")}</p>
              <Button onClick={() => fetchAgencies(1, true)} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("common.tryAgain")}
              </Button>
            </div>
          ) : agencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">{t("listings.emptyStateTitle")}</h3>
                <p className="text-xl text-primary mb-4">{t("listings.emptyStateSubtitle")}</p>
                <p className="text-gray-400 mb-6">{t("listings.emptyStateDescription")}</p>
                <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                  <Link href="/create">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    {t("listings.listAgency")}
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-4 text-white">{t("listing.name")}</th>
                    <th className="pb-4 text-white">{t("listing.price")}</th>
                    <th className="pb-4 text-white">{t("listing.hourlyRate")}</th>
                    <th className="pb-4 text-white">{t("listing.employees")}</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((agency, index) => (
                    <tr key={agency.id} className="border-b border-gray-800">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {agency.title.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{agency.title}</h3>
                              <span className="text-sm text-gray-400">{agency.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-white">{agency.rating}</span>
                              <span className="text-sm text-gray-400">({agency.reviews} Reviews)</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-white">$100,000+</td>
                      <td className="text-white">$50 - $99 / hr</td>
                      <td className="text-white">1,000 - 9,999</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button className="p-2 border border-gray-800 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <Link
                            href={`/agency/${agency.id}`}
                            className="p-2 border border-gray-800 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    disabled={isLoading}
                    className="min-w-[200px]"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      t("common.loadMore")
                    )}
                  </Button>
                </div>
              )}

              {!hasMore && agencies.length > 0 && (
                <p className="text-center text-gray-400 mt-8">
                  {t("listings.endOfListMessage")}
                </p>
              )}
            </>
          )}
        </div>

        {/* Loading and error states */}
        {/* {isLoading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center pb-12 px-4">
            <div className="rounded-full bg-red-100/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-500">
              {t("listings.errorTitle")}
            </h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              {t("listings.errorDescription")}
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setError(null);
                fetchAgencies(page, true);
              }}
              className="gap-2 hover:bg-white hover:text-black transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {t("listings.tryAgain")}
            </Button>
          </div>
        )} */}

        {/* {!isLoading && agencies.length === 0 && (
          <div className="container mx-auto px-4 py-6 bg-black rounded-lg">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative max-w-full overflow-hidden">
                <Image
                  src="/launch.svg"
                  alt="Agency collaboration illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>

              <div className="max-w-xl">
                <h1 className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 ">
                  <span className="text-white">{t("listings.emptyStateTitle")}</span>
                  <br />
                  {t("listings.emptyStateSubtitle")}
                </h1>
                <p className="mt-4 text-xl">{t("listings.emptyStateDescription")}</p>
                <div className="mt-8">
                  <Link href={`/${locale}/create`}>
                    <Button
                      size="lg"
                      className="flex items-center bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>{t("listings.listAgency")}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* {!isLoading && hasMore && agencies.length > 0 && (
          <div className="flex justify-center py-4">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {t("listings.loadMoreAgencies")}
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </div>
        )} */}

        {/* {!isLoading && !hasMore && agencies.length > 0 && (
          <div className="space-y-6 py-8">
            <div className="text-center space-y-4">
              <p className="text-gray-500">{t("listings.endOfListMessage")}</p>
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                  onClick={() => router.push(`/${locale}/create`)}
                >
                  <Plus className="h-4 w-4" />
                  {t("listings.addYourAgency")}
                </Button>

                <Sharer />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
