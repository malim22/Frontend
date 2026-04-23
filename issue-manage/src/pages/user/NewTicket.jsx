import { useState } from "react";
import { createTicket } from "../../api";

export default function NewTicket() {
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState(""); // ✅ added
  const [description, setDescription] = useState(""); // ✅ added

  const mapPriority = (p) => {
    const map = {
      L: "P4",
      M: "P3",
      H: "P2",
      C: "P1",
    };
    return map[p] || "P3";
  };

  // ✅ API SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ ADD HERE
    if (!priority) {
      alert("Please select priority ⚠️");
      return;
    }


    try {
      await createTicket({
        title: title,
        description: description,
        categoryId: Number(category), // ✅ must be number ID
        priority: mapPriority(priority) // ✅ convert to P1/P2/P3/P4
      });

      alert("Ticket created successfully ✅");

      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");

    } catch (err) {
      console.error("API ERROR:", err);

      // 🔥 SMART ERROR HANDLING
      if (err.message?.includes("Failed to fetch")) {
        alert("Backend server is not running ⚠️");
      } else if (err.message?.includes("404")) {
        alert("API endpoint not found ⚠️");
      } else {
        alert("Backend is not ready yet 🚧");
      }
    }
  };

  return (
    <div className="new-ticket-container">
      {/* 🔹 GLOBAL CSS */}
      <style>{`
        .new-ticket-container {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
          cursor: auto; /* ✅ FIXED */
          font-family: Arial, sans-serif;
        }

        p, h1 {
          margin: 0 0 10px 0;
        }

        p.breadcrumb {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }

        h1.title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 500px;
        }

        input,
        select,
        textarea {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
        }

        .priority-box {
          display: flex;
          gap: 10px;
        }

        .priority-btn {
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          background: #e5e7eb;
          color: black;
          transition: all 0.3s ease;
        }

        .priority-btn.active {
          background: #2563eb;
          color: white;
        }

        .upload-box {
          border: 2px dashed #ddd;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          background: #fafafa;
        }

        .upload-text {
          margin-top: 10px;
          font-size: 12px;
          color: #666;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .cancel {
          background: #e5e7eb;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .submit {
          background: #2563eb;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .suggested {
          margin-top: 30px;
        }

        .suggested h3 {
          margin-bottom: 5px;
        }

        .suggested-text {
          color: #666;
        }

        .hover-glow:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transform: translateY(-3px);
          transition: all 0.3s ease;
        }

        @keyframes slideFromLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .slide-left {
          opacity: 0;
          animation: slideFromLeft 0.4s forwards;
        }
      `}</style>

      <p className="breadcrumb">My Tickets / New Ticket</p>
      <h1 className="title">New Ticket</h1>

      {/* ✅ CONNECTED FORM */}
      <form onSubmit={handleSubmit}>
        <label className="slide-left" style={{ animationDelay: "0.1s" }}>Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of your issue"
          required
          className="hover-glow slide-left"
          style={{ animationDelay: "0.15s" }}
        />

        <label className="slide-left" style={{ animationDelay: "0.2s" }}>Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="hover-glow slide-left"
          style={{ animationDelay: "0.25s" }}
        >
          <option value="">Select a category...</option>
          <option value="1">IT Support</option>
          <option value="2">HR</option>
          <option value="3">Facilities</option>
          <option value="4">Finance</option>
          <option value="5">Other</option>
        </select>

        <label className="slide-left" style={{ animationDelay: "0.3s" }}>Priority *</label>
        <div className="priority-box">
          {["L", "M", "H", "C"].map((p, i) => (
            <button
              type="button"
              key={p}
              onClick={() => setPriority(p)}
              className={`priority-btn hover-glow slide-left ${priority === p ? "active" : ""}`}
              style={{ animationDelay: `${0.35 + i * 0.05}s` }}
            >
              {p}
            </button>
          ))}
        </div>

        <label className="slide-left" style={{ animationDelay: "0.55s" }}>Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed information about your issue"
          required
          className="hover-glow slide-left"
          style={{ animationDelay: "0.6s" }}
        />

        <label className="slide-left" style={{ animationDelay: "0.65s" }}>Attachment (optional)</label>
        <div className="upload-box hover-glow slide-left" style={{ animationDelay: "0.7s" }}>
          <input type="file" />
          <p className="upload-text">PDF, PNG, JPG, DOCX — max 5MB</p>
        </div>

        <div className="actions slide-left" style={{ animationDelay: "0.75s" }}>
          <button type="button" className="cancel hover-glow">Cancel</button>
          <button type="submit" className="submit hover-glow">Submit ticket</button>
        </div>
      </form>

      <div className="suggested slide-left" style={{ animationDelay: "0.85s" }}>
        <h3>Suggested articles</h3>
        <p className="suggested-text">Select a category above to see related help articles</p>
      </div>
    </div>
  );
}