import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    text: "Absolutely love this product! Exceeded my expectations in every way.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    author: "James L.",
    rating: 4,
    text: "Great quality, though delivery took a bit longer than expected.",
    date: "1 month ago"
  },
  {
    id: 3,
    author: "Emma R.",
    rating: 5,
    text: "Premium quality and excellent customer service. Highly recommend!",
    date: "2 months ago"
  }
];

export function ReviewSection() {
  const avgRating = (MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1);

  return (
    <div className="space-y-8 pt-8 border-t border-border">
      <div>
        <div className="flex items-center gap-6 mb-6">
          <div>
            <div className="text-5xl font-bold text-foreground">{avgRating}</div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(parseFloat(avgRating))
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{MOCK_REVIEWS.length} reviews</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {review.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
