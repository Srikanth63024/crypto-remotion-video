import React from 'react';
import { Composition } from 'remotion';
import { CryptoVideo } from './CryptoVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyComp"
      component={CryptoVideo}
      durationInFrames={30 * 45} // 45 seconds at 30fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
