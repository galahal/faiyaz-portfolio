import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-black"
    >
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            className="w-full p-3 border rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full p-3 border rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 border rounded"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button className="w-full p-3 bg-purple-600 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}