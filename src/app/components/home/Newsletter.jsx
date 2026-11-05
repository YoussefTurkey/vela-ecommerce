"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("You're subscribed! Check your inbox 🎉");
    setEmail("");
  };

  return (
    <section className="container-app py-16">
      <div className="card-soft flex flex-col md:flex-row items-center gap-8 p-8 sm:p-12 bg-gradient-to-br from-white to-primary-50/40">
        <div className="w-16 h-16 rounded-[18px] bg-primary-600 flex items-center justify-center shrink-0 shadow-glow-primary">
          <Mail size={28} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-extrabold text-secondary-700">
            Stay in the loop
          </h3>
          <p className="text-secondary-500 mt-1.5 text-sm sm:text-base">
            New arrivals, price drops, and members-only sales — straight to your
            inbox.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input-field rounded-full! w-full md:w-72"
          />
          <button
            type="submit"
            className="btn-primary rounded-full! shrink-0 px-5!"
          >
            <Send size={17} />
            <span className="hidden sm:inline">Subscribe</span>
          </button>
        </form>
      </div>
    </section>
  );
}
