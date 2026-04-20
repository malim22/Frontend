import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../../api";

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getArticles();

        const formatted = res.map((a) => ({
          title: a.title,
          desc: a.description,
          category: a.categoryName,
          date: new Date(a.updatedAt || a.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
        }));

        setArticles(formatted);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  const filtered = articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      a.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", "IT Support", "HR", "Facilities", "Finance", "Other"];

  return (
    <div className="kb-container">
      <style>{`
        .kb-container {
          padding: 20px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }

        /* ✅ FIXED: DO NOT hide global cursor */
        /* REMOVED: cursor none bug */

        input, textarea {
          cursor: text !important;
        }

        button, .link {
          cursor: pointer !important;
        }

        h1 { margin: 0 0 10px 0; font-size: 28px; font-weight: 600; }
        p.subtitle { color: #666; margin-bottom: 15px; }

        input, select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
        }

        button.hover-glow:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transform: translateY(-3px);
          transition: all 0.3s ease;
        }

        @keyframes slideFromLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .slide-left { opacity: 0; animation: slideFromLeft 0.4s forwards; }

        .search-row { display: flex; gap: 10px; margin-bottom: 15px; }
        .search-btn {
          background: #2563eb;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .categories { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }

        .cat-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .articles-list { display: flex; flex-direction: column; gap: 15px; }

        .article-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .article-card:hover {
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
          transform: translateY(-3px);
        }

        .desc { color: #555; margin-top: 5px; }
        .meta { margin-top: 8px; font-size: 12px; color: #888; }

        .footer { margin-top: 20px; font-size: 14px; }

        .link {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>

      <h1>Knowledge Base</h1>
      <p className="subtitle">Find answers before raising a ticket</p>

      <div className="search-row">
        <input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="hover-glow slide-left"
        />

        <button className="search-btn hover-glow slide-left">
          Search
        </button>
      </div>

      <div className="categories slide-left">
        {categories.map((c, i) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="cat-btn hover-glow"
            style={{
              background: category === c ? "#2563eb" : "#e5e7eb",
              color: category === c ? "white" : "black",
              animationDelay: `${0.25 + i * 0.05}s`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="articles-list">
        {filtered.map((a, i) => (
          <div
            key={i}
            className="article-card slide-left"
            style={{ animationDelay: `${0.3 + i * 0.05}s` }}
          >
            <h3>{a.title}</h3>
            <p className="desc">{a.desc}</p>
            <p className="meta">
              {a.category} · Updated {a.date}
            </p>
          </div>
        ))}
      </div>

      <div className="footer">
        Didn't find what you need?{" "}
        <span
          className="link"
          onClick={() => {
            navigate("/user/new");
            window.scrollTo(0, 0);
          }}
        >
          Raise a ticket →
        </span>
      </div>
    </div>
  );
}