import { serialize } from 'next-mdx-remote/serialize';

// Import serialize function
import { ContactForm } from '@/components/contact-form';
import { MDXProvider } from '@/components/mdx-provider';

import { getContent } from '@/lib/content';

export async function getContactContent() {
  const contact = await getContent('pages', 'contact');

  if (!contact) {
    return <div>Contact content not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-6 text-4xl font-bold">
            {contact.frontmatter.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={await serialize(contact.content)} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-6 text-4xl font-bold">Contact Us</h1>
          <p className="mb-6 text-lg">
            We'd love to hear from you! Whether you have a question, feedback,
            or a business inquiry, feel free to reach out.
          </p>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
