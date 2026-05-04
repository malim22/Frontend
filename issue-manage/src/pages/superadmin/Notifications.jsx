import React, { useState } from 'react';

const Notifications = ({
  notifications = [],   // ✅ FIX: default value
  markAllAsRead = () => { },
  deleteNotification = () => { },
  markAsRead = () => { }
}) => {

  const [expandedId, setExpandedId] = useState(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type) => {
    switch (type) {
      case 'CRITICAL': return { icon: '🚨', bg: '#fee2e2', color: '#dc2626' };
      case 'SUCCESS': return { icon: '✅', bg: '#dcfce7', color: '#16a34a' };
      case 'WARNING': return { icon: '⚠️', bg: '#fef3c7', color: '#d97706' };
      case 'INFO': return { icon: 'ℹ️', bg: '#eff6ff', color: '#2563eb' };
      default: return { icon: '🔔', bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const handleNotificationClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
    markAsRead(id);
  };

  return (
    <div className="content-area">

      {/* ✅ ADDED GLOBAL STYLING */}
      <style>{`
  .content-area {
    padding: 28px;
    background: #f4f7fb;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    color: #1e293b;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  p {
    font-size: 14px;
  }

  /* ---------- BUTTON ---------- */
  button {
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  /* ---------- MAIN CARD ---------- */
  .content-area > div:nth-of-type(2) {
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    overflow: hidden;
  }

  /* ---------- NOTIFICATION ROW ---------- */
  .content-area > div:nth-of-type(2) > div {
    transition: all 0.25s ease;
  }

  .content-area > div:nth-of-type(2) > div:hover {
    background: #f1f5ff !important;
    transform: translateX(4px);
  }

  /* ---------- ITEM INNER ---------- */
  .content-area > div:nth-of-type(2) > div > div {
    transition: all 0.2s ease;
  }

  /* ---------- ICON GLOW ---------- */
  .content-area > div:nth-of-type(2) > div > div > div:first-child {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: all 0.25s ease;
  }

  .content-area > div:nth-of-type(2) > div:hover > div > div:first-child {
    box-shadow: 0 0 12px rgba(37, 99, 235, 0.4);
    transform: scale(1.05);
  }

  /* ---------- TEXT ---------- */
  h4 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 3px;
  }

  /* ---------- EXPAND AREA ---------- */
  .content-area > div:nth-of-type(2) > div > div:last-child {
    animation: slideDown 0.25s ease;
  }

  /* ---------- EMPTY STATE ---------- */
  .content-area div[style*="text-align: center"] {
    opacity: 0.8;
  }

  /* ---------- ANIMATIONS ---------- */
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            Alerts & Notifications

            {unreadCount > 0 && (
              <span style={{
                fontSize: '12px',
                background: '#dc2626',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}>
                {unreadCount} New
              </span>
            )}
          </h2>

          <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>
            View system alerts, security warnings, and important updates
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ✓ Mark all as read
          </button>
        )}
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>

        {notifications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
            No new notifications. You're all caught up!
          </div>
        ) : (

          notifications.map((notif) => {
            const style = getIcon(notif.type);
            const isExpanded = expandedId === notif.id;

            return (
              <div key={notif.id} style={{
                borderBottom: '1px solid #f1f5f9',
                background: notif.isRead ? '#ffffff' : '#f8fafc'
              }}>

                <div
                  onClick={() => handleNotificationClick(notif.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    cursor: 'pointer'
                  }}
                >

                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: style.bg,
                    color: style.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {style.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0 }}>
                      {notif.title}
                    </h4>
                    <p style={{ margin: 0, color: '#64748b' }}>
                      {notif.message}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    ×
                  </button>

                </div>

                {isExpanded && (
                  <div style={{ padding: '10px 20px', background: '#f1f5f9' }}>
                    {notif.message}
                  </div>
                )}

              </div>
            );
          })

        )}

      </div>
    </div>
  );
};

export default Notifications;