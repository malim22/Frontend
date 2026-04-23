import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.2 });

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div style={styles.page} className="page">

            {/* 🔔 Notification Icon (NO CHANGE) */}
            <div
                onClick={() => navigate("/user/notifications")}
                style={{
                    position: "fixed",
                    top: "10px",
                    right: "15px",
                    fontSize: "20px",
                    cursor: "pointer"
                }}
            >
                🔔
            </div>

            {/* ✅ NEW LOGIN BUTTON (TOP RIGHT) */}
            <div
                onClick={() => navigate("/login")}
                style={{
                    position: "fixed",
                    top: "10px",
                    right: "60px",   // shifted left so it doesn't overlap bell
                    padding: "6px 14px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "13px",
                    cursor: "pointer"
                }}
            >
                Login
            </div>

            {/* GLOBAL STYLE (NO CHANGE) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }

                h1, h2 {
                    font-weight: 700;
                }

                button:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 10px 25px rgba(59,130,246,0.35);
                }

                img:hover {
                    transform: scale(1.08);
                }

                p {
                    transition: 0.2s;
                }

                p:hover {
                    color: #1e293b;
                }

                .reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.6s ease;
                }

                .reveal-left {
                    transform: translateX(-80px);
                }

                .reveal-right {
                    transform: translateX(80px);
                }

                .reveal-left.active {
                    opacity: 1;
                    transform: translateX(0);
                }

                .reveal-right.active {
                    opacity: 1;
                    transform: translateX(0);
                }

                .reveal.active:not(.reveal-left):not(.reveal-right) {
                    opacity: 1;
                    transform: translateY(0);
                }

                html, body, #root {
                    height: 100%;
                    margin: 0;
                    overflow-x: hidden;
                }
            `}</style>

            {/* HERO */}
            <section style={styles.hero} className="reveal">
                <h1 style={styles.title}>ResolveGrid</h1>
                <p style={styles.subtitle}>
                    A simple, structured system to manage complaints, tickets, and team workflows with SLA tracking and full transparency.
                </p>

                <button
                    style={styles.mainBtn}
                    onClick={() => {
                        const isLoggedIn = localStorage.getItem("auth");

                        if (isLoggedIn) {
                            navigate("/user");
                        } else {
                            navigate("/login", { state: { redirect: "/user" } });
                        }
                    }}
                >
                    Start as User
                </button>
            </section>

            {/* ABOUT */}
            <section style={styles.row}>
                <div>
                    <h2>Why ResolveGrid?</h2>
                    <p style={styles.text}>
                        ResolveGrid replaces messy WhatsApp chats and emails with a structured ticket system.
                        Every complaint gets tracked, assigned, and resolved with accountability.
                    </p>
                </div>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2950/2950670.png"
                    alt="system"
                    style={styles.img}
                />
            </section>

            {/* USER */}
            <section style={styles.row} className="reveal reveal-left">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" style={styles.img} />
                <div>
                    <h2>User Panel</h2>
                    <p style={styles.text}>
                        Users can create tickets, track their status, and reopen issues if needed.
                    </p>
                    <button style={styles.btn} onClick={() => navigate("/user")}>
                        Go to User →
                    </button>
                </div>
            </section>

            {/* AGENT */}
            <section style={styles.rowReverse} className="reveal reveal-right">
                <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="agent" style={styles.img} />
                <div>
                    <h2>Agent Panel</h2>
                    <p style={styles.text}>
                        Agents pick tickets and resolve efficiently based on SLA.
                    </p>
                    <button style={styles.btn} onClick={() => navigate("/agent")}>
                        Go to Agent →
                    </button>
                </div>
            </section>

            {/* MANAGER */}
            <section style={styles.row} className="reveal reveal-left">
                <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" alt="manager" style={styles.img} />
                <div>
                    <h2>Manager Panel</h2>
                    <p style={styles.text}>
                        Managers monitor escalations and team performance.
                    </p>
                    <button style={styles.btn} onClick={() => navigate("/manager")}>
                        Go to Manager →
                    </button>
                </div>
            </section>

            {/* ADMIN */}
            <section style={styles.rowReverse} className="reveal reveal-right">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="admin" style={styles.img} />
                <div>
                    <h2>Admin Panel</h2>
                    <p style={styles.text}>
                        Admin controls full system and configurations.
                    </p>
                    <button style={styles.btn} onClick={() => navigate("/admin")}>
                        Go to Admin →
                    </button>
                </div>
            </section>

            {/* FEATURES */}
            <section style={styles.section} className="reveal">
                <h2>Core Features</h2>
                <div style={styles.features}>
                    <div style={styles.feature}>✔ Ticket Lifecycle Tracking</div>
                    <div style={styles.feature}>✔ SLA Monitoring</div>
                    <div style={styles.feature}>✔ Role-Based Access</div>
                    <div style={styles.feature}>✔ Audit Logs</div>
                    <div style={styles.feature}>✔ Knowledge Base</div>
                </div>
            </section>

            {/* ✅ NEW JOIN SECTION (ABOVE FOOTER, NOT FOOTER) */}
            <section style={{
                textAlign: "center",
                marginTop: "60px",
                marginBottom: "40px"
            }}>
                <h2>Join ResolveGrid Today 🚀</h2>
                <p style={{ color: "#64748b" }}>
                    Create account or login to manage your tickets smarter.
                </p>

                <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "12px" }}>
                    <button style={styles.mainBtn} onClick={() => navigate("/login")}>
                        Login
                    </button>

                    <button style={{ ...styles.mainBtn, background: "#16a34a" }} onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </div>
            </section>

            {/* FOOTER (NO CHANGE) */}
            <footer style={styles.footer}>
                <div style={styles.footerContainer}>
                    <div style={styles.footerRow}>
                        <div style={styles.footerColWide}>
                            <h2 style={styles.footerLogo}>ResolveGrid</h2>
                            <p style={styles.footerText}>
                                Smart ticket management system with SLA tracking.
                            </p>
                        </div>

                        <div style={styles.footerCol}>
                            <h4 style={styles.footerHeading}>Services</h4>
                            <p style={styles.footerLink}>Tickets</p>
                            <p style={styles.footerLink}>SLA</p>
                        </div>

                        <div style={styles.footerCol}>
                            <h4 style={styles.footerHeading}>Product</h4>
                            <p style={styles.footerLink}>User Panel</p>
                            <p style={styles.footerLink}>Agent Panel</p>
                        </div>

                        <div style={styles.footerCol}>
                            <h4 style={styles.footerHeading}>Contact</h4>
                            <p style={styles.footerText}>support@resolvegrid.com</p>
                            <p style={styles.footerText}>India</p>
                        </div>
                    </div>
                </div>

                <div style={styles.footerBottom}>
                    © {new Date().getFullYear()} ResolveGrid
                </div>
            </footer>
        </div>
    );
}

