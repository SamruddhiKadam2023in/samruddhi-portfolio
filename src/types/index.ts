export interface Social {
  email: string;
  github: string;
  linkedin: string;
}

export interface SiteInfo {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  description: string;
  /** Public origin, no trailing slash. Also hard-coded in index.html, robots.txt and sitemap.xml. */
  url: string;
  /** Meta description for the home page. */
  seoDescription: string;
}

export interface NavItem {
  id: string;
  label: string;
}
