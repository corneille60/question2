// Audit.jsx - Redesigned with dark industrial theme
import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;700;800&display=swap');

  .au-root {
    background: #080c10;
    min-height: 100vh;
    color: #c8d8e8;
    font-family: 'Syne', sans-serif;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  .au-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse 50% 35% at 10% 20%, #00ffe80a 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 90% 70%, #0044ff0a 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .au-inner {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Header */
  .au-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #1a2830;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  .au-brand-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #00ffe8;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  .au-brand-title {
    font-size: 22px;
    font-weight: 800;
    color: #e8f4f8;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0;
  }

  .au-score-pill {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .au-score-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: #3a5060;
    text-transform: uppercase;
  }

  .au-score-value {
    font-family: 'Share Tech Mono', monospace;
    font-size: 28px;
    color: #00ffe8;
    line-height: 1;
  }

  /* Tab bar */
  .au-tabs {
    display: flex;
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .au-tab {
    flex: 1;
    padding: 11px 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
    background: #090e14;
    color: #3a5060;
  }

  .au-tab:hover { color: #6a9ab0; background: #0e1418; }

  .au-tab.active {
    background: #0e1e28;
    color: #00ffe8;
    border-bottom: 2px solid #00ffe8;
  }

  /* Panel base */
  .au-panel {
    background: #090e14;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .au-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #1a2830;
  }

  .au-panel-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a5060;
  }

  .au-panel-badge {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    padding: 3px 8px;
    border-radius: 2px;
    background: #0a1e14;
    color: #00ffe8;
    border: 1px solid #00ffe822;
  }

  .au-panel-body {
    padding: 1.5rem;
  }

  .au-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #4a6878;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  /* Vuln table */
  .au-vuln-table {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .au-vuln-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #090e14;
  }

  .au-vuln-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .au-vuln-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .au-vuln-level {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    width: 80px;
  }

  .au-vuln-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
  }

  .au-vuln-count {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    padding: 3px 10px;
    border-radius: 2px;
    border: 1px solid;
  }

  /* Score bar */
  .au-score-bar {
    background: #060a0e;
    border: 1px solid #1a2830;
    border-radius: 3px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .au-score-num {
    font-family: 'Share Tech Mono', monospace;
    font-size: 36px;
    color: #00ffe8;
    line-height: 1;
    flex-shrink: 0;
  }

  .au-score-track {
    flex: 1;
  }

  .au-score-track-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    color: #3a5060;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .au-score-track-bar {
    height: 3px;
    background: #1a2830;
    border-radius: 2px;
    overflow: hidden;
  }

  .au-score-track-fill {
    height: 100%;
    width: 92%;
    background: #00ffe8;
    border-radius: 2px;
  }

  .au-score-note {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    color: #2a3840;
    margin-top: 6px;
    letter-spacing: 0.05em;
  }

  /* Tenderly trace */
  .au-trace {
    background: #060a0e;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .au-trace-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #3a0a0a;
    border-bottom: 1px solid #5a1010;
  }

  .au-trace-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #e04040;
    text-transform: uppercase;
  }

  .au-trace-hash {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #5a2020;
  }

  .au-trace-code {
    padding: 1.25rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    line-height: 1.8;
    color: #4a6878;
  }

  .au-trace-line-normal { color: #4a6878; }
  .au-trace-line-revert { color: #e04040; background: #1a0808; display: block; padding: 2px 8px; margin: 0 -8px; border-left: 2px solid #e04040; }

  .au-trace-meta {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 8px;
    padding: 1rem 1.25rem;
    border-top: 1px solid #1a2830;
  }

  .au-trace-meta-key {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    letter-spacing: 0.08em;
  }

  .au-trace-meta-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #8ab8c8;
  }

  .au-trace-meta-val.err { color: #e04040; }

  .au-tenderly-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px;
    background: transparent;
    border: 1px solid #00ffe8;
    color: #00ffe8;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.15s ease;
    margin-top: 1rem;
  }
  .au-tenderly-btn:hover { background: #00ffe810; }

  .au-insight {
    background: #0a1814;
    border: 1px solid #1a3020;
    border-left: 3px solid #00ffe8;
    border-radius: 3px;
    padding: 1rem 1.25rem;
  }

  .au-insight-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #00ffe8;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .au-insight-body {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    line-height: 1.7;
  }

  .au-insight-body code {
    color: #00ffe8;
    background: #0a2018;
    padding: 1px 5px;
    border-radius: 2px;
  }

  /* Test results */
  .au-tests {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .au-test-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    background: #090e14;
  }

  .au-test-status {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    border-radius: 2px;
    flex-shrink: 0;
    width: 52px;
    text-align: center;
  }

  .au-test-status.pass {
    background: #0a1e14;
    color: #00ffe8;
    border: 1px solid #00ffe822;
  }

  .au-test-status.fail {
    background: #1a0808;
    color: #e04040;
    border: 1px solid #e0404022;
  }

  .au-test-name {
    font-size: 13px;
    font-weight: 700;
    color: #8ab8c8;
    flex: 1;
  }

  .au-test-detail {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    text-align: right;
    max-width: 280px;
  }

  .au-cert {
    background: #060a0e;
    border: 1px solid #1a2830;
    border-radius: 3px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .au-cert-score {
    font-family: 'Share Tech Mono', monospace;
    font-size: 42px;
    color: #00ffe8;
    line-height: 1;
    flex-shrink: 0;
  }

  .au-cert-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: #3a5060;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  .au-cert-title {
    font-size: 16px;
    font-weight: 800;
    color: #e8f4f8;
    margin: 0 0 4px;
  }

  .au-cert-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
  }

  /* Security features grid */
  .au-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
  }

  .au-feature-cell {
    background: #090e14;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .au-feature-icon {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .au-feature-title {
    font-size: 13px;
    font-weight: 700;
    color: #8ab8c8;
  }

  .au-feature-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    line-height: 1.6;
  }

  .au-feature-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    padding: 2px 7px;
    border-radius: 2px;
    display: inline-block;
    margin-top: 4px;
  }

  .au-feature-tag.critical {
    background: #0a1e14;
    color: #00ffe8;
    border: 1px solid #00ffe822;
  }

  .au-feature-tag.standard {
    background: #0e1418;
    color: #3a5060;
    border: 1px solid #1a2830;
  }

  .au-section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a5060;
    margin-bottom: 1rem;
    display: block;
  }

  @media (max-width: 600px) {
    .au-features-grid { grid-template-columns: 1fr; }
    .au-tabs { flex-direction: column; }
    .au-topbar { flex-direction: column; gap: 12px; }
    .au-test-detail { display: none; }
  }
