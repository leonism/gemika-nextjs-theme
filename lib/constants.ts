// these are the constant for the AREA_EXPERTISE section in the homepage
export const AREA_EXPERTISE = [
  {
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    title: 'UX Design',
    description: 'Principles, methods, and tools for creating exceptional user experiences',
    count: 8,
    tags: ['Research', 'Wireframing', 'Prototyping'],
    color: 'bg-indigo-600',
    categorySlug: 'design',
  },
  {
    title: 'Mobile Development',
    description: 'Building responsive, cross-platform mobile applications',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    count: 6,
    tags: ['Flutter', 'React Native', 'Swift'],
    color: 'bg-emerald-600',
    categorySlug: 'development',
  },
  {
    title: 'Design Systems',
    description: 'Creating scalable and consistent design systems for products',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    count: 5,
    tags: ['Figma', 'Storybook', 'Tokens'],
    color: 'bg-amber-600',
    categorySlug: 'design',
  },
]

// these are the constant for the PROJECTS_PER_PAGE at project page
export const PROJECTS_PER_PAGE = 6

// these are the constant for the CATEGORY_COLORS at post page
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  design: { bg: 'bg-indigo-100/80', text: 'text-indigo-600' },
  'web development': { bg: 'bg-emerald-100/80', text: 'text-emerald-600' },
  branding: { bg: 'bg-amber-100/80', text: 'text-amber-600' },
  featured: { bg: 'bg-rose-100/80', text: 'text-rose-600' },
  'artificial intelligence': {
    bg: 'bg-purple-100/80',
    text: 'text-purple-600',
  },
  'mobile development': { bg: 'bg-blue-100/80', text: 'text-blue-600' },
  'artificial intelligence & data visualization': {
    bg: 'bg-fuchsia-100/80',
    text: 'text-fuchsia-600',
  },
  default: { bg: 'bg-gray-100/80', text: 'text-gray-600' },
} as const
