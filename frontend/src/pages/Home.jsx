import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// Custom hook for GSAP animation on mount
const useGSAP = (ref, deps = []) => {
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, deps);
};

const Home = () => {
  const [notes, setNotes] = useState([]);
  const pinnedRef = useRef(null);
  const otherRef = useRef(null);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };
    fetchNotes();
  }, []);

  useGSAP(pinnedRef, [notes]);
  useGSAP(otherRef, [notes]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const togglePin = async (id) => {
    try {
      await axios.put(`http://localhost:8000/notes/pin/${id}`);
      const res = await axios.get("http://localhost:8000/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);
  const pinnedList = sortedNotes.filter((n) => n.isPinned);
  const notPinnedList = sortedNotes.filter((n) => !n.isPinned);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-blue-800 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
          📝 My Notes
        </h1>
        <Link to="/create">
          <button className="bg-white text-indigo-700 hover:text-indigo-900 hover:scale-110 transition-transform rounded-full p-3 shadow-lg flex items-center justify-center">
            <CirclePlus size={32} />
          </button>
        </Link>
      </header>

      <main className="px-8 py-12 max-w-7xl mx-auto">
        <section ref={pinnedRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-indigo-800 flex items-center gap-3 ">
            📌 Pinned Notes
            {pinnedList.length === 0 && (
              <span className="text-lg font-normal text-gray-500">No pinned notes yet</span>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pinnedList.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-80 cursor-pointer transform transition-shadow duration-300 hover:shadow-2xl hover:scale-[1.03]"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-3 truncate">
                    {note.subject}
                  </h3>
                  <p className="text-gray-700 line-clamp-6">{note.text}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => togglePin(note._id)}
                    className="rounded-full px-5 py-1 text-sm font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition"
                    aria-label="Unpin note"
                  >
                    📌 Unpin
                  </button>
                  <div className="flex gap-4 text-indigo-700">
                    <Link to={`/edit/${note._id}`}>
                      <button
                        aria-label="Edit note"
                        className="hover:text-indigo-900 transition"
                      >
                        <Pencil size={24} />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteNote(note._id)}
                      aria-label="Delete note"
                      className="hover:text-red-600 transition"
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={otherRef}>
          <h2 className="text-3xl font-bold mb-8 text-indigo-800 flex items-center gap-3">
            🗂️ Other Notes
            {notPinnedList.length === 0 && (
              <span className="text-lg font-normal text-gray-500">No notes found</span>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {notPinnedList.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-80 cursor-pointer transform transition-shadow duration-300 hover:shadow-2xl hover:scale-[1.03]"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-3 truncate">
                    {note.subject}
                  </h3>
                  <p className="text-gray-700 line-clamp-6">{note.text}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => togglePin(note._id)}
                    className="rounded-full px-5 py-1 text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                    aria-label="Pin note"
                  >
                    📍 Pin
                  </button>
                  <div className="flex gap-4 text-indigo-700">
                    <Link to={`/edit/${note._id}`}>
                      <button
                        aria-label="Edit note"
                        className="hover:text-indigo-900 transition"
                      >
                        <Pencil size={24} />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteNote(note._id)}
                      aria-label="Delete note"
                      className="hover:text-red-600 transition"
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
