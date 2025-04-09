import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="mb-8">
            <div className="relative mx-auto overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl mb-8 h-64 w-64 overflow-hidden rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
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
