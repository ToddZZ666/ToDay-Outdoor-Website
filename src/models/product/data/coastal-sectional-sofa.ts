import type { Product } from '../types';

export const coastalSectionalSofa: Product = {
  slug: 'coastal-sectional-sofa',
  category: 'sofa',
  categoryName: 'Outdoor Sofa',
  name: 'Coastal Sectional Sofa',
  shortDescription:
    'A spacious and inviting sectional designed for relaxed outdoor living. Crafted with premium materials and timeless details, the Coastal Sectional brings the warmth of the seaside to your own garden.',
  price: 3290,
  priceFrom: true,
  currency: 'USD',
  status: 'active',

  gallery: [
    { id: 'g01', image: '/images/coastal-library/01-hero.jpg', alt: 'Coastal Sectional Sofa — lifestyle hero', isHero: true, order: 1 },
    { id: 'g02', image: '/images/coastal-library/03-front-view.jpg', alt: 'Coastal Sectional Sofa — front view', order: 2 },
    { id: 'g03', image: '/images/coastal-library/04-45-degree.jpg', alt: 'Coastal Sectional Sofa — 45 degree view', order: 3 },
    { id: 'g04', image: '/images/coastal-library/05-side-view.jpg', alt: 'Coastal Sectional Sofa — side profile', order: 4 },
    { id: 'g05', image: '/images/coastal-library/06-rear-view.jpg', alt: 'Coastal Sectional Sofa — rear view', order: 5 },
    { id: 'g06', image: '/images/coastal-library/11-lifestyle-detail.jpg', alt: 'Coastal Sectional Sofa — detail', order: 6 },
    { id: 'g07', image: '/images/coastal-library/09-teak-detail.jpg', alt: 'Coastal Sectional Sofa — material detail', order: 7 },
    { id: 'g08', image: '/images/coastal-library/18-care-guide.jpg', alt: 'Coastal Sectional Sofa — care guide', order: 8 },
    { id: 'g09', image: '/images/coastal-library/17-assembly-exploded.jpg', alt: 'Coastal Sectional Sofa — assembly view', order: 9 },
  ],

  colorOptions: [
    { name: 'Natural', hex: '#D4C5B0' },
    { name: 'Cream', hex: '#EDE6DA' },
    { name: 'Charcoal', hex: '#3D3D3D' },
    { name: 'Sage', hex: '#A8B5A0' },
    { name: 'Teak', hex: '#B8956A' },
    { name: 'Aluminum', hex: '#8A847E' },
    { name: 'Espresso', hex: '#2F2A26' },
  ],

  configurations: [
    { label: 'Left Chaise (3-Seater)', value: 'left-chaise' },
    { label: 'Right Chaise (3-Seater)', value: 'right-chaise' },
    { label: 'Center Chaise (4-Seater)', value: 'center-chaise' },
    { label: '3-Seater (No Chaise)', value: 'no-chaise' },
    { label: 'Corner Sectional (5-Seater)', value: 'corner' },
  ],

  story: {
    eyebrow: 'Our Story',
    title: 'Crafted for Comfort. Built to Last.',
    description:
      'Every detail of the Coastal Sectional Sofa is thoughtfully designed to withstand the elements while providing exceptional comfort. From the handwoven backrest to the quick-dry cushions, each component is made to enhance your outdoor lifestyle for years to come.',
    image: '/images/coastal-library/11-lifestyle-detail.jpg',
  },

  features: [
    { icon: 'water', title: 'Weather Resistant', description: 'Built with all-weather materials to endure rain, sun, and everything in between.' },
    { icon: 'cushion', title: 'Premium Comfort', description: 'Deep seating and plush cushions offer lasting support and relaxation.' },
    { icon: 'craft', title: 'Thoughtful Details', description: 'Handwoven backrests and teak accents bring warmth, flexibility, and craftsmanship to every angle.' },
    { icon: 'leaf', title: 'Easy Maintenance', description: 'Removable cushion covers and durable finishes make care simple and worry-free.' },
  ],

  materialHighlights: [
    { title: 'Teak Wood', description: 'FSC-certified teak offers natural beauty and superior durability.', image: '/images/coastal-library/09-teak-detail.jpg' },
    { title: 'Olefin Fabric', description: 'Soft, UV-resistant fabric that is water-repellent and quick-drying.', image: '/images/coastal-library/08-fabric-detail.jpg' },
    { title: 'Aluminum Frame', description: 'Powder-coated aluminum frame ensures strength, lightweight performance, and rust resistance.', image: '/images/coastal-library/10-aluminum-detail.jpg' },
    { title: 'Handwoven Rope', description: 'Artisan handwoven rope adds texture, flexibility, and timeless elegance.', image: '/images/coastal-library/07-rope-detail.jpg' },
  ],
  materialFlatlay: '/images/coastal-library/13-material-flatlay.jpg',

  specifications: [
    { label: 'Overall Dimensions', value: 'W 320cm × D 160cm × H 78cm' },
    { label: 'Seat Height', value: '42cm' },
    { label: 'Materials', value: 'Teak Wood, Aluminum, Olefin Fabric, Handwoven Rope' },
    { label: 'Cushion Thickness', value: '15cm' },
    { label: 'Weight', value: '86kg' },
    { label: 'Assembly', value: 'Required (Easy Assembly)' },
    { label: 'Warranty', value: '5 Year Limited Warranty' },
  ],

  dimensions: {
    overallWidth: 320,
    overallDepth: 160,
    overallHeight: 78,
    seatHeight: 42,
    weight: 86,
  },
  dimensionDrawing: '/images/coastal-library/16-dimension-drawing.jpg',
  assemblyDrawing: '/images/coastal-library/17-assembly-exploded.jpg',

  downloads: [
    { type: 'catalog', label: 'Download Catalog', url: '#' },
    { type: 'care-guide', label: 'Care Guide', url: '#' },
    { type: 'warranty', label: 'Warranty', url: '#' },
  ],

  relatedProducts: [
    { slug: 'riviera-dining-table' },
    { slug: 'cypress-coffee-table' },
    { slug: 'granite-fire-pit-table' },
  ],

  seo: {
    title: 'Coastal Sectional Sofa — ToDay Outdoor Living',
    description: 'A spacious and inviting sectional designed for relaxed outdoor living. Crafted with premium teak, handwoven rope, and quick-dry cushions.',
    keywords: ['outdoor sofa', 'sectional', 'coastal', 'teak furniture', 'outdoor living'],
  },
};