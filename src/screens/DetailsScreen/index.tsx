import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { Strings } from '../../resources';
import { AlertService } from '../../utils';
import { ErrorWrapper } from '../../components';
import { UserFabric } from '../../models';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';

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
      <View style={[theme.shadow, styles.avatarWrapper]}>
        {user?.avatar ? (
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.notAvatarText}>{`${user?.first_name?.[0]}${user?.last_name?.[0]}`}</Text>
        )}
      </View>

      <ScrollView>
        <View style={[styles.textWrapper, theme.placeholderBackground]}>
          <Text style={theme.placeholder}>{Strings.user.name}</Text>
          <Text style={theme.title}>{user.first_name}</Text>
        </View>
        <View style={[styles.textWrapper, theme.placeholderBackground]}>
          <Text style={theme.placeholder}>{Strings.user.lastName}</Text>
          <Text style={theme.title}>{user.last_name}</Text>
        </View>
        {!!user?.email && (
          <View style={[styles.textWrapper, theme.placeholderBackground]}>
            <Text style={theme.placeholder}>{Strings.user.email}</Text>
            <Text style={styles.email} onPress={sendEmail}>
              {user?.email}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
