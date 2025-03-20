import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            Have a project in mind or want to discuss a collaboration? I'd love to hear from you. Fill out the form
            below or reach out directly.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href="mailto:hello@gerous.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      >
                        hello@gerous.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Office</h3>
                      <address className="text-gray-600 dark:text-gray-400 not-italic">
                        123 Design Street
                        <br />
                        San Francisco, CA 94103
                      </address>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-3">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

