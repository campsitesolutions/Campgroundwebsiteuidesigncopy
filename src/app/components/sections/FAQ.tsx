import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: 'What are your seasonal rates?',
      answer: 'Our seasonal rates start at $3,200 for the May 1 - October 31 season. This includes full hookups (30/50 amp electrical, water, and sewer), WiFi access, and all park amenities. Additional family members and pets may have small additional fees.',
    },
    {
      question: 'Do you allow pets?',
      answer: 'Yes! We are a pet-friendly campground. We welcome well-behaved dogs on leash. There is a $5 per night fee for pets, with a maximum of 2 pets per site. We have designated pet areas and ask that all owners clean up after their pets.',
    },
    {
      question: 'What amenities are included?',
      answer: 'All sites include full hookups (water, sewer, 30/50 amp electrical), free WiFi, access to modern washroom facilities, laundry, beach access, nature trails, playground, and camp store. Seasonal campers also receive priority booking for special events.',
    },
    {
      question: 'Can I buy a trailer through the campground?',
      answer: 'Yes! We have a selection of quality pre-owned trailers for sale. Many come with the option to purchase on a seasonal site. We also offer financing options and can help arrange delivery and setup. Contact us for current inventory.',
    },
    {
      question: 'Is there a minimum stay for overnight camping?',
      answer: 'Our minimum stay is one night for regular weekends. During peak season (Victoria Day, Canada Day, August long weekend), there is a 2-3 night minimum. We recommend booking in advance during peak times.',
    },
    {
      question: 'What are your check-in and check-out times?',
      answer: 'Check-in is at 2:00 PM and check-out is at 12:00 PM (noon) for overnight campers. Seasonal campers have 24/7 access to their sites with a key card system. Late check-out may be available upon request.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Have questions? We've got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg px-6 border border-gray-200"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
