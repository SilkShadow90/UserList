/**
 * Экран детальной информации пользователя
 */

import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useAppSelector } from '../../redux/hooks';
import { Config, Strings } from '../../resources';
import { mailTo } from '../../utils';
import { Avatar, ErrorWrapper } from '../../components';
import { UserFabric } from '../../models';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

const AnimatedView = Animated.createAnimatedComponent(View);

export const DetailsScreen = () => {
  const { user } = useAppSelector(state => state.userState || {});

  const theme = useTheme();

  const sendEmail = useCallback(async () => {
    if (user?.email) {
      await mailTo(user?.email);
    }
  }, [user]);

  if (!UserFabric.checkModel(user)) {
    return <ErrorWrapper />;
  }

  return (
    <View style={theme.wrapper}>
      <Avatar text={`${user.firstName} ${user.lastName}`} imageUrl={user?.avatar} />
      <ScrollView>
        <AnimatedView
          entering={FadeInDown.duration(Config.animationMSStep * 2)}
          style={[styles.textWrapper, theme.placeholderBackground]}
        >
          <Text style={theme.placeholder}>{Strings.user.name}</Text>
          <Text style={theme.title}>{user.firstName}</Text>
        </AnimatedView>
        <AnimatedView
          entering={FadeInDown.duration(Config.animationMSStep * 3)}
          style={[styles.textWrapper, theme.placeholderBackground]}
        >
          <Text style={theme.placeholder}>{Strings.user.lastName}</Text>
          <Text style={theme.title}>{user.lastName}</Text>
        </AnimatedView>
        {!!user?.email && (
          <AnimatedView
            entering={FadeInDown.duration(Config.animationMSStep * 4)}
            style={[styles.textWrapper, theme.placeholderBackground]}
          >
            <Text style={theme.placeholder}>{Strings.user.email}</Text>
            <Text style={[theme.text, theme.link]} onPress={sendEmail}>
              {user.email}
            </Text>
          </AnimatedView>
        )}
      </ScrollView>
    </View>
  );
};
