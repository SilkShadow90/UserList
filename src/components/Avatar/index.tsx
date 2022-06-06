import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { getStyles } from './index.styles';
import { getAbbreviation } from '../../utils';
import { useTheme } from '../../hooks/useTheme';
import { Config } from '../../resources';

type Props = {
  imageUrl?: string;
  size?: number;
  text: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const Avatar = ({ imageUrl, size, text }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(size), [size]);
  const [isValidImage, setValidImage] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl) {
      (async () => {
        const isValid = await Image.prefetch(imageUrl);
        setValidImage(isValid);
      })();
    }
  }, [imageUrl]);

  return (
    <AnimatedView
      entering={FadeIn.duration(Config.animationMSStep * 2)}
      style={[theme.shadow, theme.placeholderBackground, theme.border, styles.avatarWrapper]}
    >
      {imageUrl && isValidImage ? (
        <AnimatedView entering={FadeIn.duration(Config.animationMSStep * 2)}>
          <Image source={{ uri: imageUrl }} style={[theme.placeholderBackground, styles.avatar]} />
        </AnimatedView>
      ) : (
        <Text style={[theme.text, styles.notAvatarText]}>{getAbbreviation(text)}</Text>
      )}
    </AnimatedView>
  );
};
