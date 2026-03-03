import { Star } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export function Reviews() {
  const { wizardData } = useWizard();
  
  // Compute allowed models
  const allowedModels = new Set<string>();
  if (wizardData.primaryBusinessModel) {
    allowedModels.add(wizardData.primaryBusinessModel);
  }
  wizardData.secondaryBusinessModels.forEach(model => allowedModels.add(model));
  
  // Define all reviews with their associated models
  const allReviews = [
    {
      models: ['seasonal', 'overnight', 'cottage-rentals'],
      name: 'Sarah Johnson',
      location: 'Toronto, ON',
      rating: 5,
      text: "We've been seasonal campers here for 3 years and it's been amazing. The staff is friendly, the sites are well-maintained, and the community is wonderful. Highly recommend!",
    },
    {
      models: ['overnight', 'seasonal'],
      name: 'Mike Patterson',
      location: 'Ottawa, ON',
      rating: 5,
      text: 'Perfect spot for our family getaways. The kids love the beach and playground. Clean facilities and beautiful grounds. We keep coming back!',
    },
    {
      models: ['trailer-sales', 'seasonal'],
      name: 'Linda Chen',
      location: 'Mississauga, ON',
      rating: 5,
      text: 'Bought our trailer here last year and got a seasonal site. Best decision ever! Great value and the location is unbeatable. Love being part of this community.',
    },
    {
      models: ['seasonal'],
      name: 'Robert Martinez',
      location: 'Hamilton, ON',
      rating: 5,
      text: 'Our home away from home for the past 5 summers. The community events are fantastic, and having a seasonal site means we can escape the city whenever we want. Worth every penny!',
    },
    {
      models: ['overnight', 'cottage-rentals'],
      name: 'Emily White',
      location: 'London, ON',
      rating: 5,
      text: 'Amazing family camping experience! The amenities are top-notch, and the staff goes above and beyond. Our kids are already asking when we can come back!',
    },
    {
      models: ['cottage-rentals'],
      name: 'David Lee',
      location: 'Kitchener, ON',
      rating: 5,
      text: 'The cottage rental was perfect - clean, cozy, and fully equipped. Beautiful location with great hiking trails nearby. Exactly what we needed for a relaxing getaway.',
    },
  ];
  
  // Filter reviews based on allowed models
  const reviews = allReviews.filter(review => 
    review.models.some(model => allowedModels.has(model))
  ).slice(0, 3); // Take only first 3 matching reviews
  
  // If no reviews match, use generic ones
  if (reviews.length === 0) {
    return null;
  }

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