// Sensor.jsx - Redesigned with dark industrial theme
import React, { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x4295Fe81B5068589Eaf77Acc3DAA8f4c48Ae6b6a";
const ABI = [
  "function updateStatus(uint256 shipmentId, uint256 temp) public",
  "function shipmentTemperatures(uint256) public view returns (uint256)"
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;700;800&display=swap');

  .sn-root {
    background: #080c10;
    min-height: 100vh;
    color: #c8d8e8;
    font-family: 'Syne', sans-serif;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  .sn-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse 50% 35% at 80% 10%, #00ffe812 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 10% 90%, #0055ff0e 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .sn-inner {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Header */
  .sn-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #1a2830;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  .sn-brand-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #00ffe8;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  .sn-brand-title {
    font-size: 22px;
    font-weight: 800;
    color: #e8f4f8;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0;
  }

  .sn-iot-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #0a1418;
    border: 1px solid #1a3040;
    padding: 6px 12px;
    border-radius: 2px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #6a9ab0;
    letter-spacing: 0.1em;
  }

  .sn-iot-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6a9ab0;
  }

  /* Main grid */
  .sn-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #1a2830;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  /* Form panel */
  .sn-form-panel {
    background: #090e14;
    padding: 2rem;
  }

  .sn-panel-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a5060;
    display: block;
    margin-bottom: 1.25rem;
  }

  .sn-field-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #4a6878;
    display: block;
    margin-bottom: 8px;
  }

  .sn-input-wrap {
    display: flex;
    align-items: center;
    background: #060a0e;
    border: 1px solid #1a2830;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
    transition: border-color 0.2s ease;
  }

  .sn-input-wrap:focus-within {
    border-color: #00ffe844;
  }

  .sn-input-unit {
    padding: 0 12px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #3a5060;
    border-right: 1px solid #1a2830;
    white-space: nowrap;
  }

  .sn-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 12px 12px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 20px;
    color: #e8f4f8;
    width: 100%;
  }

  .sn-input::placeholder { color: #1a3040; }

  .sn-input:disabled { opacity: 0.4; }

  .sn-advice {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    padding: 6px 0;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sn-submit {
    width: 100%;
    padding: 13px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .sn-submit-idle {
    background: #00ffe8;
    color: #080c10;
  }
  .sn-submit-idle:hover { background: #00ffd4; }

  .sn-submit-pending {
    background: #1a2830;
    color: #6a9ab0;
    cursor: not-allowed;
  }

  .sn-submit-disabled {
    background: #0e1418;
    color: #2a3840;
    cursor: not-allowed;
    border: 1px solid #1a2830;
  }

  /* Info panel */
  .sn-info-panel {
    background: #090e14;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sn-desc {
    font-size: 12px;
    color: #4a6878;
    line-height: 1.7;
    font-family: 'Share Tech Mono', monospace;
  }

  .sn-case {
    background: #060a0e;
    border: 1px solid #1a2830;
    border-radius: 2px;
    padding: 1rem;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .sn-case-icon {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    padding: 3px 7px;
    border-radius: 2px;
    flex-shrink: 0;
    letter-spacing: 0.08em;
  }

  .sn-case-ok .sn-case-icon {
    background: #0a1e14;
    color: #00ffe8;
    border: 1px solid #00ffe822;
  }

  .sn-case-warn .sn-case-icon {
    background: #1a1008;
    color: #e0a040;
    border: 1px solid #e0a04022;
  }

  .sn-case-title {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 4px;
    letter-spacing: 0.03em;
  }

  .sn-case-ok .sn-case-title { color: #00ffe8; }
  .sn-case-warn .sn-case-title { color: #e0a040; }

  .sn-case-body {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    line-height: 1.6;
  }

  /* TX feedback strip */
  .sn-tx-strip {
    background: #090e14;
    border: 1px solid #1a2830;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .sn-tx-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.25rem;
    border-left: 3px solid;
  }

  .sn-tx-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .sn-tx-hash {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #4a6878;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sn-tx-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #00ffe8;
    text-decoration: none;
    letter-spacing: 0.08em;
    border-bottom: 1px solid #00ffe822;
    flex-shrink: 0;
  }
  .sn-tx-link:hover { border-color: #00ffe8; }

  /* Error block */
  .sn-error {
    background: #0e0808;
    border: 1px solid #3a1010;
    border-left: 3px solid #e04040;
    border-radius: 3px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .sn-error-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    color: #e04040;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .sn-error-body {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #8a3030;
    line-height: 1.6;
    white-space: pre-line;
  }

  .sn-tenderly-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid #e0a040;
    color: #e0a040;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    padding: 6px 12px;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.15s ease;
  }
  .sn-tenderly-btn:hover { background: #e0a04018; }

  /* Metamask status */
  .sn-metamask-bar {
    background: #090e14;
    border: 1px solid #1a2830;
    border-radius: 3px;
    padding: 10px 14px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a5060;
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sn-mm-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ffe8;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .sn-grid { grid-template-columns: 1fr; }
    .sn-topbar { flex-direction: column; gap: 12px; }
  }
`;

const getAdvice = (value) => {
  if (!value) return null;
  const num = parseFloat(value);
  if (isNaN(num)) return { msg: 'ERR: Invalid numeric value', color: '#e04040' };
  if (num < -50) return { msg: 'ERR: Below -50°C — not a realistic value', color: '#e04040' };
  if (num > 100) return { msg: 'ERR: Above 100°C — not a realistic value', color: '#e04040' };
  if (num > 25) return { msg: '▲ WILL REVERT — exceeds 25°C safety threshold', color: '#e0a040' };
  if (num > 20) return { msg: '● Safe range — transaction will succeed', color: '#00ffe8' };
  return { msg: '● Optimal cold chain temperature', color: '#00ffe8' };
};

const Sensor = ({ setAccount }) => {
  const [tempInput, setTempInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [txStatus, setTxStatus] = useState('idle');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); setTxHash(''); setSuccess(false);

    const num = parseFloat(tempInput);
    if (isNaN(num) || num < -50 || num > 100) {
      setError('ERR: Invalid temperature value. Must be between -50 and 100°C.');
      setTxStatus('error');
      return;
    }
    if (!window.ethereum) {
      setError('ERR: MetaMask not detected. Please install the extension.');
      setTxStatus('error');
      return;
    }

    try {
      setLoading(true);
      setTxStatus('pending');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.updateStatus(1, tempInput);
      setTxHash(tx.hash);
      await tx.wait();
      setSuccess(true);
      setTxStatus('success');
      setLoading(false);
      setTempInput('');
      setTimeout(() => { setSuccess(false); setTxStatus('idle'); }, 5000);
    } catch (err) {
      setLoading(false);
      setTxStatus('error');
      const tempVal = parseFloat(tempInput);
      if (tempVal > 25) {
        setError(`TX REVERTED: Temperature exceeds 25°C safety threshold.\nContract require() condition failed.\n\n${err.message || 'Revert — see Tenderly for forensic trace.'}`);
      } else {
        setError(`TX FAILED: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const advice = getAdvice(tempInput);
  const isDisabled = loading;
  const btnClass = loading ? 'sn-submit sn-submit-pending' : 'sn-submit sn-submit-idle';

  return (
    <>
      <style>{styles}</style>
      <div className="sn-root">
        <div className="sn-inner">

          {/* Header */}
          <div className="sn-topbar">
            <div>
              <span className="sn-brand-tag">IoT Sensor Simulator</span>
              <h1 className="sn-brand-title">Sensor Control</h1>
            </div>
            <div className="sn-iot-pill">
              <span className="sn-iot-dot" />
              MANUAL PUSH · SEPOLIA
            </div>
          </div>

          {/* TX feedback */}
          {txHash && (
            <div className="sn-tx-strip">
              <div
                className="sn-tx-row"
                style={{
                  borderLeftColor: success ? '#00ffe8' : '#e0a040',
                }}
              >
                <span
                  className="sn-tx-label"
                  style={{ color: success ? '#00ffe8' : '#e0a040' }}
                >
                  {success ? 'CONFIRMED' : 'PENDING'}
                </span>
                <span className="sn-tx-hash">
                  {txHash.slice(0, 18)}...{txHash.slice(-10)}
                </span>
                <a
                  className="sn-tx-link"
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ETHERSCAN ↗
                </a>
              </div>
            </div>
          )}

          {/* Error block */}
          {error && (
            <div className="sn-error">
              <div className="sn-error-title">▲ Transaction Error</div>
              <div className="sn-error-body">{error}</div>
              {error.includes('exceeds') && (
                <button
                  className="sn-tenderly-btn"
                  onClick={() => window.open('https://dashboard.tenderly.co/', '_blank')}
                >
                  ◆ Open Tenderly Forensic Trace
                </button>
              )}
            </div>
          )}

          {/* Main grid */}
          <div className="sn-grid">

            {/* Form panel */}
            <div className="sn-form-panel">
              <span className="sn-panel-label">Push Temperature Reading</span>

              <form onSubmit={handleUpdate}>
                <label className="sn-field-label">Temperature Input</label>
                <div className="sn-input-wrap">
                  <span className="sn-input-unit">°C</span>
                  <input
                    className="sn-input"
                    type="number"
                    step="0.1"
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    placeholder="22.5"
                    required
                    disabled={isDisabled}
                  />
                </div>

                {advice && (
                  <div
                    className="sn-advice"
                    style={{ color: advice.color }}
                  >
                    <span>{advice.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={btnClass}
                >
                  {loading ? (
                    <><span>◌</span> PROCESSING TX...</>
                  ) : (
                    <><span>▶</span> PUSH TO BLOCKCHAIN</>
                  )}
                </button>
              </form>
            </div>

            {/* Info panel */}
            <div className="sn-info-panel">
              <span className="sn-panel-label">Submission Guide</span>

              <p className="sn-desc">
                Acts as an IoT sensor — sends a signed transaction to Sepolia
                updating the immutable shipment temperature log on-chain.
                All records are permanently stored.
              </p>

              <div className="sn-case sn-case-ok">
                <div>
                  <span className="sn-case-icon">PASS</span>
                </div>
                <div>
                  <div className="sn-case-title">Success Case</div>
                  <div className="sn-case-body">
                    Enter 15–25°C. Transaction mines successfully.
                    Dashboard updates within seconds.
                  </div>
                </div>
              </div>

              <div className="sn-case sn-case-warn">
                <div>
                  <span className="sn-case-icon">FAIL</span>
                </div>
                <div>
                  <div className="sn-case-title">Revert Case (Audit)</div>
                  <div className="sn-case-body">
                    Enter &gt;25°C (e.g. 30). Contract reverts via require().
                    Use Tenderly to trace the revert for security audit evidence.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MetaMask status bar */}
          {window.ethereum && (
            <div className="sn-metamask-bar">
              <span className="sn-mm-dot" />
              METAMASK DETECTED · NETWORK:{' '}
              {window.ethereum.networkVersion === '11155111'
                ? 'SEPOLIA ✓'
                : 'SWITCH TO SEPOLIA'}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Sensor;
