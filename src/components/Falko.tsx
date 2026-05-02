import React from 'react';
import Svg, { Ellipse, Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '@/constants/tokens';

type Mood = 'happy' | 'focused';

interface FalkoProps {
  size?: number;
  mood?: Mood;
}

export function Falko({ size = 120, mood = 'happy' }: FalkoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* shadow */}
      <Ellipse cx="60" cy="112" rx="32" ry="4" fill="rgba(0,0,0,0.08)" />
      {/* body */}
      <Ellipse cx="60" cy="78" rx="32" ry="30" fill={Colors.cream2} />
      {/* belly */}
      <Ellipse cx="60" cy="84" rx="22" ry="22" fill={Colors.white} />
      {/* wing */}
      <Path d="M32 70 Q22 78 28 96 Q38 92 42 80 Z" fill={Colors.cream2} />
      {/* head */}
      <Circle cx="60" cy="42" r="28" fill={Colors.cream2} />
      {/* face mask */}
      <Path
        d="M38 38 Q60 30 82 38 Q80 50 60 52 Q40 50 38 38 Z"
        fill={Colors.red}
      />
      {/* beak */}
      <Path d="M55 50 L65 50 L60 60 Z" fill={Colors.ochre} />
      {/* eyes */}
      {mood === 'happy' ? (
        <>
          <Path
            d="M48 40 Q51 37 54 40"
            stroke={Colors.ink}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M66 40 Q69 37 72 40"
            stroke={Colors.ink}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <Circle cx="51" cy="40" r="3" fill={Colors.ink} />
          <Circle cx="69" cy="40" r="3" fill={Colors.ink} />
          <Circle cx="52" cy="39" r="1" fill={Colors.white} />
          <Circle cx="70" cy="39" r="1" fill={Colors.white} />
        </>
      )}
      {/* blush */}
      <Circle cx="42" cy="46" r="3" fill={Colors.red} fillOpacity="0.3" />
      <Circle cx="78" cy="46" r="3" fill={Colors.red} fillOpacity="0.3" />
      {/* feet */}
      <Rect x="50" y="105" width="6" height="6" rx="2" fill={Colors.ochre} />
      <Rect x="64" y="105" width="6" height="6" rx="2" fill={Colors.ochre} />
    </Svg>
  );
}
