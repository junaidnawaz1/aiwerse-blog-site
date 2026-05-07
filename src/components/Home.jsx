import SectionBlock from '@/components/SectionBlock'
import Hero from '@/components/Hero.jsx'
import AboutBox from '@/components/AboutBox'
import CategoryPreview from '@/components/CategoryPreview'

export default function Landing() {
  const sections = [
    {
      category: 'ai-tools',
      title: 'AI Tools',
      description: 'Explore the latest AI tools and innovations reshaping the future of technology.',
      categoryPath: '/ai-tools',
    },
    {
      category: 'guides',
      title: 'AI Guides',
      description: 'Comprehensive guides to help you master artificial intelligence.',
      categoryPath: '/ai/guides',
    },
    {
      category: 'comparisions',
      title: 'AI Comparisions',
      description: 'Compare AI platforms to make better decisions.',
      categoryPath: '/ai/comparisions',
    },
    {
      category: 'business-use-cases',
      title: 'Business Use Cases',
      description: 'Real-world AI applications in modern businesses.',
      categoryPath: '/ai/business-use-cases',
    },
    {
      category: 'news',
      title: 'AI News',
      description: 'Latest updates about AI trends and tools.',
      categoryPath: '/ai/news',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero */}
      <Hero />

      {/* NEW: Category Preview (GSAP Animated) */}
      <CategoryPreview />

      {/* Sections */}
      {sections.map((section, index) => (
        <SectionBlock
          key={index}
          category={section.category}
          title={section.title}
          description={section.description}
          categoryPath={section.categoryPath}
        />
      ))}

      {/* NEW: About Section */}
      <AboutBox />
    </main>
  )
}