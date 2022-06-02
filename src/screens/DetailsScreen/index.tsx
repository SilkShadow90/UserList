import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { styles } from './index.styles';
import { useAppSelector } from '../../redux/hooks';
import { Strings } from '../../resources';
import { AlertService } from '../../utils/AlertService';
import { UserFabric } from '../../models/UserFabric';
import { ErrorWrapper } from '../../components/ErrorWrapper';

const DetailsScreen = () => {
  const { user } = useAppSelector(state => state.userState || {});

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
    <View style={styles.wrapper}>
      <View style={styles.avatarWrapper}>
        {user?.avatar ? (
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.notAvatarText}>{`${user?.first_name?.[0]}${user?.last_name?.[0]}`}</Text>
        )}
      </View>

      <ScrollView>
        <View style={styles.textWrapper}>
          <Text style={styles.placeHolder}>{Strings.user.name}</Text>
          <Text style={styles.title}>{user.first_name}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.placeHolder}>{Strings.user.lastName}</Text>
          <Text style={styles.title}>{user.last_name}</Text>
        </View>
        {!!user?.email && (
          <View style={styles.textWrapper}>
            <Text style={styles.placeHolder}>{Strings.user.email}</Text>
            <Text style={styles.email} onPress={sendEmail}>
              {user?.email}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
