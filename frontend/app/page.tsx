export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b bg-white px-8 py-5">
        <div className="text-2xl font-bold text-green-700">
          🐾 PawTrace
        </div>

        <div className="hidden gap-6 md:flex">
          <a href="#about" className="hover:text-green-700">
            About
          </a>
          <a href="#features" className="hover:text-green-700">
            Features
          </a>
          <a href="/login" className="hover:text-green-700">
            Login
          </a>
        </div>

        <a
          href="/register"
          className="rounded-lg bg-green-700 px-5 py-2 font-medium text-white hover:bg-green-800"
        >
          Register
        </a>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-50 px-8 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-lg font-medium text-green-700">
            Animal Welfare & Care Platform
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Every Animal Deserves a{" "}
            <span className="text-green-700">Traceable Care Journey</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            PawTrace helps communities care for pets and stray dogs and cats
            through rescue reporting, health records, vaccinations, and
            adoption management.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/register"
              className="rounded-lg bg-green-700 px-7 py-3 font-semibold text-white hover:bg-green-800"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="rounded-lg border border-green-700 px-7 py-3 font-semibold text-green-700 hover:bg-green-100"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">What is PawTrace?</h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            PawTrace is a centralized platform for recording and managing the
            welfare journey of animals. It can be used for both household pets
            and stray animals that need rescue, medical care, or adoption.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">
            PawTrace Features
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🐕"
              title="Animal Profiles"
              description="Create and manage profiles for pets and stray dogs and cats."
            />

            <FeatureCard
              icon="🚨"
              title="Stray Reporting"
              description="Report animals that need help with location, photos, and condition details."
            />

            <FeatureCard
              icon="🏥"
              title="Health Records"
              description="Maintain medical history, treatments, and veterinary information."
            />

            <FeatureCard
              icon="💉"
              title="Vaccinations"
              description="Track vaccination dates and upcoming vaccination due dates."
            />

            <FeatureCard
              icon="🏠"
              title="Adoption"
              description="Connect animals with potential adopters through an organized adoption workflow."
            />

            <FeatureCard
              icon="🤖"
              title="AI Assistance"
              description="Provide general educational guidance about animal care, food, grooming, and welfare."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-700 px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Help us build a better future for animals.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-green-100">
          Join PawTrace and help make animal welfare information easier to
          manage, share, and act upon.
        </p>

        <a
          href="/register"
          className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-green-700 hover:bg-green-50"
        >
          Join PawTrace
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-6 text-center text-sm text-gray-500">
        © 2026 PawTrace — Animal Welfare Platform
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-gray-600">{description}</p>
    </div>
  );
}