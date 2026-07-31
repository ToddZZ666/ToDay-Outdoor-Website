import type { Product } from '../types';

export const rivieraDiningTable: Product = {
  slug: 'riviera-dining-table',
  category: 'dining',
  categoryName: 'Dining Set',
  name: 'Riviera Dining Table',
  shortDescription:
    'An expansive teak dining table designed for gatherings under the open sky. The Riviera brings effortless elegance to al fresco dining.',
  price: 1490,
  priceFrom: true,
  currency: 'USD',
  status: 'active',

  gallery: [
    { id: 'g01', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop', alt: 'Riviera Dining Table — main view', isHero: true, order: 1 },
    { id: 'g02', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85&auto=format&fit=crop', alt: 'Riviera Dining Table — setting', order: 2 },
    { id: 'g03', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=900&q=85&auto=format&fit=crop', alt: 'Riviera Dining Table — detail', order: 3 },
  ],

  colorOptions: [
    { name: 'Teak', hex: '#B8956A' },
    { name: 'Natural', hex: '#D4C5B0' },
  ],

  configurations: [
    { label: '6-Seater (180cm)', value: '6-seater' },
    { label: '8-Seater (220cm)', value: '8-seater' },
    { label: '10-Seater (280cm)', value: '10-seater' },
  ],

  story: {
    eyebrow: 'Our Story',
    title: 'Designed for Gathering.',
    description:
      'The Riviera Dining Table is crafted from FSC-certified teak, selected for its natural resilience and warm golden hue. Each piece is precision-milled and assembled by hand, ensuring a surface that will host countless meals and memories.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85&auto=format&fit=crop',
  },

  features: [
    { icon: 'water', title: 'Weather Resistant', description: 'Solid teak naturally resists moisture, rot, and insects.' },
    { icon: 'cushion', title: 'Generous Proportions', description: 'Ample surface area for family-style dining and entertaining.' },
    { icon: 'craft', title: 'Artisan Crafted', description: 'Hand-finished teak with visible grain and precision joinery.' },
    { icon: 'leaf', title: 'Low Maintenance', description: 'Teak weathers naturally to a beautiful silver patina over time.' },
  ],

  materialHighlights: [
    { title: 'FSC-Certified Teak', description: 'Sustainably sourced teak with rich grain and natural oils for durability.', image: 'https://images.unsplash.com/photo-1546414603-0c4a451d1e44?w=600&q=80&auto=format&fit=crop' },
    { title: 'Stainless Steel Hardware', description: 'Marine-grade hardware ensures rust resistance in any climate.', image: 'https://images.unsplash.com/photo-1622359419133-e7bc34190c1f?w=600&q=80&auto=format&fit=crop' },
    { title: 'Precision Joinery', description: 'Mortise-and-tenon construction for lasting structural integrity.', image: 'https://images.unsplash.com/photo-1572972983197-0248a3181829?w=600&q=80&auto=format&fit=crop' },
  ],

  specifications: [
    { label: 'Overall Dimensions', value: 'W 180cm × D 100cm × H 75cm' },
    { label: 'Table Thickness', value: '5cm' },
    { label: 'Materials', value: 'FSC-Certified Teak, Stainless Steel' },
    { label: 'Weight', value: '45kg' },
    { label: 'Assembly', value: 'Minimal Assembly Required' },
    { label: 'Warranty', value: '5 Year Limited Warranty' },
  ],

  dimensions: { overallWidth: 180, overallDepth: 100, overallHeight: 75, seatHeight: 0, weight: 45 },

  relatedProducts: [
    { slug: 'coastal-sectional-sofa' },
    { slug: 'nordic-lounge-chair' },
    { slug: 'cypress-coffee-table' },
    { slug: 'granite-fire-pit-table' },
  ],

  seo: {
    title: 'Riviera Dining Table — ToDay Outdoor Living',
    description: 'An expansive teak dining table designed for gatherings under the open sky.',
    keywords: ['dining table', 'teak', 'outdoor dining', 'patio furniture'],
  },
};