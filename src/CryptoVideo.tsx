import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CryptoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12 } });
  const titleY = interpolate(titleProgress, [0, 1], [60, 0]);

  const sceneIndex = Math.floor(frame / (fps * 9));

  const scenes = [
    {
      badge: 'CRYPTO TRADING SECRET',
      title: '90% TRADERS LOSS',
      highlight: 'WHY?',
      desc: 'Loss avvadaniki kaaranam setup lekapovadam kadhu... Proper Risk Management lekapovadame!',
      accent: '#ff4d4d',
    },
    {
      badge: 'RULE 1: CAPITAL RISK',
      title: 'MAX 2% TO 3% RISK',
      highlight: 'PER TRADE',
      desc: 'Account lo $100 unte, okka trade lo $2 to $3 kante ekkuva risk cheyakudadhu.',
      accent: '#00e676',
    },
    {
      badge: 'BIGGEST MISTAKE',
      title: 'NO STOP-LOSS',
      highlight: 'ACCOUNT WASHED',
      desc: "Market padinappudu malli lesthundhi ani aagithe, motham capital wipe out aipothundhi!",
      accent: '#ff5252',
    },
    {
      badge: 'THE GOLDEN RULE',
      title: '1:2 RISK REWARD',
      highlight: 'DISCIPLINE',
      desc: 'Trade thesukune munde Stop-loss and Target fix cheyyi. 50% trades win aina nuvvu super profit lo untav!',
      accent: '#00e5ff',
    },
    {
      badge: 'FINAL ADVICE',
      title: 'NO EMOTIONS',
      highlight: 'TRADE DISCIPLINE',
      desc: 'Emotions pakkana petti, rules tho trade cheyyi. Consistency is king!',
      accent: '#ffd700',
    },
  ];

  const current = scenes[Math.min(sceneIndex, scenes.length - 1)];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0e17',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(0, 230, 118, 0.12) 0%, transparent 60%), radial-gradient(circle at 50% 80%, rgba(0, 229, 255, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: `2px solid ${current.accent}`,
          padding: '16px 36px',
          borderRadius: '40px',
          fontSize: '28px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: current.accent,
          marginBottom: '50px',
        }}
      >
        {current.badge}
      </div>

      <div
        style={{
          transform: `translateY(${titleY}px)`,
          fontSize: '70px',
          fontWeight: '900',
          lineHeight: '1.2',
          marginBottom: '20px',
        }}
      >
        {current.title}
      </div>

      <div
        style={{
          fontSize: '56px',
          fontWeight: '900',
          color: current.accent,
          textShadow: `0 0 25px ${current.accent}66`,
          marginBottom: '50px',
        }}
      >
        {current.highlight}
      </div>

      <div
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '40px',
          borderRadius: '28px',
          fontSize: '34px',
          lineHeight: '1.6',
          maxWidth: '850px',
          color: '#cbd5e1',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {current.desc}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          fontSize: '24px',
          color: '#64748b',
          letterSpacing: '1px',
        }}
      >
        CRYPTO TRADING RULES • FOLLOW FOR MORE
      </div>
    </AbsoluteFill>
  );
};
          
