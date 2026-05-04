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

      {/* ✅ IMPROVED STYLING */}
      <style>{`
        .content-area {
          padding: 28px;
          background: #f1f5f9;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 22px;
          margin-bottom: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
        }

        /* ✨ hover lift */
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 35px rgba(0,0,0,0.12);
        }

        h2 {
          font-size: 26px;
          margin-bottom: 6px;
          color: #0f172a;
        }

        h3 {
          margin-bottom: 14px;
          font-size: 18px;
          color: #0f172a;
        }

        p {
          color: #64748b;
        }

        /* INPUTS */
        input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          outline: none;
          transition: 0.25s;
        }

        input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }

        /* BUTTONS */
        button {
          margin-right: 10px;
          padding: 9px 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
        }

        /* PRIMARY */
        .primary-btn {
          background: #2563eb;
          color: white;
          box-shadow: 0 6px 15px rgba(37,99,235,0.35);
        }

        /* DANGER BUTTONS */
        .danger-btn {
          background: #ef4444;
          color: white;
          box-shadow: 0 6px 15px rgba(239,68,68,0.35);
        }

        /* GRID */
        .status-row {
          display: flex;
          gap: 30px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        /* TOGGLE SWITCH */
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
          box-shadow: 0 0 10px rgba(37,99,235,0.6);
        }

        input:checked + .slider:before {
          transform: translateX(22px);
        }

      `}</style>

      <div style={{ marginBottom: '26px' }}>
        <h2>System Control Panel</h2>
        <p>Configure system-wide settings and monitor operations</p>
      </div>

      {/* STATUS */}
      <div className="card">
        <h3>⚙️ System Status</h3>

        <div className="status-row">
          <div>🗄️ Database: <b style={{ color: '#16a34a' }}>Operational</b></div>
          <div>⏻ Server: <b style={{ color: '#16a34a' }}>Running</b></div>
          <div>⏱️ Uptime: <b>47 days</b></div>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="card">
        <h3>⚙️ System Settings</h3>

        <div className="toggle-row">
          <span>Maintenance Mode</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={maintenanceMode} onChange={(e) => handleToggle('maintenance', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <span>Auto Backups</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={autoBackups} onChange={(e) => handleToggle('backups', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
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
          className="primary-btn"
          style={{ marginTop: '16px' }}
        >
          Save Configuration
        </button>
      </div>

      {/* DANGER */}
      <div className="card">
        <h3>⚠️ Dangerous Actions</h3>

        <button className="danger-btn" onClick={() => handleDangerousAction('cache')}>Clear Cache</button>
        <button className="danger-btn" onClick={() => handleDangerousAction('backup')}>Force Backup</button>
        <button className="danger-btn" onClick={() => handleDangerousAction('reset')}>Reset Sessions</button>
      </div>

    </div>
  );
};

export default SystemControl;