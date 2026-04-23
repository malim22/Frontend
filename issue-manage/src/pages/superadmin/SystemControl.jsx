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
      alert("Manual database backup triggered.");
    } else if (action === 'reset') {
      if (window.confirm("CRITICAL WARNING: Reset all sessions?")) {
        alert("All sessions have been reset.");
      }
    }
  };

  return (
    <div className="content-area">

      {/* ✅ GLOBAL STYLING */}
      <style>{`
        .content-area {
          padding: 24px;
          background: #f8fafc;
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }

        .card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        button {
          transition: 0.2s;
        }

        button:hover {
          opacity: 0.9;
        }

        /* ✅ TOGGLE SWITCH FIX */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #cbd5e1;
          border-radius: 34px;
          transition: .3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: .3s;
        }

        input:checked + .slider {
          background-color: #2563eb;
        }

        input:checked + .slider:before {
          transform: translateX(22px);
        }

      `}</style>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', margin: 0 }}>System Control Panel</h2>
        <p style={{ margin: 0, color: '#64748b' }}>
          Configure system-wide settings and monitor operations
        </p>
      </div>

      {/* STATUS */}
      <div className="card">
        <h3>⚙️ System Status</h3>

        <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
          <div>🗄️ Database: <b style={{ color: '#16a34a' }}>Operational</b></div>
          <div>⏻ Server: <b style={{ color: '#16a34a' }}>Running</b></div>
          <div>⏱️ Uptime: <b>47 days</b></div>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="card">
        <h3>⚙️ System Settings</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <span>Maintenance Mode</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={maintenanceMode} onChange={(e) => handleToggle('maintenance', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <span>Auto Backups</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={autoBackups} onChange={(e) => handleToggle('backups', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <span>Email Notifications</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={emailNotifs} onChange={(e) => handleToggle('emails', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* CONFIG */}
      <div className="card">
        <h3>🛡️ System Configuration</h3>

        <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
          <input type="number" value={config.slaHours} onChange={e => setConfig({...config, slaHours: e.target.value})} />
          <input type="number" value={config.loginAttempts} onChange={e => setConfig({...config, loginAttempts: e.target.value})} />
          <input type="number" value={config.sessionTimeout} onChange={e => setConfig({...config, sessionTimeout: e.target.value})} />
          <input type="number" value={config.passwordExpiry} onChange={e => setConfig({...config, passwordExpiry: e.target.value})} />
        </div>

        <button
          onClick={handleSaveConfig}
          style={{ marginTop: '16px', background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none' }}
        >
          Save Configuration
        </button>
      </div>

      {/* DANGER */}
      <div className="card">
        <h3>⚠️ Dangerous Actions</h3>

        <button onClick={() => handleDangerousAction('cache')}>Clear Cache</button>
        <button onClick={() => handleDangerousAction('backup')}>Force Backup</button>
        <button onClick={() => handleDangerousAction('reset')}>Reset Sessions</button>
      </div>

    </div>
  );
};

export default SystemControl;