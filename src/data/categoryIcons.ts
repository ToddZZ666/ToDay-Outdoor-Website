/** Category icon SVG paths for CollectionCategoryNav */

export function getCategoryIconPath(key: string): string {
  switch (key) {
    case 'all':
      return '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>';
    case 'sofa':
      return '<path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6M5 18v-4M19 18v-4M3 14h18M5 18v2M19 18v2"/>';
    case 'dining':
      return '<path d="M4 6h16M7 6v12M17 6v12M4 18h16"/>';
    case 'lounge':
      return '<path d="M4 18V9M4 9h16M20 9v9M4 18h16M14 9v5"/>';
    case 'firepit':
      return '<path d="M12 2c1 4 4 6 4 10a4 4 0 1 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5-2-7 0-1 1-2 2-2z"/>';
    case 'accessories':
      return '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>';
    default:
      return '';
  }
}