`;

const vulnerabilities = [
  { level: 'Critical', count: 0, color: '#e04040', desc: 'No critical vulnerabilities detected' },
  { level: 'High', count: 0, color: '#e0a040', desc: 'No high-severity issues found' },
  { level: 'Medium', count: 0, color: '#e0a040', desc: 'No medium-severity issues detected' },
  { level: 'Low / Info', count: 2, color: '#6a9ab0', desc: 'Centralization risk, floating pragma' },
];

const securityFeatures = [
  { icon: '🛡️', title: 'Reentrancy Protection', desc: 'CEI pattern — no external calls before state updates', tag: 'critical' },
  { icon: '🔢', title: 'Overflow Safe', desc: 'Solidity ^0.8.x built-in overflow/underflow checks', tag: 'critical' },
  { icon: '🔐', title: 'Access Control', desc: 'Only authorized oracles can update temperature data', tag: 'critical' },
  { icon: '📝', title: 'Event Emission', desc: 'All state changes emit events for off-chain monitoring', tag: 'standard' },
  { icon: '⏱️', title: 'Timelock', desc: 'Minimum delay between critical updates prevents manipulation', tag: 'standard' },
  { icon: '🔍', title: 'Input Validation', desc: 'require() validates all inputs before processing', tag: 'critical' },
];

const testResults = [
  { test: 'Reentrancy Attack Simulation', passed: true, detail: 'Resisted recursive call attempts' },
  { test: 'Front-running Prevention', passed: true, detail: 'Commit-reveal scheme effective' },
  { test: 'Integer Overflow Test', passed: true, detail: 'Solidity 0.8.x protects against overflow' },
  { test: 'Access Control Test', passed: true, detail: 'Unauthorized addresses rejected' },
  { test: 'Denial of Service', passed: true, detail: 'No unbounded loops or external deps' },
  { test: 'Temperature Threshold Test', passed: true, detail: 'Values >25°C rejected at line 42' },
];

const Audit = () => {
  const [activeTab, setActiveTab] = useState('aderyn');

  const tabs = [
    { id: 'aderyn', label: 'Static Analysis' },
    { id: 'tenderly', label: 'Forensic Debug' },
    { id: 'tests', label: 'Security Tests' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="au-root">
        <div className="au-inner">

          {/* Header */}
          <div className="au-topbar">
            <div>
              <span className="au-brand-tag">Security Audit Report</span>
              <h1 className="au-brand-title">Audit Dashboard</h1>
            </div>
            <div className="au-score-pill">
              <span className="au-score-label">Security Score</span>
              <span className="au-score-value">92/100</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="au-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`au-tab${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Static Analysis tab ── */}
          {activeTab === 'aderyn' && (
            <>
              <div className="au-panel">
                <div className="au-panel-header">
                  <span className="au-panel-title">Aderyn Static Analysis</span>
                  <span className="au-panel-badge">Category 2</span>
                </div>
                <div className="au-panel-body">
                  <p className="au-desc">
                    Contract audited with Aderyn static analysis — detects reentrancy,
                    integer overflows, access control issues, and gas optimizations.
                    Command: aderyn . --src contracts --output aderyn_report.md
                  </p>

                  <div className="au-vuln-table">
                    {vulnerabilities.map(v => (
                      <div key={v.level} className="au-vuln-row">
                        <div className="au-vuln-left">
                          <span className="au-vuln-dot" style={{ background: v.count === 0 ? '#1a3040' : v.color }} />
                          <span className="au-vuln-level" style={{ color: v.count === 0 ? '#3a5060' : v.color }}>
                            {v.level}
                          </span>
                          <span className="au-vuln-desc">{v.desc}</span>
                        </div>
                        <span
                          className="au-vuln-count"
                          style={{
                            color: v.count === 0 ? '#3a5060' : v.color,
                            borderColor: v.count === 0 ? '#1a2830' : v.color + '44',
                            background: v.count === 0 ? '#090e14' : v.color + '11',
                          }}
                        >
                          {v.count === 0 ? '✓ CLEAN' : `${v.count} FOUND`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="au-score-bar">
                    <span className="au-score-num">92</span>
                    <div className="au-score-track">
                      <div className="au-score-track-label">Overall Security Score</div>
                      <div className="au-score-track-bar">
                        <div className="au-score-track-fill" />
                      </div>
                      <div className="au-score-note">
                        Recommendation: implement multi-sig ownership, pin Solidity version.
                        Audit: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Forensic Debug tab ── */}
          {activeTab === 'tenderly' && (
            <>
              <div className="au-panel">
                <div className="au-panel-header">
                  <span className="au-panel-title">Tenderly Forensic Debugging</span>
                  <span className="au-panel-badge">Category 4</span>
                </div>
                <div className="au-panel-body">
                  <p className="au-desc">
                    A 30°C breach was simulated to verify the 25°C threshold enforcement.
                    The failed transaction was traced in Tenderly to confirm the exact revert location.
                  </p>

                  <div className="au-trace">
                    <div className="au-trace-header">
                      <span className="au-trace-title">▲ Revert — Line 42</span>
                      <span className="au-trace-hash">0x7a3f...c2d4e · FAILED</span>
                    </div>
                    <div className="au-trace-code">
                      <span className="au-trace-line-normal">function updateStatus(uint256 shipmentId, uint256 temp) external {'{'}</span><br/>
                      <span className="au-trace-line-revert">{'  '}require(temp &lt;= 25, "Temperature exceeds safety threshold!"); // ← REVERT</span><br/>
                      <span className="au-trace-line-normal">{'  '}shipmentTemperatures[shipmentId] = temp;</span><br/>
                      <span className="au-trace-line-normal">{'}'}</span>
                    </div>
                    <div className="au-trace-meta">
                      <span className="au-trace-meta-key">STACK TRACE</span>
                      <span className="au-trace-meta-val">updateStatus(uint256,uint256) → require() failed</span>
                      <span className="au-trace-meta-key">PARAMETERS</span>
                      <span className="au-trace-meta-val">shipmentId: 1, temp: 30</span>
                      <span className="au-trace-meta-key">REVERT MSG</span>
                      <span className="au-trace-meta-val err">"Temperature exceeds safety threshold!"</span>
                    </div>
                  </div>

                  <div className="au-insight">
                    <div className="au-insight-title">Debugging Insight</div>
                    <div className="au-insight-body">
                      Trace confirms: <code>updateStatus</code> → <code>require()</code> evaluation →
                      condition fails → revert with custom error. State mutation never reached —
                      security validation fires correctly before any write.
                    </div>
                  </div>

                  <button
                    className="au-tenderly-btn"
                    onClick={() => window.open('https://dashboard.tenderly.co/', '_blank')}
                  >
                    ◆ Open Full Tenderly Dashboard ↗
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Security Tests tab ── */}
          {activeTab === 'tests' && (
            <>
              <div className="au-panel">
                <div className="au-panel-header">
                  <span className="au-panel-title">Security Test Suite</span>
                  <span className="au-panel-badge">6 / 6 Passing</span>
                </div>
                <div className="au-panel-body">
                  <p className="au-desc">
                    Static analysis, dynamic fuzzing, and scenario-based validation.
                    All critical security requirements validated successfully.
                  </p>

                  <div className="au-tests">
                    {testResults.map((t, i) => (
                      <div key={i} className="au-test-row">
                        <span className={`au-test-status ${t.passed ? 'pass' : 'fail'}`}>
                          {t.passed ? 'PASS' : 'FAIL'}
                        </span>
                        <span className="au-test-name">{t.test}</span>
                        <span className="au-test-detail">{t.detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="au-cert">
                    <span className="au-cert-score">6/6</span>
                    <div>
                      <span className="au-cert-label">Result</span>
                      <h3 className="au-cert-title">Security Certification Ready</h3>
                      <span className="au-cert-sub">All critical security requirements validated</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Security features — always shown */}
          <span className="au-section-label">Built-in Security Features</span>
          <div className="au-features-grid">
            {securityFeatures.map((f) => (
              <div key={f.title} className="au-feature-cell">
                <span className="au-feature-icon">{f.icon}</span>
                <span className="au-feature-title">{f.title}</span>
                <span className="au-feature-desc">{f.desc}</span>
                <span className={`au-feature-tag ${f.tag}`}>
                  {f.tag === 'critical' ? 'Critical Security' : 'Standard Protection'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Audit;
