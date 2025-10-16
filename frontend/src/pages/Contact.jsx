export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have a question? Reach out using the form below.
      </p>
      <form className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your name"
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full border p-3 rounded"
          required
        />
        <textarea
          placeholder="Your message"
          className="w-full border p-3 rounded h-32"
          required
        ></textarea>
        <button
          type="submit"
          className="px-5 py-3 bg-gray-900 text-white rounded"
          onClick={(e) => {
            e.preventDefault();
            alert("Message sent (demo only).");
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
