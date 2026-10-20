import React from 'react';
import { AbsoluteFill, Audio, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const CryptoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneLength = fps * 8; // 8 seconds per scene (Total 40s)
  const sceneIndex = Math.min(Math.floor(frame / sceneLength), 4);
  const sceneFrame = frame % sceneLength;

  const popAnim = spring({ frame: sceneFrame, fps, config: { damping: 11, mass: 0.5 } });
  const scale = interpolate(popAnim, [0, 1], [0.85, 1]);
  const opacity = interpolate(popAnim, [0, 1], [0, 1]);

  const arrowX = interpolate(sceneFrame, [0, fps * 2], [-300, 300], {
    extrapolateRight: 'clamp',
  });
  const shake = Math.sin(frame * 0.8) * (sceneIndex === 2 || sceneIndex === 3 ? 12 : 3);

  const scenes = [
    {
      badge: '🏹 YUDDHA ARAMBHAM 👹',
      badgeColor: '#ff9900',
      speaker: 'NARRATION',
      dialogue: '“Lanka koti sena madyalo... Kodanda Ramudu, Dashakanta Ravana mukha-mukhi!”',
      visual: 'faceoff',
      bgGlow: '#ff4400',
    },
    {
      badge: '⚡ RAVANA GARJANA ⚡',
      badgeColor: '#ff1144',
      speaker: 'RAVANA DIALOGUE',
      dialogue: '“Nara manavudaa! Naa Chandrahasa khadgam mundhu thala vanchuko!”',
      visual: 'ravana_attack',
      bgGlow: '#990022',
    },
    {
      badge: '🏹 SRI RAMA PRATIDHVANI 🏹',
      badgeColor: '#00e5ff',
      speaker: 'SRI RAMA DIALOGUE',
      dialogue: '“Ravana! Garvam vidichi yuddham cheyyi... Nee papam paripakvamaindhi!”',
      visual: 'rama_aim',
      bgGlow: '#0066aa',
    },
    {
      badge: '🔱 BRAHMASTRA PRAHOGAM ☀️',
      badgeColor: '#ffd700',
      speaker: 'WAR PEAK',
      dialogue: '“Agni jwalalatho suryudi thejassu la... Brahmastram sandhinchina Raghuramudu!”',
      visual: 'brahmastra',
      bgGlow: '#ffaa00',
    },
    {
      badge: '🚩 DHARMA VIJAYAM 🚩',
      badgeColor: '#ff7700',
      speaker: 'FINAL VERDICT',
      dialogue: '“Adharmam padipoyindhi... Jagathulo malli Dharmam nelakonnadhi! JAI SRI RAM!”',
      visual: 'victory',
      bgGlow: '#ff5500',
    },
  ];

  const current = scenes[sceneIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050304',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        transform: `translate(${shake}px, ${shake * 0.5}px)`,
      }}
    >
      <Audio
        src="https://actions.google.com/sounds/v1/ambiences/outdoor_battle_field.ogg"
        volume={0.35}
      />

      {sceneFrame < 5 && (
        <Audio
          src="https://actions.google.com/sounds/v1/impacts/cinematic_boom.ogg"
          volume={0.8}
        />
      )}

      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.bgGlow}44 0%, transparent 70%)`,
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '110px 50px',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            background: 'rgba(255, 255, 255, 0.08)',
            border: `2px solid ${current.badgeColor}`,
            padding: '16px 42px',
            borderRadius: '100px',
            fontSize: '32px',
            fontWeight: 800,
            color: current.badgeColor,
            boxShadow: `0 0 35px ${current.badgeColor}66`,
            letterSpacing: '2px',
          }}
        >
          {current.badge}
        </div>

        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            width: '100%',
            height: '520px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {current.visual === 'faceoff' && (
            <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '140px', filter: 'drop-shadow(0 0 25px #00e5ff)' }}>🏹</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#00e5ff' }}>SRI RAMA</div>
              </div>
              <div style={{ fontSize: '70px', fontWeight: 900, color: '#ff1144' }}>VS</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '140px', filter: 'drop-shadow(0 0 25px #ff1144)' }}>👹</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff1144' }}>RAVANA</div>
              </div>
            </div>
          )}

          {current.visual === 'ravana_attack' && (
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '160px', transform: `scale(${1 + Math.sin(frame / 3) * 0.1})` }}>
                ⚔️ 👹 ⚔️
              </div>
              <div
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#ff1144',
                  marginTop: '20px',
                  textShadow: '0 0 20px #ff1144',
                }}
              >
                CHANDRAHASA ASTRA ATTACK!
              </div>
            </div>
          )}

          {current.visual === 'rama_aim' && (
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '160px', transform: `translateX(${arrowX}px)` }}>
                🏹 💨
              </div>
              <div
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#00e5ff',
                  marginTop: '20px',
                  textShadow: '0 0 20px #00e5ff',
                }}
              >
                DIVINE COUNTER STRIKE!
              </div>
            </div>
          )}

          {current.visual === 'brahmastra' && (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '180px',
                  filter: 'drop-shadow(0 0 40px #ffd700)',
                  transform: `scale(${1 + Math.sin(frame / 2) * 0.15})`,
                }}
              >
                ☀️ 🔱 ☀️
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#ffd700',
                  marginTop: '20px',
                  textShadow: '0 0 30px #ffd700',
                }}
              >
                THE BRAHMASTRA FIRE!
              </div>
            </div>
          )}

          {current.visual === 'victory' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '170px', filter: 'drop-shadow(0 0 40px #ff7700)' }}>
                🚩 🕉️ 🚩
              </div>
              <div
                style={{
                  fontSize: '52px',
                  fontWeight: 900,
                  color: '#ff7700',
                  marginTop: '20px',
                  textShadow: '0 0 30px #ff7700',
                }}
              >
                VICTORY OF DHARMA!
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            width: '100%',
            maxWidth: '920px',
            background: 'rgba(18, 12, 14, 0.92)',
            border: `2px solid ${current.badgeColor}88`,
            borderRadius: '35px',
            padding: '45px 35px',
            textAlign: 'center',
            boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 30px ${current.badgeColor}22`,
          }}
        >
          <div
            style={{
              fontSize: '30px',
              fontWeight: 800,
              color: current.badgeColor,
              marginBottom: '15px',
              letterSpacing: '2px',
            }}
          >
            {current.speaker}
          </div>
          <div
            style={{
              fontSize: '36px',
              lineHeight: 1.6,
              color: '#ffffff',
              fontWeight: 700,
            }}
          >
            {current.dialogue}
          </div>
        </div>

        <div
          style={{
            fontSize: '26px',
            color: '#e2e8f0',
            letterSpacing: '4px',
            fontWeight: 800,
            textShadow: '0 0 10px rgba(255,255,255,0.4)',
          }}
        >
          ⚔️ RAMAYANA EPICS • LIKE & FOLLOW ⚔️
        </div>
      </div>
    </AbsoluteFill>
  );
};
            
