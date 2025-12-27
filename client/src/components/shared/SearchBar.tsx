import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProductController } from "../../shared/controllers/ProductController";
import { Product } from "../../shared/models/types";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSearchChange?: (results: Product[]) => void;
  isMobile?: boolean;
}

export function SearchBar({ onSearchChange, isMobile = false }: SearchBarProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      ProductController.searchProducts(query).then((products) => {
        setResults(products);
        onSearchChange?.(products);
        setIsLoading(false);
      });
    } else {
      setResults([]);
      onSearchChange?.([]);
    }
  }, [query, onSearchChange]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-3 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={() => handleClear()}
                className="flex items-center gap-3 p-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {isOpen && query && results.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-4 text-center text-muted-foreground text-sm z-50">
            No products found for "{query}"
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-1 max-w-sm relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl:right-2.5 rtl:left-auto" />
      <Input
        type="search"
        placeholder={t("search")}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="pl-9 bg-muted/50 border-none focus-visible:ring-1 rtl:pr-9 rtl:pl-3"
        autoComplete="off"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-2.5 p-0 rtl:left-2.5 rtl:right-auto"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={() => handleClear()}
              className="flex items-center gap-3 p-3 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer last:border-b-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-3 text-center text-muted-foreground text-sm z-50">
          No results for "{query}"
        </div>
      )}
    </div>
  );
}
