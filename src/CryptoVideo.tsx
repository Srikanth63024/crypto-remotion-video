import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CryptoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneLength = fps * 9; // 9 seconds per scene
  const sceneIndex = Math.min(Math.floor(frame / sceneLength), 4);
  const sceneFrame = frame % sceneLength;

  const popAnim = spring({ frame: sceneFrame, fps, config: { damping: 10, mass: 0.6 } });
  const scale = interpolate(popAnim, [0, 1], [0.8, 1]);
  const opacity = interpolate(popAnim, [0, 1], [0, 1]);

  const scenes = [
    {
      badge: '⚠️ 90% TRADERS FAIL',
      badgeColor: '#ff3366',
      title: 'WHY 90% LOSE?',
      desc: 'Market lo strategy kante ekkuva RISK MANAGEMENT leka potharu!',
      visualType: 'loss_stat',
    },
    {
      badge: '🛡️ GOLDEN RULE 1',
      badgeColor: '#00ff88',
      title: '2% TO 3% RISK',
      desc: 'Capital entha unna, single trade lo max 2-3% kante ekkuva risk vaddhu.',
      visualType: 'risk_card',
    },
    {
      badge: '🛑 BIGGEST MISTAKE',
      badgeColor: '#ff0055',
      title: 'NO STOP LOSS',
      desc: 'Malli lesthundhi ani aagithe, motham account zero aipothundhi!',
      visualType: 'chart_dump',
    },
    {
      badge: '🎯 1:2 RISK REWARD',
      badgeColor: '#00d4ff',
      title: '1:2 RATIO RULE',
      desc: '50% trades loss aina kuda, nuvvu net profit lone untav.',
      visualType: 'ratio_card',
    },
    {
      badge: '👑 DISCIPLINE OVER FOMO',
      badgeColor: '#ffbb00',
      title: 'STICK TO RULES',
      desc: 'Emotions tho kadhu, strict system tho trade cheyyi!',
      visualType: 'profit_chart',
    },
  ];

  const current = scenes[sceneIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090e',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.badgeColor}22 0%, transparent 70%)`,
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '120px 60px',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${current.badgeColor}`,
            padding: '16px 40px',
            borderRadius: '100px',
            fontSize: '30px',
            fontWeight: 800,
            color: current.badgeColor,
            boxShadow: `0 0 30px ${current.badgeColor}33`,
            letterSpacing: '2px',
          }}
        >
          {current.badge}
        </div>

        {/* Dynamic Motion Graphic Visual */}
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '450px',
          }}
        >
          {current.visualType === 'loss_stat' && (
            <div
              style={{
                width: '700px',
                padding: '50px',
                borderRadius: '35px',
                background: 'rgba(255, 51, 102, 0.08)',
                border: '2px solid rgba(255, 51, 102, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ fontSize: '130px', fontWeight: 900, color: '#ff3366' }}>90%</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#ffffff', letterSpacing: '3px' }}>
                TRADERS GET WIPED OUT
              </div>
            </div>
          )}

          {current.visualType === 'risk_card' && (
            <div
              style={{
                width: '750px',
                padding: '45px',
                borderRadius: '35px',
                background: 'rgba(0, 255, 136, 0.08)',
                border: '2px solid rgba(0, 255, 136, 0.3)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', color: '#94a3b8' }}>CAPITAL</div>
                <div style={{ fontSize: '65px', fontWeight: 900, color: '#ffffff' }}>$100</div>
              </div>
              <div style={{ fontSize: '50px', color: '#00ff88' }}>➡️</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', color: '#94a3b8' }}>MAX RISK</div>
                <div style={{ fontSize: '65px', fontWeight: 900, color: '#00ff88' }}>$2 - $3</div>
              </div>
            </div>
          )}

          {current.visualType === 'chart_dump' && (
            <div
              style={{
                width: '750px',
                padding: '40px',
                borderRadius: '35px',
                background: 'rgba(255, 0, 85, 0.08)',
                border: '2px solid rgba(255, 0, 85, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{ fontSize: '40px', fontWeight: 800, color: '#ff0055' }}>🔻 LIQUIDATION ALERT</div>
              {/* Candlestick dummy animation */}
              <div style={{ display: 'flex', gap: '35px', alignItems: 'flex-end', height: '180px' }}>
                <div style={{ width: '35px', height: '140px', background: '#00ff88', borderRadius: '6px' }} />
                <div style={{ width: '35px', height: '110px', background: '#00ff88', borderRadius: '6px' }} />
                <div style={{ width: '35px', height: '70px', background: '#ff0055', borderRadius: '6px' }} />
                <div style={{ width: '35px', height: '160px', background: '#ff0055', borderRadius: '6px' }} />
              </div>
            </div>
          )}

          {current.visualType === 'ratio_card' && (
            <div
              style={{
                width: '750px',
                padding: '45px',
                borderRadius: '35px',
                background: 'rgba(0, 212, 255, 0.08)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', color: '#ff0055', fontWeight: 700 }}>STOP LOSS</div>
                <div style={{ fontSize: '75px', fontWeight: 900, color: '#ff0055' }}>-1%</div>
              </div>
              <div style={{ fontSize: '60px', fontWeight: 900, color: '#ffffff' }}>:</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', color: '#00ff88', fontWeight: 700 }}>TARGET</div>
                <div style={{ fontSize: '75px', fontWeight: 900, color: '#00ff88' }}>+2%</div>
              </div>
            </div>
          )}

          {current.visualType === 'profit_chart' && (
            <div
              style={{
                width: '750px',
                padding: '50px',
                borderRadius: '35px',
                background: 'rgba(255, 187, 0, 0.08)',
                border: '2px solid rgba(255, 187, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '100px' }}>📈</div>
              <div style={{ fontSize: '50px', fontWeight: 900, color: '#ffbb00', marginTop: '20px' }}>
                CONSISTENT PROFITS
              </div>
            </div>
          )}
        </div>

        {/* Content Box */}
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            width: '100%',
            maxWidth: '900px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '35px',
            padding: '50px 40px',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              fontSize: '62px',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '25px',
              letterSpacing: '-1px',
            }}
          >
            {current.title}
          </div>
          <div
            style={{
              fontSize: '34px',
              lineHeight: 1.6,
              color: '#cbd5e1',
              fontWeight: 500,
            }}
          >
            {current.desc}
          </div>
        </div>

        {/* Footer Label */}
        <div
          style={{
            fontSize: '24px',
            color: '#64748b',
            letterSpacing: '3px',
            fontWeight: 700,
          }}
        >
          CRYPTO RISK MANAGEMENT • FOLLOW FOR MORE
        </div>
      </div>
    </AbsoluteFill>
  );
};
        
