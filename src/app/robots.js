export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/_next', '/static'],
      crawlDelay: 1,
    },
    sitemap: 'https://www.aiwerse.blog/sitemap.xml',
  }
}