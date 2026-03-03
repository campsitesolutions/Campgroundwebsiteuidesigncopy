import { Home, Calendar, Waves } from 'lucide-react';

interface CottageRentalsHighlightProps {
  ctaPrimary?: string;
}

export function CottageRentalsHighlight({ ctaPrimary = "View Available Cottages" }: CottageRentalsHighlightProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-blue-600 rounded-full mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cozy Cottage Rentals for Weekend Escapes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enjoy a fully furnished stay with all the amenities of the park—perfect for short getaways or longer stays.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Fully Furnished Cottages
              </h3>
              <p className="text-gray-600">
                Move right in with complete kitchens, comfortable bedrooms, and cozy living spaces.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Flexible Nightly or Weekly Stays
              </h3>
              <p className="text-gray-600">
                Choose short weekend getaways or extended vacations—rent by the night or week.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Waves className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Steps from the Beach and Amenities
              </h3>
              <p className="text-gray-600">
                Enjoy waterfront access, pools, playgrounds, and all park facilities during your stay.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
              {ctaPrimary}
            </button>
          </div>

          {/* Info Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-sm text-amber-800">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="font-semibold">Seasonal + Cottage Rentals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
