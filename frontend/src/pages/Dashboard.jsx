// Dashboard.jsx - Redesigned with dark industrial theme
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x4295Fe81B5068589Eaf77Acc3DAA8f4c48Ae6b6a";
const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/zvKtWt01BmYtOnuZ-9Qpa";
const ABI = ["function shipmentTemperatures(uint256) public view returns (uint256)"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;700;800&display=swap');

  .db-root {
    background: #080c10;
    min-height: 100vh;
    color: #c8d8e8;
    font-family: 'Syne', sans-serif;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  .db-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse 60% 40% at 20% 10%, #00ffe822 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 80% 80%, #0066ff11 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .db-inner {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Header */
  .db-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #1a2830;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  .db-brand {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .db-brand-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #00ffe8;
    text-transform: uppercase;
  }

  .db-brand-title {
    font-size: 22px;
    font-weight: 800;
    color: #e8f4f8;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0;
  }

  .db-live-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #0a1a14;
    border: 1px solid #00ffe833;
    padding: 6px 12px;
    border-radius: 2px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #00ffe8;
    letter-spacing: 0.1em;
  }

  .db-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ffe8;
    animation: blink 1.4s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  /* Big temp panel */
  .db-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .db-temp-panel {
    background: #090e14;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .db-panel-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a5060;
  }

  .db-temp-value {
    font-family: 'Share Tech Mono', monospace;
    font-size: 72px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.02em;
    transition: color 0.5s ease;
  }

  .db-temp-unit {
    font-size: 24px;
    color: #3a5060;
    margin-left: 4px;
  }

  .db-gauge-track {
    height: 3px;
    background: #1a2830;
    border-radius: 2px;
    overflow: hidden;
    margin-top: auto;
  }

  .db-gauge-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.8s ease, background 0.5s ease;
  }

  .db-gauge-labels {
    display: flex;
    justify-content: space-between;
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    color: #3a5060;
    margin-top: 4px;
  }

  /* Status panel */
  .db-status-panel {
    background: #090e14;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .db-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 2px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-left: 3px solid;
  }

  .db-status-msg {
    font-size: 13px;
    line-height: 1.6;
    color: #6a8898;
    flex: 1;
  }

  .db-timestamp {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #2a3840;
    letter-spacing: 0.08em;
    margin-top: auto;
  }

  /* Threshold strip */
  .db-thresholds {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .db-threshold-cell {
    background: #090e14;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .db-threshold-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .db-threshold-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .db-threshold-range {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #8ab8c8;
  }

  .db-threshold-label {
    font-size: 10px;
    color: #3a5060;
    letter-spacing: 0.05em;
  }

  /* Security card */
  .db-security {
    background: #090e14;
    border: 1px solid #1a2830;
    border-left: 3px solid #00ffe8;
    border-radius: 3px;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .db-security-icon {
    font-size: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .db-security-content h3 {
    font-size: 14px;
    font-weight: 700;
    color: #00ffe8;
    margin: 0 0 8px 0;
    letter-spacing: 0.05em;
  }

  .db-security-content p {
    font-size: 12px;
    color: #4a6878;
    line-height: 1.7;
    margin: 0;
    font-family: 'Share Tech Mono', monospace;
  }

  .db-security-content code {
    color: #00ffe8;
    background: #0a1e18;
    padding: 1px 5px;
    border-radius: 2px;
  }

  /* Error */
  .db-error {
    background: #140a0a;
    border: 1px solid #5a1a1a;
    border-left: 3px solid #e04040;
    border-radius: 3px;
    padding: 12px 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #e04040;
    margin-top: 1.5rem;
    letter-spacing: 0.05em;
  }

  /* Action button */
  .db-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid #e0a040;
    color: #e0a040;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.15s ease;
  }
  .db-action-btn:hover { background: #e0a04018; }

  /* Shipment ID badge */
  .db-shipment-id {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  @media (max-width: 600px) {
    .db-hero { grid-template-columns: 1fr; }
    .db-thresholds { grid-template-columns: 1fr; }
    .db-temp-value { font-size: 52px; }
    .db-topbar { flex-direction: column; gap: 12px; }
  }
`;

const getStatus = (t) => {
  if (t === null) return {
    label: "STANDBY",
    color: "#3a5060",
    bg: "#0a1218",
    borderColor: "#1a3040",
    icon: "◌",
    message: "Awaiting blockchain data. Connecting to Sepolia network..."
  };
  if (t > 39) return {
    label: "CRITICAL BREACH",
    color: "#e04040",
    bg: "#140a0a",
    borderColor: "#e04040",
    icon: "▲",
    message: "Temperature exceeds safety threshold. Immediate action required. Record flagged on-chain."
  };
  if (t > 25) return {
    label: "WARNING",
    color: "#e0a040",
    bg: "#14100a",
    borderColor: "#e0a040",
    icon: "◆",
    message: "Temperature approaching critical threshold. Review sensor calibration and cold chain integrity."
  };
  return {
    label: "NOMINAL",
    color: "#00ffe8",
    bg: "#0a1a18",
    borderColor: "#00ffe8",
    icon: "●",
    message: "All parameters within safe operating range. Cold chain integrity confirmed on-chain."
  };
};

const getTempColor = (t) => {
  if (t === null) return "#3a5060";
  if (t > 39) return "#e04040";
  if (t > 25) return "#e0a040";
  return "#00ffe8";
};

const Dashboard = () => {
  const [temp, setTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchBlockchainData = async () => {
    try {
      setError(null);
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const currentTemp = await contract.shipmentTemperatures(1);
      setTemp(Number(currentTemp));
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("ERR: Unable to fetch on-chain data. Check network connection.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchainData();
    const interval = setInterval(fetchBlockchainData, 10000);
    return () => clearInterval(interval);
  }, []);

  const status = getStatus(temp);
  const safeTemp = temp !== null ? temp : 0;
  const tempColor = getTempColor(temp);
  const gaugeWidth = `${Math.min(100, (safeTemp / 50) * 100)}%`;

  const formatTime = () => {
    if (!lastUpdated) return "—";
    return lastUpdated.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="db-root">
        <div className="db-inner">

          {/* Header */}
          <div className="db-topbar">
            <div className="db-brand">
              <span className="db-brand-tag">Cold Chain Monitor</span>
              <h1 className="db-brand-title">Shipment Tracking</h1>
            </div>
            <div className="db-live-pill">
              <span className="db-live-dot" />
              LIVE · SEPOLIA
            </div>
          </div>

          {/* Hero grid */}
          <div className="db-hero">

            {/* Temperature */}
            <div className="db-temp-panel">
              <span className="db-panel-label">Current Temperature</span>
              <div className="db-temp-value" style={{ color: tempColor }}>
                {isLoading ? '---' : safeTemp}
                <span className="db-temp-unit">°C</span>
              </div>
              <span className="db-shipment-id">SHIPMENT ID #0001 · BLOCKCHAIN RECORD</span>
              <div>
                <div className="db-gauge-track">
                  <div
                    className="db-gauge-fill"
                    style={{ width: gaugeWidth, background: tempColor }}
                  />
                </div>
                <div className="db-gauge-labels">
                  <span>0°C</span>
                  <span>25°C</span>
                  <span>40°C</span>
                  <span>50°C</span>
                </div>
              </div>
              {lastUpdated && (
                <span className="db-timestamp">
                  LAST SYNC {formatTime()} · AUTO-REFRESH 10S
                </span>
              )}
            </div>

            {/* Status */}
            <div className="db-status-panel">
              <span className="db-panel-label">Network Status</span>
              <div
                className="db-status-badge"
                style={{
                  background: status.bg,
                  color: status.color,
                  borderLeftColor: status.borderColor
                }}
              >
                <span>{status.icon}</span>
                <span>{status.label}</span>
              </div>
              <p className="db-status-msg">{status.message}</p>
              {temp !== null && temp > 25 && (
                <button
                  className="db-action-btn"
                  onClick={() => window.location.href = '/audit'}
                >
                  ▶ View Security Audit
                </button>
              )}
              <span className="db-timestamp">
                CONTRACT {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
              </span>
            </div>
          </div>

          {/* Threshold strip */}
          <div className="db-thresholds">
            <div className="db-threshold-cell">
              <span className="db-threshold-dot" style={{ background: '#00ffe8' }} />
              <div className="db-threshold-text">
                <span className="db-threshold-range">0 — 25°C</span>
                <span className="db-threshold-label">Nominal / Safe</span>
              </div>
            </div>
            <div className="db-threshold-cell">
              <span className="db-threshold-dot" style={{ background: '#e0a040' }} />
              <div className="db-threshold-text">
                <span className="db-threshold-range">26 — 39°C</span>
                <span className="db-threshold-label">Warning Zone</span>
              </div>
            </div>
            <div className="db-threshold-cell">
              <span className="db-threshold-dot" style={{ background: '#e04040' }} />
              <div className="db-threshold-text">
                <span className="db-threshold-range">&gt; 39°C</span>
                <span className="db-threshold-label">Critical Breach</span>
              </div>
            </div>
          </div>

          {/* Security info */}
          <div className="db-security">
            <span className="db-security-icon">🔒</span>
            <div className="db-security-content">
              <h3>Immutable Record Protection</h3>
              <p>
                Smart contract enforces{' '}
                <code>require(temp &lt;= 25, "Temperature exceeds safety threshold!")</code>.
                {' '}Blockchain immutability guarantees that once data is recorded or rejected,
                it cannot be altered by any party — including drivers or logistics operators.
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="db-error">⚠ {error}</div>
          )}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
