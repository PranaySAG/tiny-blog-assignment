import React from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FEATURED_ARTICLES, CATEGORIES, LATEST_ARTICLES } from "../constants";



export default function Home() {
    return (
        <main className="font-sans text-black bg-white">
            <Navbar />
            <section
                className="relative h-[70vh] min-h-[520px] flex items-center"
                aria-label="Hero"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=80&grayscale')",
                        filter: "grayscale(100%)",
                    }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative container mx-auto max-w-5xl px-6 text-center text-white">
                    <h1 className="font-serif text-6xl md:text-7xl tracking-tight mb-4">
                        Quill.
                    </h1>
                    <h2 className="font-serif text-xl md:text-2xl opacity-90 mb-4">
                        Where stories slow down and ideas find their rhythm.
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90 mb-8">
                        A minimalist digital journal celebrating thoughtful writing and
                        timeless design.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/blogs"
                            className="inline-block bg-black text-white px-6 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
                        >
                            Explore Stories
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto max-w-7xl px-6 py-16">
                <h3 className="text-center font-serif text-3xl mb-10">Editor’s Picks</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FEATURED_ARTICLES.map((a) => (
                        <article
                            key={a.id}
                            className="group bg-white shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={a.image}
                                    alt={a.title}
                                    className="w-full h-56 md:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105 filter grayscale"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs uppercase tracking-wide text-gray-600">
                                    {a.category}
                                </span>
                                <h4 className="font-serif text-xl mt-2 mb-2">{a.title}</h4>
                                <p className="text-gray-700 text-sm mb-4">{a.excerpt}</p>
                                <Link
                                    to="/blogs"
                                    className="inline-block text-sm border border-gray-800 text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
                                >
                                    Read More
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="relative bg-white py-20">
                <div className="container mx-auto max-w-3xl px-6 text-center">
                    <h3 className="font-serif text-3xl mb-6">Writing in Black and White.</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Quill isn’t about trends — it’s about timelessness.
                        <br />
                        Every story is crafted with care, stripped of noise, and designed to
                        let words speak for themselves.
                        <br />
                        Here, writing isn’t decoration — it’s design.
                    </p>
                </div>
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1400&q=80&grayscale')",
                        opacity: 0.04,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </section>

            <section className="container mx-auto max-w-7xl px-6 py-16">
                <div className="flex items-baseline justify-between mb-8">
                    <h3 className="font-serif text-2xl">Explore Topics</h3>
                    <Link
                        to="/blogs"
                        className="text-sm border border-gray-800 px-3 py-2 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((c) => (
                        <Link
                            key={c.id}
                            to="/blogs"
                            className="relative group flex items-end h-48 overflow-hidden"
                        >
                            <img
                                src={c.image}
                                alt={c.title}
                                className="absolute inset-0 w-full h-full object-cover filter grayscale transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/30 transition-colors" />
                            <div className="relative z-10 p-6">
                                <h4 className="text-white font-serif text-lg">{c.title}</h4>
                                <p className="text-sm text-white/90 mt-1">{c.line}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-black text-white py-20">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <blockquote className="italic text-2xl md:text-3xl leading-relaxed">
                        “Good writing doesn’t shout — it whispers and stays.”
                    </blockquote>
                </div>
            </section>

            <section className="container mx-auto max-w-7xl px-6 py-16">
                <h3 className="font-serif text-2xl mb-8">Latest from Quill</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {LATEST_ARTICLES.map((a) => (
                        <article key={a.id} className="bg-white">
                            <img
                                src={a.image}
                                alt={a.title}
                                className="w-full h-48 object-cover filter grayscale"
                            />
                            <div className="p-5">
                                <span className="text-xs uppercase tracking-wide text-gray-600">
                                    {a.category}
                                </span>
                                <h4 className="font-serif text-xl mt-2 mb-2">{a.title}</h4>
                                <p className="text-gray-700 text-sm mb-4">{a.excerpt}</p>
                                <Link
                                    to="/blogs"
                                    className="inline-block text-sm border border-gray-800 text-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors"
                                >
                                    Read More
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </section>
            <section className="container mx-auto max-w-7xl px-6 py-16">
                <h3 className="font-serif text-2xl mb-8">From the Journal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="h-80 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80&grayscale"
                            alt="Workspace"
                            className="w-full h-full object-cover filter grayscale"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 mb-4">
                            Behind every story on Quill is a moment of stillness — a blank
                            page waiting for meaning. Explore behind-the-scenes glimpses,
                            writer reflections, and creative processes.
                        </p>
                        <Link
                            to="/about"
                            className="inline-block border border-gray-800 px-5 py-3 text-sm text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            Behind the Words
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}