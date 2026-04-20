import React, { useState } from 'react';

const SystemControl = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackups, setAutoBackups] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);

  const [config, setConfig] = useState({
    slaHours: 48,
    loginAttempts: 5,
    sessionTimeout: 30,
    passwordExpiry: 90
  });

  const handleToggle = (setting, value) => {
    if (setting === 'maintenance') {
      setMaintenanceMode(value);
      if (value) alert("Warning: System is now in Maintenance Mode!");
    }
    if (setting === 'backups') setAutoBackups(value);
    if (setting === 'emails') setEmailNotifs(value);
  };

  const handleSaveConfig = () => {
    alert(`Configuration Saved Successfully!\n\nSLA: ${config.slaHours} hrs\nMax Logins: ${config.loginAttempts}\nTimeout: ${config.sessionTimeout} mins\nExpiry: ${config.passwordExpiry} days`);
  };

  const handleDangerousAction = (action) => {
    if (action === 'cache') {
      alert("System cache cleared successfully!");
    } else if (action === 'backup') {
      alert("Manual database backup triggered. This may take a few minutes.");
    } else if (action === 'reset') {
      if (window.confirm("CRITICAL WARNING: Are you sure you want to log out all active users immediately?")) {
        alert("All sessions have been reset.");
      }
    }
  };

  return (
    <div className="content-area">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="page-title" style={{ fontSize: '24px', margin: 0 }}>System Control Panel</h2>
        <p className="page-subtitle" style={{ margin: 0 }}>Configure system-wide settings and monitor operations</p>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚙️ System Status
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '20px' }}>🗄️</div>
            <div><div style={{ fontSize: '12px', color: '#64748b' }}>Database</div><div style={{ color: '#16a34a', fontWeight: '600' }}>Operational</div></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '20px' }}>⏻</div>
            <div><div style={{ fontSize: '12px', color: '#64748b' }}>Server Status</div><div style={{ color: '#16a34a', fontWeight: '600' }}>Running</div></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontSize: '20px' }}>⏱️</div>
            <div><div style={{ fontSize: '12px', color: '#64748b' }}>Uptime</div><div style={{ color: '#0f172a', fontWeight: '600' }}>47 days 12h</div></div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚙️ System Settings
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: '#64748b', fontSize: '20px', marginTop: '2px' }}>⏻</div>
            <div>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>Maintenance Mode</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Put the system in maintenance mode. Users will not be able to access the platform.</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={maintenanceMode} onChange={(e) => handleToggle('maintenance', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: '#3b82f6', fontSize: '20px', marginTop: '2px', background: '#eff6ff', padding: '4px 8px', borderRadius: '6px' }}>🗄️</div>
            <div>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>Automatic Backups</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Enable daily automatic database backups at 2:00 AM UTC.<br/><span style={{fontSize: '11px', color: '#94a3b8'}}>Last backup: March 29, 2026 at 2:00 AM</span></p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={autoBackups} onChange={(e) => handleToggle('backups', e.target.checked)} />
            <span className="slider" style={autoBackups ? {backgroundColor: '#2563eb'} : {}}></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: '#9333ea', fontSize: '20px', marginTop: '2px', background: '#f3e8ff', padding: '4px 8px', borderRadius: '6px' }}>🔔</div>
            <div>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>Email Notifications</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Send email notifications for critical system events and alerts.</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={emailNotifs} onChange={(e) => handleToggle('emails', e.target.checked)} />
            <span className="slider" style={emailNotifs ? {backgroundColor: '#9333ea'} : {}}></span>
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛡️ System Configuration
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Default SLA Hours</label>
            <input type="number" value={config.slaHours} onChange={e => setConfig({...config, slaHours: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Max Login Attempts</label>
            <input type="number" value={config.loginAttempts} onChange={e => setConfig({...config, loginAttempts: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Session Timeout (minutes)</label>
            <input type="number" value={config.sessionTimeout} onChange={e => setConfig({...config, sessionTimeout: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#475569', fontWeight: '500' }}>Password Expiry (days)</label>
            <input type="number" value={config.passwordExpiry} onChange={e => setConfig({...config, passwordExpiry: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
          </div>
        </div>

        <button onClick={handleSaveConfig} className="btn-primary" style={{ background: '#2563eb', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>
          Save Configuration
        </button>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ea580c' }}>⚠️</span> Dangerous Actions
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', marginBottom: '16px' }}>
          <div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>Clear Cache</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>Clear all system cache. This may temporarily slow down performance.</p>
          </div>
          <button onClick={() => handleDangerousAction('cache')} style={{ background: '#ea580c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Clear Cache</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '16px' }}>
          <div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>Force Backup Now</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>Trigger an immediate database backup. This may take several minutes.</p>
          </div>
          <button onClick={() => handleDangerousAction('backup')} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Force Backup</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
          <div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>Reset All Sessions</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>Log out all active users immediately. Use only in emergency situations.</p>
          </div>
          <button onClick={() => handleDangerousAction('reset')} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Reset Sessions</button>
        </div>

      </div>
    </div>
  );
};

export default SystemControl;