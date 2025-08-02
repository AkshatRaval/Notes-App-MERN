import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const CreateNote = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    subject: '',
    text: '',
    isPinned: false,
  });

  useEffect(() => {
    // Animate container on mount
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, isPinned: e.target.checked }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post('http://localhost:8000/notes/', formData);
      console.log('Saved:', res.data);
      setFormData({ subject: '', text: '', isPinned: false });
      navigate('/'); // Redirect to Home
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ subject: '', text: '', isPinned: false });
    navigate('/'); // Optional: go back home on cancel
  };

  return (
    <section className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between px-8 py-4 bg-blue-800 text-white shadow">
        <h1 className="text-2xl md:text-3xl font-bold">📝 Make New Note</h1>
      </header>

      <div
        ref={containerRef}
        className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-xl font-medium mb-2">
            📌 Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject here..."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="text" className="text-xl font-medium mb-2">
            🗒️ Note Text
          </label>
          <textarea
            id="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your note..."
            rows={6}
            className="border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="pin"
            checked={formData.isPinned}
            onChange={handleCheckboxChange}
            className="w-5 h-5 accent-blue-600"
          />
          <label htmlFor="pin" className="text-lg">📍 Pin this note</label>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
            onClick={handleCancel}
          >
            <X size={18} /> Cancel
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            onClick={handleSave}
          >
            <Save size={18} /> Save Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateNote;
