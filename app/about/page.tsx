export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center">
            About Me
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Hello! I'm a passionate UX strategist and mobile developer with over 8 years of experience creating intuitive and engaging digital experiences.</p>

            <h2>My Expertise</h2>
            <ul>
              <li>User Experience Design</li>
              <li>Mobile Application Development</li>
              <li>Design Systems</li>
              <li>User Research & Testing</li>
            </ul>

            <h2>Professional Journey</h2>
            <p>I've had the privilege of working with a diverse range of clients, from startups to Fortune 500 companies.</p>

            <h2>Philosophy</h2>
            <p>I believe that great design is invisible. It should feel intuitive and natural, allowing users to accomplish their goals without friction.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
