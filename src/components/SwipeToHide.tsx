import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { theme } from '../theme';

export type SwipeToHideProps = {
  onHide: () => void;
  children: React.ReactNode;
};

/** Wraps a row so swiping it left reveals a "hide" affordance and dismisses it —
 * used for lightweight, session-local dismissal (e.g. Today's notification preview). */
export function SwipeToHide({ onHide, children }: SwipeToHideProps) {
  return (
    <Swipeable
      renderRightActions={(_progress, dragX) => {
        const opacity = dragX.interpolate({ inputRange: [-60, 0], outputRange: [1, 0], extrapolate: 'clamp' });
        return (
          <Animated.View style={[styles.hideAction, { opacity }]}>
            <Trash2 size={16} color="#fff" />
          </Animated.View>
        );
      }}
      onSwipeableOpen={onHide}
      overshootRight={false}
      rightThreshold={40}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  hideAction: {
    width: 64,
    backgroundColor: theme.colors.red,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
