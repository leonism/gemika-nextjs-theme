import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="mb-8">
            // Replace the img tag (around line 9)
            <div className="relative mx-auto mb-8 h-64 w-64 overflow-hidden rounded-full">
              <Image
                src="/path/to/profile-image.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="mb-6 text-center text-4xl font-bold">About Me</h1>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              Hello! I'm a passionate UX strategist and mobile developer with
              over 8 years of experience creating intuitive and engaging digital
              experiences.
            </p>

            <h2>My Expertise</h2>
            <ul>
              <li>User Experience Design</li>
              <li>Mobile Application Development</li>
              <li>Design Systems</li>
              <li>User Research & Testing</li>
            </ul>

            <h2>Professional Journey</h2>
            <p>
              I've had the privilege of working with a diverse range of clients,
              from startups to Fortune 500 companies.
            </p>

            <h2>Philosophy</h2>
            <p>
              I believe that great design is invisible. It should feel intuitive
              and natural, allowing users to accomplish their goals without
              friction.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
