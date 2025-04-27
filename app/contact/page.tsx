// app/contact/page.tsx
import { Mail, MessageSquare, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              We'd love to hear from you! Whether you have a question, feedback, or a business inquiry, feel free to reach out.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email",
                description: "hello@gemika.com",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Phone",
                description: "+1 (555) 123-4567",
                gradient: "from-purple-500 to-violet-500"
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: "Social Media",
                description: "@gemika_design",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                <div className="relative z-10">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${item.gradient} text-white`}>
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Send us a message
              </span>
            </h2>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
