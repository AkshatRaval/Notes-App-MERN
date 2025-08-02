import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import gsap from 'gsap';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    subject: '',
    text: '',
    isPinned: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/notes/${id}`);
        setFormData({
          subject: res.data.subject,
          text: res.data.text,
          isPinned: res.data.isPinned,
        });
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };
    fetchNote();

    // Animate on mount
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, isPinned: e.target.checked }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/notes/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <section className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-indigo-700 text-white px-6 py-4 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">✏️ Edit Your Note</h1>
      </header>

      <div
        ref={containerRef}
        className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl p-8 shadow-lg space-y-6"
      >
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-lg font-semibold mb-2">
            📌 Subject
          </label>
          <input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g., Grocery List"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="text" className="text-lg font-semibold mb-2">
            🗒️ Note Content
          </label>
          <textarea
            id="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your thoughts..."
            rows={6}
            className="border border-gray-300 rounded-xl px-4 py-3 resize-none text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="pin"
            type="checkbox"
            checked={formData.isPinned}
            onChange={handleCheckboxChange}
            className="w-5 h-5 accent-indigo-600"
          />
          <label htmlFor="pin" className="text-base text-slate-700">
            📍 Pin this note
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-xl transition"
          >
            <X size={18} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditNote;
