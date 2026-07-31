import type { Product } from '../types';

export const graniteFirePitTable: Product = {
  slug: 'granite-fire-pit-table',
  category: 'firepit',
  categoryName: 'Fire Pit Table',
  name: 'Granite Fire Pit Table',
  shortDescription: 'A contemporary fire pit table that brings warmth and conversation to your outdoor evenings.',
  price: 1899,
  currency: 'USD',
  status: 'active',

  gallery: [
    { id: 'g01', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&auto=format&fit=crop', alt: 'Granite Fire Pit Table — main view', isHero: true, order: 1 },
    { id: 'g02', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop', alt: 'Granite Fire Pit Table — setting', order: 2 },
    { id: 'g03', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85&auto=format&fit=crop', alt: 'Granite Fire Pit Table — detail', order: 3 },
  ],

  colorOptions: [
    { name: 'Charcoal', hex: '#3D3D3D' },
    { name: 'Sage', hex: '#A8B5A0' },
    { name: 'Natural', hex: '#D4C5B0' },
  ],

  configurations: [
    { label: 'Propane (Standard)', value: 'propane' },
    { label: 'Natural Gas', value: 'natural-gas' },
  ],

  story: {
    eyebrow: 'Our Story',
    title: 'Warmth Meets Design.',
    description:
      'The Granite Fire Pit Table is a sculptural centerpiece that extends the outdoor season into cooler evenings. Its clean silhouette and hand-finished concrete surface anchor the space while the flame creates a natural gathering point.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85&auto=format&fit=crop',
  },

  features: [
    { icon: 'water', title: 'All-Weather Construction', description: 'Engineered concrete and powder-coated steel withstand the elements.' },
    { icon: 'cushion', title: 'Clean Burn', description: 'Low-emission propane or natural gas burner with realistic flame effect.' },
    { icon: 'craft', title: 'Minimalist Silhouette', description: 'Clean lines that complement both modern and traditional settings.' },
    { icon: 'leaf', title: 'Easy Operation', description: 'Electronic ignition with adjustable flame control.' },
  ],

  materialHighlights: [
    { title: 'Engineered Concrete', description: 'Weather-resistant concrete with a smooth, matte finish.', image: 'https://images.unsplash.com/photo-1582223759902-127bcfb92d6e?w=600&q=80&auto=format&fit=crop' },
    { title: 'Stainless Steel Burner', description: 'Marine-grade 304 stainless steel for long-lasting performance.', image: 'https://images.unsplash.com/photo-1622359419133-e7bc34190c1f?w=600&q=80&auto=format&fit=crop' },
    { title: 'Lava Rock Fill', description: 'Natural lava rock distributes heat evenly and conceals the burner.', image: 'https://images.unsplash.com/photo-1572972983197-0248a3181829?w=600&q=80&auto=format&fit=crop' },
  ],

  specifications: [
    { label: 'Overall Dimensions', value: 'W 110cm × D 110cm × H 45cm' },
    { label: 'Materials', value: 'Engineered Concrete, Stainless Steel, Lava Rock' },
    { label: 'BTU Output', value: '60,000 BTU' },
    { label: 'Weight', value: '68kg' },
    { label: 'Fuel', value: 'Propane or Natural Gas' },
    { label: 'Warranty', value: '5 Year Limited Warranty' },
  ],

  dimensions: { overallWidth: 110, overallDepth: 110, overallHeight: 45, seatHeight: 0, weight: 68 },

  relatedProducts: [
    { slug: 'coastal-sectional-sofa' },
    { slug: 'nordic-lounge-chair' },
    { slug: 'cypress-coffee-table' },
  ],

  seo: {
    title: 'Granite Fire Pit Table — ToDay Outdoor Living',
    description: 'A contemporary fire pit table that brings warmth and conversation to your outdoor evenings.',
    keywords: ['fire pit', 'outdoor heater', 'fire table', 'patio', 'concrete'],
  },
};