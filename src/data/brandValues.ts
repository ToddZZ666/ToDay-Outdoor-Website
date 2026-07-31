/** Brand values data and icon SVG paths for CollectionBrandValues */

export const brandValues = [
  {
    icon: 'quality',
    title: 'Premium Quality',
    description: 'Hand-selected materials built to grace your outdoor space for years to come.',
  },
  {
    icon: 'weather',
    title: 'Weather Resistant',
    description: 'Engineered to endure sun, rain, and frost without losing character.',
  },
  {
    icon: 'sustainable',
    title: 'Sustainable Design',
    description: 'Responsibly sourced, designed for longevity, crafted with care for the planet.',
  },
  {
    icon: 'delivery',
    title: 'Worldwide Delivery',
    description: 'Carefully packaged and delivered to your doorstep, wherever you are.',
  },
];

export function getIconPath(key: string): string {
  switch (key) {
    case 'quality':
      return '<path d="M12 3l2.5 5.5 6 .9-4.3 4.2 1 6-5.2-3-5.2 3 1-6L3.5 9.4l6-.9L12 3z"/>';
    case 'weather':
      return '<path d="M4 14a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1.5A4 4 0 0 1 18 11H5a1 1 0 0 0 0 2h12M7 18h10M9 21h6"/>';
    case 'sustainable':
      return '<path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"/><path d="M7.5 9.5c1.5-1 3.5-1 4.5 0s1.5 2.5 0 4c-1.5 1.5-4 2-4 2s.5-2.5 2-4c1-1.5 1-3 0-4.5s-3-1.5-4.5 0"/>';
    case 'delivery':
      return '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><line x1="2" y1="12" x2="22" y2="12"/>';
    default:
      return '';
  }
}
