import type { Product } from '../types';

export const cypressCoffeeTable: Product = {
  slug: 'cypress-coffee-table',
  category: 'accessories',
  categoryName: 'Accessories',
  name: 'Cypress Coffee Table',
  shortDescription: 'A low-profile coffee table that anchors your outdoor seating arrangement with warmth and natural texture.',
  price: 699,
  currency: 'USD',
  status: 'active',

  gallery: [
    { id: 'g01', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85&auto=format&fit=crop', alt: 'Cypress Coffee Table — main view', isHero: true, order: 1 },
    { id: 'g02', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop', alt: 'Cypress Coffee Table — setting', order: 2 },
  ],

  colorOptions: [
    { name: 'Teak', hex: '#B8956A' },
    { name: 'Natural', hex: '#D4C5B0' },
  ],

  configurations: [
    { label: 'Standard', value: 'standard' },
    { label: 'Large', value: 'large' },
  ],

  story: {
    title: 'The Anchor of Your Outdoor Space.',
    description: 'The Cypress Coffee Table is designed to complement both deep seating and lounge configurations. Its clean lines and warm teak surface create a natural gathering point for conversation, drinks, and decor.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85&auto=format&fit=crop',
  },

  features: [
    { icon: 'water', title: 'All-Weather Teak', description: 'Solid teak withstands sun, rain, and temperature changes.' },
    { icon: 'craft', title: 'Clean Lines', description: 'Minimalist profile complements any outdoor seating arrangement.' },
    { icon: 'leaf', title: 'Easy Care', description: 'Simply rinse with water; teak naturally resists stains.' },
  ],

  materialHighlights: [
    { title: 'Solid Teak', description: 'Premium-grade teak with natural oils for weather resistance.', image: 'https://images.unsplash.com/photo-1546414603-0c4a451d1e44?w=600&q=80&auto=format&fit=crop' },
    { title: 'Slatted Surface', description: 'Allows water to drain through, preventing pooling.', image: 'https://images.unsplash.com/photo-1572972983197-0248a3181829?w=600&q=80&auto=format&fit=crop' },
  ],

  specifications: [
    { label: 'Overall Dimensions', value: 'W 120cm × D 70cm × H 38cm' },
    { label: 'Materials', value: 'FSC-Certified Teak' },
    { label: 'Weight', value: '18kg' },
    { label: 'Warranty', value: '3 Year Limited Warranty' },
  ],

  dimensions: { overallWidth: 120, overallDepth: 70, overallHeight: 38, seatHeight: 0, weight: 18 },

  relatedProducts: [
    { slug: 'coastal-sectional-sofa' },
    { slug: 'nordic-lounge-chair' },
  ],

  seo: {
    title: 'Cypress Coffee Table — ToDay Outdoor Living',
    description: 'A low-profile coffee table that anchors your outdoor seating arrangement with warmth.',
    keywords: ['coffee table', 'teak', 'outdoor table', 'patio furniture'],
  },
};