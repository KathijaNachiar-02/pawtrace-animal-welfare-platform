
"use client";

import Link from "next/link";


const actions = [
  { icon: "\u{1F43E}", title: "Report an Animal", description: "Report an injured, stray, or vulnerable animal.", href: "/animals/create" },
  { icon: "\u{1F4CB}", title: "My Reports", description: "Track reports you have submitted and their status.", href: "/reports" },
  { icon: "\u{1F431}", title: "Adopt an Animal", description: "Meet animals looking for a safe and loving home.", href: "/animals" },
];


export default function CitizenPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/citizen" className="text-2xl font-extrabold text-green-700">
{"\u{1F43E}"} PawTrace
</Link>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">Citizen Portal</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-3xl bg-gradient-to-r from-green-800 to-emerald-600 px-7 py-10 text-white shadow-lg sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-100">Every animal matters</p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Welcome to PawTrace!</h1>
          <p className="mt-4 max-w-2xl leading-7 text-green-50">Help protect animals in your community. Submit reports, follow their progress, and discover animals that need care and loving homes.</p>
          <Link href="/animals/create" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-green-800 shadow hover:bg-green-50">+ Report an Animal</Link>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">What would you like to do?</h2>
          <p className="mt-2 text-slate-500">Choose an action to get started.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {actions.map((action) => (
              <Link key={action.title} href={action.href} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">{action.icon}</div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-green-700">{action.title}</h3>
                <p className="mt-2 leading-6 text-slate-500">{action.description}</p>
                <span className="mt-5 inline-block font-semibold text-green-700">Open section {"\u2192"}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-green-100 bg-white p-7">
          <h2 className="text-xl font-bold text-slate-900">Your impact starts here</h2>
          <p className="mt-2 leading-7 text-slate-600">Accurate reports can help animal welfare teams respond. You can also explore animal profiles and adoption information.</p>
        </section>

        <footer className="py-8 text-center text-sm text-slate-400">PawTrace {"\u00B7"} Caring for animals, together</footer>
      </div>
    </main>
  );
}



