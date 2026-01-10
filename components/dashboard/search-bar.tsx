"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, MapPin, Globe, Briefcase, UserCog } from "lucide-react";
import { countries } from "@/lib/countries";
import { professions } from "@/lib/professions";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  locationFilter?: string;
  onLocationChange?: (value: string) => void;
  nationalityFilter?: string;
  onNationalityChange?: (value: string) => void;
  experienceFilter?: string;
  onExperienceChange?: (value: string) => void;
  professionFilter?: string;
  onProfessionChange?: (value: string) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  locationFilter = "",
  onLocationChange,
  nationalityFilter = "",
  onNationalityChange,
  experienceFilter = "",
  onExperienceChange,
  professionFilter = "",
  onProfessionChange,
}: SearchBarProps) {
  const locale = useLocale();

  const EXPERIENCE_RANGES = [
    {
      label: getContent("dashboard.searchBar.experience.0-3", locale),
      value: "0-3",
    },
    {
      label: getContent("dashboard.searchBar.experience.4-8", locale),
      value: "4-8",
    },
    {
      label: getContent("dashboard.searchBar.experience.8-12", locale),
      value: "8-12",
    },
    {
      label: getContent("dashboard.searchBar.experience.13+", locale),
      value: "13+",
    },
  ];

  const hasActiveFilters =
    locationFilter || nationalityFilter || experienceFilter || professionFilter;

  const clearAllFilters = () => {
    onLocationChange?.("");
    onNationalityChange?.("");
    onExperienceChange?.("");
    onProfessionChange?.("");
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={getContent(
              "dashboard.searchBar.searchPlaceholder",
              locale
            )}
            className="pl-9 h-10 border-2"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap lg:flex-nowrap gap-2">
          {/* Location Filter */}
          <Select value={locationFilter} onValueChange={onLocationChange}>
            <SelectTrigger className="h-10 w-full lg:w-[160px] cursor-pointer border-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <SelectValue
                  placeholder={getContent(
                    "dashboard.searchBar.locationPlaceholder",
                    locale
                  )}
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              {EMIRATES.map((emirate) => (
                <SelectItem
                  key={emirate}
                  value={emirate}
                  className="cursor-pointer"
                >
                  {emirate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Nationality Filter */}
          <Select value={nationalityFilter} onValueChange={onNationalityChange}>
            <SelectTrigger className="h-10 w-full lg:w-[160px] cursor-pointer border-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <SelectValue
                  placeholder={getContent(
                    "dashboard.searchBar.nationalityPlaceholder",
                    locale
                  )}
                />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countries.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.name}
                  className="cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Experience Filter */}
          <Select value={experienceFilter} onValueChange={onExperienceChange}>
            <SelectTrigger className="h-10 w-full lg:w-[160px] cursor-pointer border-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <SelectValue
                  placeholder={getContent(
                    "dashboard.searchBar.experiencePlaceholder",
                    locale
                  )}
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_RANGES.map((range) => (
                <SelectItem
                  key={range.value}
                  value={range.value}
                  className="cursor-pointer"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Profession Filter */}
          <Select value={professionFilter} onValueChange={onProfessionChange}>
            <SelectTrigger className="h-10 w-full lg:w-[180px] cursor-pointer border-2">
              <div className="flex items-center gap-2 w-full min-w-0">
                <UserCog className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="truncate flex-1">
                  <SelectValue
                    placeholder={getContent(
                      "dashboard.searchBar.professionPlaceholder",
                      locale
                    )}
                  />
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {professions.map((profession) => (
                <SelectItem
                  key={profession}
                  value={profession}
                  className="cursor-pointer"
                >
                  {profession}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="h-10 px-3 cursor-pointer border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
            >
              <X className="w-4 h-4 mr-1" />
              {getContent("dashboard.searchBar.clearButton", locale)}
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {locationFilter && (
            <div className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{locationFilter}</span>
              <button
                onClick={() => onLocationChange?.("")}
                className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {nationalityFilter && (
            <div className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">
              <Globe className="w-3.5 h-3.5" />
              <span>{nationalityFilter}</span>
              <button
                onClick={() => onNationalityChange?.("")}
                className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {experienceFilter && (
            <div className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-medium">
              <Briefcase className="w-3.5 h-3.5" />
              <span>
                {
                  EXPERIENCE_RANGES.find((r) => r.value === experienceFilter)
                    ?.label
                }
              </span>
              <button
                onClick={() => onExperienceChange?.("")}
                className="ml-1 hover:bg-primary/20 rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
