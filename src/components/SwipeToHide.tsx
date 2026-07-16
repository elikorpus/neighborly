import { Trash2 } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { theme } from '../theme';

export type SwipeToHideProps = {
  onHide: () => void;
  children: React.ReactNode;
};

/** Wraps a row so swiping it left reveals a "hide" action set apart from the row by a
 * gap, then smoothly collapses the row away instead of yanking it out of the list. */
export function SwipeToHide({ onHide, children }: SwipeToHideProps) {
  const [height, setHeight] = useState<number | null>(null);
  const collapse = useRef(new Animated.Value(1)).current;

  const handleOpen = () => {
    Animated.timing(collapse, {
      toValue: 0,
      duration: 260,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onHide();
    });
  };

  return (
    <Animated.View
      style={{
        opacity: collapse,
        marginBottom: collapse.interpolate({ inputRange: [0, 1], outputRange: [0, 16] }),
        maxHeight: height == null ? undefined : collapse.interpolate({ inputRange: [0, 1], outputRange: [0, height] }),
        overflow: 'hidden',
      }}
    >
      <Animated.View onLayout={(e) => setHeight((h) => h ?? e.nativeEvent.layout.height)}>
        <Swipeable
          renderRightActions={(_progress, dragX) => {
            const actionOpacity = dragX.interpolate({ inputRange: [-60, 0], outputRange: [1, 0], extrapolate: 'clamp' });
            return (
              <Animated.View style={[styles.hideActionWrap, { opacity: actionOpacity }]}>
                <Animated.View style={styles.hideAction}>
                  <Trash2 size={16} color="#fff" />
                </Animated.View>
              </Animated.View>
            );
          }}
          onSwipeableOpen={handleOpen}
          overshootRight={false}
          rightThreshold={40}
        >
          {children}
        </Swipeable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hideActionWrap: {
    justifyContent: 'center',
    paddingLeft: 14,
  },
  hideAction: {
    width: 56,
    height: '100%',
    backgroundColor: theme.colors.red,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
