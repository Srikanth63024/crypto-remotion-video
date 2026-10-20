import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CryptoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneLength = fps * 8; // 8s per scene (Total 40s)
  const sceneIndex = Math.min(Math.floor(frame / sceneLength), 4);
  const sceneFrame = frame % sceneLength;

  const anim = spring({ frame: sceneFrame, fps, config: { damping: 12, mass: 0.6 } });
  const cardScale = interpolate(anim, [0, 1], [0.88, 1]);
  const cardOpacity = interpolate(anim, [0, 1], [0, 1]);

  // Dynamic Chart animations
  const chartScanX = interpolate(frame % (fps * 4), [0, fps * 4], [0, 1080]);
  const pulseGlow = Math.sin(frame / 5) * 8;

  const scenes = [
    {
      badge: '⚠️ THE BRUTAL REALITY',
      badgeColor: '#ff2a5f',
      title: '90% TRADERS GET REKT',
      desc: 'Market lo setup leka kadhu... Strict Risk Management lekapovadam valle account lu zero avuthayi!',
      highlightMetric: '90% LIQUIDATED',
      accentColor: '#ff2a5f',
      chartType: 'dump',
    },
    {
      badge: '🛡️ CAPITAL ALLOCATION',
      badgeColor: '#00ff88',
      title: 'THE 2% RISK RULE',
      desc: 'Account lo unna balance nunchi single trade lo eppudu 2% to 3% kante ekkuva risk cheyakudadhu.',
      highlightMetric: 'MAX $2 RISK / $100',
      accentColor: '#00ff88',
      chartType: 'capital',
    },
    {
      badge: '🛑 THE DEADLY MISTAKE',
      badgeColor: '#ff3b30',
      title: 'HOLDING WITHOUT STOP-LOSS',
      desc: 'Drop ainappudu "malli lesthundhi le" ani aagithe, heavy crash tho motham capital wash out!',
      highlightMetric: 'STOP-LOSS TRIGGERED',
      accentColor: '#ff3b30',
      chartType: 'crash',
    },
    {
      badge: '🎯 PROFIT MATRICES',
      badgeColor: '#00d4ff',
      title: '1:2 RISK TO REWARD',
      desc: '50% trades loss aina kuda, 1:2 R:R ratio unte account overall net green profitable ga untundhi.',
      highlightMetric: '1:2 WIN FORMULA',
      accentColor: '#00d4ff',
      chartType: 'ratio',
    },
    {
      badge: '👑 TRADING DISCIPLINE',
      badgeColor: '#ffd700',
      title: 'RULES OVER EMOTIONS',
      desc: 'Greed mariyu FOMO pakkana petti, rules tho trade cheyyi. Consistency is king!',
      highlightMetric: 'COMPOUND PROFITS',
      accentColor: '#ffd700',
      chartType: 'bull',
    },
  ];

  const current = scenes[sceneIndex];

  // Candlestick Data Points
  const candles = [
    { x: 90, open: 650, close: 540, high: 500, low: 680, bull: true },
    { x: 190, open: 540, close: 460, high: 430, low: 570, bull: true },
    { x: 290, open: 460, close: 510, high: 440, low: 530, bull: false },
    { x: 390, open: 510, close: 400, high: 380, low: 530, bull: true },
    { x: 490, open: 400, close: 560, high: 390, low: 600, bull: false },
    { x: 590, open: 560, close: 720, high: 530, low: 750, bull: false },
    { x: 690, open: 720, close: 630, high: 600, low: 760, bull: true },
    { x: 790, open: 630, close: 820, high: 610, low: 860, bull: false },
    { x: 890, open: 820, close: 710, high: 690, low: 850, bull: true },
    { x: 990, open: 710, close: 590, high: 560, low: 730, bull: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#05070d',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Neon Aura */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.accentColor}28 0%, transparent 68%)`,
          top: '35%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${1 + pulseGlow / 70})`,
          filter: 'blur(75px)',
        }}
      />

      {/* Cyber Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* Real-time Cinematic Candlestick Chart Layer */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1080px',
          height: '1920px',
          opacity: 0.85,
        }}
      >
        {/* Support & Resistance Grid Levels */}
        <line x1="0" y1="450" x2="1080" y2="450" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
        <line x1="0" y1="750" x2="1080" y2="750" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
        <line x1="0" y1="1050" x2="1080" y2="1050" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />

        {/* Candlesticks with shadows */}
        {candles.map((c, i) => {
          const color = c.bull ? '#00ff88' : '#ff2a5f';
          const candleHeight = Math.abs(c.close - c.open);
          const candleY = Math.min(c.open, c.close);
          const candleGrow = interpolate(
            frame - i * 4,
            [0, 15],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <g key={i} opacity={candleGrow}>
              {/* Wick */}
              <line
                x1={c.x + 22}
                y1={c.high}
                x2={c.x + 22}
                y2={c.low}
                stroke={color}
                strokeWidth="4"
              />
              {/* Body */}
              <rect
                x={c.x}
                y={candleY}
                width="44"
                height={Math.max(candleHeight * candleGrow, 10)}
                fill={color}
                rx="6"
                style={{
                  filter: `drop-shadow(0 0 12px ${color}66)`,
                }}
              />
            </g>
          );
        })}

        {/* Dynamic Price Action Wave Line */}
        <path
          d="M 90 600 Q 250 480 390 450 T 600 680 T 800 780 T 1000 620"
          fill="none"
          stroke={current.accentColor}
          strokeWidth="6"
          strokeDasharray="14 8"
          style={{
            filter: `drop-shadow(0 0 18px ${current.accentColor})`,
          }}
        />

        {/* Live Laser Scan Tracker */}
        <line
          x1={chartScanX}
          y1="350"
          x2={chartScanX}
          y2="1200"
          stroke={current.accentColor}
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>

      {/* Main Foreground Overlays */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '110px 50px',
          boxSizing: 'border-box',
          zIndex: 20,
        }}
      >
        {/* Top Floating Badge */}
        <div
          style={{
            transform: `scale(${cardScale})`,
            opacity: cardOpacity,
            background: 'rgba(5, 10, 20, 0.75)',
            border: `2px solid ${current.badgeColor}`,
            padding: '16px 45px',
            borderRadius: '100px',
            fontSize: '30px',
            fontWeight: 800,
            color: current.badgeColor,
            boxShadow: `0 0 35px ${current.badgeColor}55`,
            letterSpacing: '3px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {current.badge}
        </div>

        {/* Center Glassmorphism Visual Card */}
        <div
          style={{
            transform: `scale(${cardScale})`,
            opacity: cardOpacity,
            width: '100%',
            maxWidth: '920px',
            padding: '45px 35px',
            borderRadius: '40px',
            background: 'rgba(8, 14, 28, 0.82)',
            border: `2px solid ${current.accentColor}77`,
            boxShadow: `0 35px 80px rgba(0,0,0,0.85), 0 0 45px ${current.accentColor}33`,
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Live Orderbook Header */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '24px',
              fontWeight: 700,
              color: '#94a3b8',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '20px',
              marginBottom: '30px',
            }}
          >
            <span>PAIR: BTC/USDT</span>
            <span style={{ color: current.accentColor }}>{current.highlightMetric}</span>
          </div>

          {/* Large Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.25,
              marginBottom: '25px',
              textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            }}
          >
            {current.title}
          </div>

          {/* Explanatory Narration Text */}
          <div
            style={{
              fontSize: '34px',
              lineHeight: 1.6,
              color: '#cbd5e1',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {current.desc}
          </div>

          {/* Visual Trading Metric Bar */}
          <div
            style={{
              width: '100%',
              marginTop: '35px',
              padding: '22px 30px',
              borderRadius: '25px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', color: '#ff2a5f', fontWeight: 700 }}>STOP-LOSS</div>
              <div style={{ fontSize: '38px', fontWeight: 900, color: '#ff2a5f' }}>-1.00%</div>
            </div>
            <div style={{ width: '2px', height: '50px', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', color: '#00ff88', fontWeight: 700 }}>TARGET (1:2)</div>
              <div style={{ fontSize: '38px', fontWeight: 900, color: '#00ff88' }}>+2.00%</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: '26px',
            color: '#94a3b8',
            letterSpacing: '4px',
            fontWeight: 800,
            textShadow: '0 0 10px rgba(0,0,0,0.8)',
          }}
        >
          ⚡ CRYPTO RISK ENGINE • 4H CHART SETUP ⚡
        </div>
      </div>
    </AbsoluteFill>
  );
};
      
