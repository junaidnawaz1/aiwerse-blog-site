"use client"
import { motion } from 'framer-motion'

// export const metadata = {
//   title: 'Terms of Service - NEWSEE',
//   description: 'Read our Terms of Service for NEWSEE - your source for AI tools, guides, and business insights.',
// }

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using NEWSEE, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on NEWSEE for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on NEWSEE; remove any copyright or other proprietary notations from the materials; transfer the materials to another person or 'mirror' the materials on any other server."
    },
    {
      title: "3. Disclaimer",
      content: "The materials on NEWSEE are provided on an 'as is' basis. NEWSEE makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: "4. Limitations",
      content: "In no event shall NEWSEE or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NEWSEE, even if NEWSEE or a NEWSEE authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      title: "5. Accuracy of Materials",
      content: "The materials appearing on NEWSEE could include technical, typographical, or photographic errors. NEWSEE does not warrant that any of the materials on our website are accurate, complete, or current. NEWSEE may make changes to the materials contained on its website at any time without notice."
    },
    {
      title: "6. Materials and Content",
      content: "All content on NEWSEE, including but not limited to articles, guides, reviews, and news updates, is protected by copyright. Unauthorized reproduction or distribution of copyrighted material is prohibited. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from NEWSEE."
    },
    {
      title: "7. Links",
      content: "NEWSEE has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by NEWSEE of the site. Use of any such linked website is at the user's own risk."
    },
    {
      title: "8. Modifications",
      content: "NEWSEE may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service."
    },
    {
      title: "9. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where NEWSEE operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
    },
    {
      title: "10. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at contact@newsee.com or visit our contact page for more information."
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-300">
              Last Updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12"
        >
          <p className="text-gray-800 leading-relaxed">
            Welcome to NEWSEE ("we", "us", "our", or "Company"). These Terms of Service ("Terms") govern your access to and use of NEWSEE, including all content, functionality, and services offered on our website. Please read these Terms carefully before using NEWSEE. By accessing and using NEWSEE, you accept and agree to be bound by these Terms.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="border-l-4 border-blue-600 pl-6 py-2"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            NEWSEE strives to provide accurate, helpful, and up-to-date information about AI tools, technologies, and trends. However, all information is provided "as is" without warranty of any kind. We recommend that you independently verify any information before taking action based on our content.
          </p>
          <p className="text-gray-800 leading-relaxed">
            For questions regarding these Terms of Service or our policies, please contact us at <a href="mailto:contact@newsee.com" className="text-blue-600 hover:underline">contact@newsee.com</a>.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
