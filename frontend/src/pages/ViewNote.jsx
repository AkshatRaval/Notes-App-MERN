import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import gsap from "gsap";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <div className="text-center mt-20 text-xl">Loading note...</div>;

  return (
    <section className="min-h-screen bg-gray-50 text-gray-900" ref={containerRef}>
      <header className="flex items-center justify-between px-8 py-4 bg-blue-800 text-white shadow">
        <h1 className="text-2xl md:text-3xl font-bold">📝 View Note</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg p-2 transition"
          aria-label="Go back"
        >
          <X size={24} />
        </button>
      </header>

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">{note.subject}</h2>
        <p className="whitespace-pre-wrap text-lg text-gray-800">{note.text}</p>
        {note.isPinned && (
          <span className="inline-block bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-semibold select-none">
            📌 Pinned
          </span>
        )}
      </div>
    </section>
  );
};

export default ViewNote;