/* STYLES SAME — NO CHANGE */

/* ================= STYLES ================= */

const styles = {
    page: {
        fontFamily: "sans-serif",
        background: "#eef2f7",
        padding: "40px 0",
        lineHeight: "1.7"
    },

    hero: {
        textAlign: "center",
        marginBottom: "70px"
    },

    title: {
        fontSize: "48px",
        marginBottom: "10px"
    },

    subtitle: {
        color: "#64748b",
        maxWidth: "600px",
        margin: "auto",
        marginBottom: "25px"
    },

    mainBtn: {
        padding: "12px 22px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.3s"
    },

    section: {
        textAlign: "center",
        marginBottom: "70px"
    },

    text: {
        color: "#475569",
        maxWidth: "500px"
    },

    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        marginBottom: "70px",
        flexWrap: "wrap"
    },

    rowReverse: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        marginBottom: "70px",
        flexWrap: "wrap"
    },

    img: {
        width: "120px",
        transition: "0.3s"
    },

    btn: {
        marginTop: "12px",
        padding: "10px 18px",
        border: "none",
        background: "#3b82f6",
        color: "white",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.3s"
    },

    features: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "18px"
    },

    feature: {
        background: "#ffffff",
        padding: "12px 18px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    },

    footer: {
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        width: "100%",
        marginTop: "80px"
    },

    footerContainer: {
        maxWidth: "1100px",
        margin: "auto",
        padding: "60px 20px"
    },

    footerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap"
    },

    footerColWide: {
        flex: "2"
    },

    footerCol: {
        flex: "1",
        minWidth: "140px"
    },

    footerLogo: {
        marginBottom: "12px",
        color: "#ffffff"
    },

    footerHeading: {
        marginBottom: "12px",
        fontSize: "14px",
        color: "#e2e8f0"
    },

    footerText: {
        fontSize: "13px",
        color: "#94a3b8"
    },

    footerLink: {
        fontSize: "13px",
        marginBottom: "8px",
        color: "#cbd5f5",
        cursor: "pointer"
    },

    footerBottom: {
        textAlign: "center",
        padding: "18px",
        fontSize: "12px",
        color: "#94a3b8",
        borderTop: "1px solid #1e293b"
    },


};