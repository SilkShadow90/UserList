import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { Strings } from '../../resources';
import { AlertService } from '../../utils';
import { ErrorWrapper } from '../../components';
import { UserFabric } from '../../models';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { getAbbreviation } from '../../utils';

const AnimatedView = Animated.createAnimatedComponent(View);

export const DetailsScreen = () => {
  const { user } = useAppSelector(state => state.userState || {});
  const theme = useTheme();

  const sendEmail = useCallback(async () => {
    try {
      await Linking.openURL(`mailto:${user?.email}`);
    } catch (error) {
      await AlertService.showAlert({ title: (error as Error)?.message });
    }
  }, [user]);

  if (!UserFabric.check(user)) {
    return <ErrorWrapper />;
  }

  return (
    <View style={theme.wrapper}>
      <AnimatedView
        entering={FadeIn.delay(100)}
        style={[
          theme.shadow,
          theme.placeholderBackground,
          { borderColor: theme.placeholderBackground.backgroundColor },
          styles.avatarWrapper,
        ]}>
        {user?.avatar ? (
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        ) : (
          <Text style={[theme.text, styles.notAvatarText]}>{getAbbreviation(user?.firstName, user?.lastName)}</Text>
        )}
      </AnimatedView>

      <ScrollView>
        <AnimatedView entering={FadeInDown.delay(100)} style={[styles.textWrapper, theme.placeholderBackground]}>
          <Text style={theme.placeholder}>{Strings.user.name}</Text>
          <Text style={theme.title}>{user.firstName}</Text>
        </AnimatedView>
        <AnimatedView entering={FadeInDown.delay(150)} style={[styles.textWrapper, theme.placeholderBackground]}>
          <Text style={theme.placeholder}>{Strings.user.lastName}</Text>
          <Text style={theme.title}>{user.lastName}</Text>
        </AnimatedView>
        {!!user?.email && (
          <AnimatedView entering={FadeInDown.delay(200)} style={[styles.textWrapper, theme.placeholderBackground]}>
            <Text style={theme.placeholder}>{Strings.user.email}</Text>
            <Text style={[theme.text, theme.link]} onPress={sendEmail}>
              {user?.email}
            </Text>
          </AnimatedView>
        )}
      </ScrollView>
    </View>
  );
};
