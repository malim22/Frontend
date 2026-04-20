import React, { useState } from 'react';

const Notifications = ({ notifications, markAllAsRead, deleteNotification, markAsRead }) => {
  const [expandedId, setExpandedId] = useState(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type) => {
    switch(type) {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 className="page-title" style={{ fontSize: '24px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            Alerts & Notifications
            {unreadCount > 0 && (
              <span style={{ fontSize: '12px', background: '#dc2626', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                {unreadCount} New
              </span>
            )}
          </h2>
          <p className="page-subtitle" style={{ margin: '4px 0 0 0' }}>View system alerts, security warnings, and important updates</p>
        </div>
        
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            ✓ Mark all as read
          </button>
        )}
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
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
                background: notif.isRead ? '#ffffff' : '#f8fafc',
                transition: '0.2s'
              }}>
                
                <div 
                  onClick={() => handleNotificationClick(notif.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', cursor: 'pointer' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: style.bg, color: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {style.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, color: notif.isRead ? '#334155' : '#0f172a', fontSize: '15px', fontWeight: notif.isRead ? '500' : '700' }}>
                        {notif.title}
                      </h4>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{notif.time}</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: notif.isRead ? '#64748b' : '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '600px' }}>
                      {notif.message}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#94a3b8', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}>▼</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
                      title="Delete Notification"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 24px 20px 80px' }}>
                    <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                      <strong style={{ display: 'block', marginBottom: '8px', color: '#0f172a' }}>Detailed Information:</strong>
                      {notif.message}
                      
                      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                        <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                          Take Action
                        </button>
                        <button onClick={() => setExpandedId(null)} style={{ background: 'white', color: '#475569', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                          Close
                        </button>
                      </div>
                    </div>
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