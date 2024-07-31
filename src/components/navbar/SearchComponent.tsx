import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ListProduct } from "@/types/listProduct";

const SearchComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ListProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const searchResults = await response.json();
      setResults(searchResults);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setQuery("");
    setResults([]);
    setError(null);
  };

  const renderProducts = (products: ListProduct[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-zinc-950 border-zinc-900 p-2">
          <img src={product.image} alt={product.name} className="w-full h-[231px] object-cover rounded-md" />
          <p className="text-white text-lg">{product.name}</p>
          <p className="text-white text-sm">{product.price}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>
          <FaSearch />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] max-w-6xl h-[90vh] mx-auto overflow-y-auto p-4 custom-scrollbar">
        <DialogHeader>
          <div className="flex flex-row w-full">
            <Input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow ml-2"
            />
            <Button onClick={handleSearch} className="ml-2 transition-colors" disabled={loading}>
              <FaSearch />
            </Button>
            <Button onClick={handleCloseDialog} className="ml-2 transition-colors">
              <FaTimes />
            </Button>
          </div>
        </DialogHeader>
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array(10).fill(0).map((_, index) => (
                <div key={index} className="p-2">
                  <Skeleton className="h-[231px] rounded-md" />
                </div>
              ))}
            </div>
          )}
          {!loading && results.length === 0 && query.trim() === '' && (
            <p className="text-white text-lg">Start typing to search for products...</p>
          )}
          {!loading && results.length > 0 && (
            <>
              <p className="text-white text-lg">Search Results for {query}</p>
              {renderProducts(results)}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComponent;
