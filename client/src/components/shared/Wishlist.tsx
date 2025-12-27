import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface WishlistProps {
  productId: number;
  onToggle?: (isWishlisted: boolean) => void;
}

export function WishlistButton({ productId, onToggle }: WishlistProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleToggle = () => {
    setIsWishlisted(!isWishlisted);
    onToggle?.(!isWishlisted);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full transition-colors ${
        isWishlisted
          ? "border-primary bg-primary/10 text-primary"
          : "text-muted-foreground"
      }`}
      onClick={handleToggle}
      data-testid={`button-wishlist-${productId}`}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
    </Button>
  );
}
