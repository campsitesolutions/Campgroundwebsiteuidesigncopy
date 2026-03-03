import { Star } from 'lucide-react';

export function Reviews() {
  // Define all reviews - always show first 3
  const reviews = [
    {
      name: 'Sarah Johnson',
      location: 'Toronto, ON',
      rating: 5,
      text: "We've been seasonal campers here for 3 years and it's been amazing. The staff is friendly, the sites are well-maintained, and the community is wonderful. Highly recommend!",
    },
    {
      name: 'Mike Patterson',
      location: 'Ottawa, ON',
      rating: 5,
      text: 'Perfect spot for our family getaways. The kids love the beach and playground. Clean facilities and beautiful grounds. We keep coming back!',
    },
    {
      name: 'Linda Chen',
      location: 'Mississauga, ON',
      rating: 5,
      text: 'Bought our trailer here last year and got a seasonal site. Best decision ever! Great value and the location is unbeatable. Love being part of this community.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it—hear from our happy campers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
              <div>
                <p className="font-bold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}