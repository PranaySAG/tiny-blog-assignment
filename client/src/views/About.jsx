import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

export default function About() {
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <Navbar />
            <header className="py-16 mt-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-serif text-5xl md:text-6xl font-semibold tracking-tight">
                        About Quill.
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        A place where words breathe and ideas find their rhythm.
                    </p>
                    <div className="mt-8 w-24 h-px bg-gray-200 mx-auto" />
                </div>
            </header>

            <main>
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="rounded-lg overflow-hidden shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80&grayscale"
                                alt="Open notebook and pen"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        <div className="text-gray-800">
                            <h2 className="font-serif text-2xl mb-4">Our Origin</h2>
                            <p className="leading-relaxed text-base">
                                Quill was born from a simple idea — to create a space where
                                stories could live slowly. In a world of noise, we wanted
                                silence. In a world of color, we chose contrast — black and
                                white.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-lg p-6 transform transition duration-200 hover:shadow-lg hover:-translate-y-1">
                                <h3 className="font-serif text-xl mb-2">Clarity</h3>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    We pare back excess to make meaning visible. Every sentence
                                    aims for precision and ease.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 transform transition duration-200 hover:shadow-lg hover:-translate-y-1">
                                <h3 className="font-serif text-xl mb-2">Calm</h3>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Writing that breathes — deliberate pace, generous white space,
                                    and an editorial eye toward rhythm.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 transform transition duration-200 hover:shadow-lg hover:-translate-y-1">
                                <h3 className="font-serif text-xl mb-2">Connection</h3>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Stories that anchor readers — honest, intimate, and shaped
                                    for thoughtful engagement.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-6">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=60&grayscale"
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover opacity-10 filter blur-sm"
                        />
                        <div className="relative z-8 max-w-4xl mx-auto text-center py-12 px-6">
                            <p className="font-serif text-xl md:text-2xl text-gray-900 leading-relaxed">
                                “At Quill, writing is more than words — it’s design, rhythm, and
                                emotion. Every sentence is crafted to breathe, every paragraph
                                has purpose.”
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto bg-black rounded-lg py-12 px-6 text-center">
                        <blockquote className="text-white italic text-2xl md:text-3xl font-serif leading-relaxed">
                            “Good writing doesn’t fill space — it leaves space for thought.”
                        </blockquote>
                    </div>
                </section>
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="font-serif text-2xl mb-4">The Future of Quill</h3>
                            <p className="text-gray-800 leading-relaxed">
                                We’re building a digital home for timeless storytelling — where
                                design meets depth. Our future lies in thoughtful collaboration
                                with writers who believe in meaning over metrics.
                            </p>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80&grayscale"
                                alt="Patterned paper texture"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-16 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="font-serif text-3xl mb-4">Join the Journey.</h3>
                        <p className="text-gray-800 mb-8 leading-relaxed">
                            If you believe in writing that lasts longer than trends, you
                            belong here.
                        </p>
                        <Link
                            to="/blogs"
                            className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium shadow-sm hover:opacity-90 transition"
                        >
                            Read Our Stories
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-200 py-8 px-6">
                <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
                    © 2025 Quill — Crafted with words.
                </div>
            </footer>
        </div>
    );
}