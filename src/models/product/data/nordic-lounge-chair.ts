import type { Product } from '../types';

export const nordicLoungeChair: Product = {
  slug: 'nordic-lounge-chair',
  category: 'lounge',
  categoryName: 'Lounge Chair',
  name: 'Nordic Lounge Chair',
  shortDescription: 'A sculptural lounge chair that combines ergonomic comfort with minimalist Scandinavian design.',
  price: 1120,
  currency: 'USD',
  status: 'active',

  gallery: [
    { id: 'g01', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85&auto=format&fit=crop', alt: 'Nordic Lounge Chair — main view', isHero: true, order: 1 },
    { id: 'g02', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85&auto=format&fit=crop', alt: 'Nordic Lounge Chair — side view', order: 2 },
    { id: 'g03', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format&fit=crop', alt: 'Nordic Lounge Chair — detail', order: 3 },
  ],

  colorOptions: [
    { name: 'Natural', hex: '#D4C5B0' },
    { name: 'Cream', hex: '#EDE6DA' },
    { name: 'Charcoal', hex: '#3D3D3D' },
    { name: 'Sage', hex: '#A8B5A0' },
  ],

  configurations: [
    { label: 'Standard', value: 'standard' },
    { label: 'With Ottoman', value: 'with-ottoman' },
  ],

  story: {
    eyebrow: 'Our Story',
    title: 'Scandinavian Comfort, Reimagined Outdoors.',
    description:
      'The Nordic Lounge Chair pairs a powder-coated aluminum frame with quick-dry Olefin cushions for a clean, sculptural silhouette. Its generous proportions and ergonomic angle invite you to settle in with a book and stay awhile.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85&auto=format&fit=crop',
  },

  features: [
    { icon: 'water', title: 'Quick-Dry Cushions', description: 'Olefin fabric dries rapidly and resists mildew.' },
    { icon: 'cushion', title: 'Ergonomic Angle', description: 'Designed for optimal lumbar support and relaxation.' },
    { icon: 'craft', title: 'Aluminum Frame', description: 'Lightweight, rust-proof, and built for coastal climates.' },
    { icon: 'leaf', title: 'Easy Maintenance', description: 'Cushion covers are removable and machine-washable.' },
  ],

  materialHighlights: [
    { title: 'Olefin Fabric', description: 'UV-resistant, water-repellent, and soft to the touch.', image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80&auto=format&fit=crop' },
    { title: 'Aluminum Frame', description: 'Powder-coated for a smooth, durable matte finish.', image: 'https://images.unsplash.com/photo-1622359419133-e7bc34190c1f?w=600&q=80&auto=format&fit=crop' },
    { title: 'Quick-Dry Foam', description: 'High-density foam core drains water and dries quickly.', image: 'https://images.unsplash.com/photo-1572972983197-0248a3181829?w=600&q=80&auto=format&fit=crop' },
  ],

  specifications: [
    { label: 'Overall Dimensions', value: 'W 72cm × D 78cm × H 86cm' },
    { label: 'Seat Height', value: '42cm' },
    { label: 'Materials', value: 'Aluminum, Olefin Fabric, Quick-Dry Foam' },
    { label: 'Weight', value: '12kg' },
    { label: 'Assembly', value: 'No Assembly Required' },
    { label: 'Warranty', value: '3 Year Limited Warranty' },
  ],

  dimensions: { overallWidth: 72, overallDepth: 78, overallHeight: 86, seatHeight: 42, weight: 12 },

  relatedProducts: [
    { slug: 'coastal-sectional-sofa' },
    { slug: 'cypress-coffee-table' },
  ],

  seo: {
    title: 'Nordic Lounge Chair — ToDay Outdoor Living',
    description: 'A sculptural lounge chair that combines ergonomic comfort with minimalist Scandinavian design.',
    keywords: ['lounge chair', 'outdoor chair', 'aluminum frame', 'scandinavian design'],
  },
};