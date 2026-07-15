import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Text as SvgText } from 'react-native-svg';
import { useAppState } from '../state/AppStateContext';
import { theme } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function PulseCircle({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const progress = useRef(new Animated.Value(0.25)).current;
  useEffect(() => {
    let loop: Animated.CompositeAnimation | undefined;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (cancelled || reduced) return;
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(progress, { toValue: 0.55, duration: 800, useNativeDriver: false }),
          Animated.timing(progress, { toValue: 0.25, duration: 800, useNativeDriver: false }),
        ])
      );
      loop.start();
    });
    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [progress]);

  return <AnimatedCircle cx={cx} cy={cy} r={r} fill={color} opacity={progress as unknown as number} />;
}

export type HoodMapProps = {
  highlightHouse: string | null;
  onHousePress: (id: string) => void;
};

/** Hand-drawn Cypress Bend neighborhood map, ported verbatim from the design system's HoodMap SVG. */
export function HoodMap({ highlightHouse, onHousePress }: HoodMapProps) {
  const C = theme.colors;
  const { houses } = useAppState();
  return (
    <Svg viewBox="0 0 100 130" width="100%" height={undefined} style={{ aspectRatio: 100 / 130, backgroundColor: '#EFE9DB' }}>
      <Path d="M0,14 Q22,6 45,13 T100,10 L100,0 L0,0 Z" fill={C.sky} />
      <Ellipse cx={74} cy={30} rx={14} ry={8} fill={C.sky} />
      <SvgText x={74} y={31.6} textAnchor="middle" fontSize={2.6} fill={C.skyDeep} fontWeight="700">
        HERON POND
      </SvgText>
      <Ellipse cx={18} cy={30} rx={15} ry={11} fill="#DCEBD2" />
      <Ellipse cx={55} cy={97} rx={9} ry={6} fill="#DCEBD2" />
      {[
        [8, 24],
        [24, 26],
        [60, 20],
        [88, 42],
        [52, 95],
        [6, 70],
        [30, 58],
        [68, 58],
      ].map(([x, y], i) => (
        <Circle key={i} cx={x} cy={y} r={1.6} fill="#A9C89A" />
      ))}
      <Path d="M2,58 Q30,50 55,52 T98,48" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
      <Path d="M41,54 L41,108" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <Path d="M41,72 L96,72" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <Path d="M28,106 L88,106 Q94,106 94,100 L94,78" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <Path d="M41,96 L26,96" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" fill="none" />
      <Circle cx={16} cy={96} r={5.5} fill="#fff" />
      <Circle cx={16} cy={96} r={2} fill="#DCEBD2" />
      <SvgText x={20} y={55} fontSize={2.5} fill={C.inkSoft} fontWeight="700" transform="rotate(-6 20 55)">
        CYPRESS BEND DR
      </SvgText>
      <SvgText x={60} y={70.6} fontSize={2.4} fill={C.inkSoft} fontWeight="700">
        HERON LN
      </SvgText>
      <SvgText x={48} y={104.6} fontSize={2.4} fill={C.inkSoft} fontWeight="700">
        MOCKINGBIRD WAY
      </SvgText>
      <SvgText x={90} y={26} fontSize={3}>
        🌮
      </SvgText>
      <PulseCircle cx={91} cy={25} r={3.6} color={C.marigold} />
      <SvgText x={55} y={98} textAnchor="middle" fontSize={3.4}>
        🛝
      </SvgText>
      <SvgText x={16} y={31} textAnchor="middle" fontSize={2.2} fill={C.grassDeep} fontWeight="700">
        GARDEN 🌱
      </SvgText>
      {houses.map((h) => {
        const isHi = h.id === highlightHouse;
        return (
          <G key={h.id} transform={`translate(${h.x},${h.y})`} onPress={() => onHousePress(h.id)}>
            {isHi && <PulseCircle cx={0} cy={0} r={5} color={C.marigold} />}
            <Path
              d="M-2,-1.6 h4 v3.2 h-4 z"
              fill={isHi ? C.marigold : h.you ? C.grass : '#fff'}
              stroke={C.ink}
              strokeWidth={isHi || h.you ? 0.7 : 0.45}
            />
            <Path
              d="M-2.4,-1.4 L0,-3 L2.4,-1.4 Z"
              fill={isHi ? '#D99B12' : h.you ? C.grassDeep : '#E7DECB'}
              stroke={C.ink}
              strokeWidth={0.35}
            />
          </G>
        );
      })}
      <SvgText x={21} y={79.5} textAnchor="middle" fontSize={2.4} fill={C.grassDeep} fontWeight="700">
        YOU ⌂
      </SvgText>
    </Svg>
  );
}
