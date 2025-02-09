// components/WaveLoader.tsx
import { CSSProperties } from 'react';

const WaveLoader = () => {
  // Gradient configuration
  const GRADIENTS = [
    'linear-gradient(135deg, #ff6b6b40 0%, #4ecdc440 100%)',
    'linear-gradient(135deg, #45b64940 0%, #dce35b40 100%)',
    'linear-gradient(135deg, #96fbc440 0%, #f9f58640 100%)',
    'linear-gradient(135deg, #a8edea40 0%, #fed6e340 100%)',
  ];

  // Wave animation configuration
  const WAVE_CONFIG = [
    { duration: 8, delay: 0, direction: 'left' },
    { duration: 10, delay: 1, direction: 'right' },
    { duration: 12, delay: 2, direction: 'left' },
    { duration: 9, delay: 3, direction: 'right' },
  ];

  return (
    <div style={styles.container}>
      {GRADIENTS.map((gradient, index) => (
        <div
          key={index}
          style={{
            ...styles.wave,
            background: gradient,
            animation: `wave${WAVE_CONFIG[index].direction} ${WAVE_CONFIG[index].duration}s cubic-bezier(0.4, 0, 0.2, 1) ${WAVE_CONFIG[index].delay}s infinite`,
          }}
        />
      ))}
      <div style={styles.text}>Loading...</div>
    </div>
  );
};

// Animation keyframes
const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  wave: {
    position: 'absolute',
    top: '-50%',
    width: '200%',
    height: '200%',
    transformOrigin: 'center center',
    borderRadius: '40%',
    mixBlendMode: 'screen',
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    zIndex: 1,
  },
};

// Add global styles for animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes waveleft {
      0% {
        transform: translateX(-100%) rotate(0deg);
      }
      50% {
        transform: translateX(0%) rotate(180deg);
      }
      100% {
        transform: translateX(100%) rotate(360deg);
      }
    }

    @keyframes waveright {
      0% {
        transform: translateX(100%) rotate(0deg);
      }
      50% {
        transform: translateX(0%) rotate(180deg);
      }
      100% {
        transform: translateX(-100%) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default WaveLoader;