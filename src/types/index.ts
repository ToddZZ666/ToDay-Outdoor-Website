/** Common site-wide types */

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  language: string;
  locale: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MetaData {
  title: string;
  description?: string;
  canonicalURL?: string;
  ogImage?: string;
  noIndex?: boolean;
}
