/**
 * Главный экран приложения - содержит список пользователей
 */

import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl, View, Text, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { NavigationRow, ErrorWrapper, Loader, EmptyWrapper, NavigationRowRef } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers, fetchUser, fetchMoreUsers } from '../../redux/actionCreators';

import { NavigationScreens, RootStackParamList } from '../../types';
import { User } from '../../models';
import { styles } from './index.styles';
import { useTheme } from '../../hooks/useTheme';
import { Config, Strings } from '../../resources';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, NavigationScreens.Home>;

const AnimatedView = Animated.createAnimatedComponent(View);

export const HomeScreen = ({}: Props) => {
  const { users, isLoading, isError, pagination, isLoadingMore } = useAppSelector(state => state.usersState || {});
  const { user: userData, isLoading: isUserLoading, id: userId } = useAppSelector(state => state.userState || {});
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const navigationRowRef = useRef<NavigationRowRef>();

  const activeScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!isUserLoading) {
      activeScale.value = withSpring(1);
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    }
  }, [activeScale, isUserLoading, opacity, scale]);

  const activeAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: activeScale.value }],
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const startUploadUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startUploadMoreUsers = useCallback(() => {
    if (!pagination?.isListEnd && !isLoadingMore) {
      dispatch(fetchMoreUsers());
    }
  }, [dispatch, isLoadingMore, pagination?.isListEnd]);

  useEffect(() => {
    startUploadUsers();
  }, [startUploadUsers]);

  useEffect(() => {
    if (userId === userData?.id && navigationRowRef) {
      navigationRowRef.current?.handle();
    }
  }, [userData?.id, userId]);

  const onRefresh = useCallback(() => {
    startUploadUsers();
  }, [startUploadUsers]);

  const getUser = useCallback(
    (id: number) => () => {
      scale.value = withSpring(0.95);
      opacity.value = withSpring(0.7);
      if (Platform.OS === 'ios') {
        activeScale.value = withSpring(1.02);
      }

      dispatch(fetchUser(id));
    },
    [activeScale, dispatch, opacity, scale],
  );

  const renderFooter = useMemo(
    () => (
      <View style={styles.footer}>
        {isLoadingMore && <ActivityIndicator color={theme.loader.color} />}
        {!!pagination?.isListEnd && <Text style={[theme.placeholder, styles.hint]}>{Strings.user.allUpload}</Text>}
      </View>
    ),
    [isLoadingMore, pagination?.isListEnd, theme.loader.color, theme.placeholder],
  );

  if (isError) {
    return <ErrorWrapper retry={startUploadUsers} />;
  }

  return (
    <View style={theme.wrapper} pointerEvents={isUserLoading ? 'none' : 'auto'}>
      <FlatList
        ListEmptyComponent={!isLoading ? <EmptyWrapper /> : null}
        refreshControl={<RefreshControl refreshing={!!users?.length && !!isLoading} onRefresh={onRefresh} />}
        style={styles.wrapper}
        contentContainerStyle={styles.intent}
        data={users}
        renderItem={({ item: user, index }: ListRenderItemInfo<User>) => (
          <AnimatedView
            entering={FadeInDown.delay((index / (pagination?.perPageItemsCount || 1)) * Config.animationMSStep)}
            collapsable={true}
            style={[userId === user.id ? activeAnimatedStyles : animatedStyles]}
          >
            <NavigationRow
              ref={userId === user.id ? (navigationRowRef as RefObject<NavigationRowRef>) : undefined}
              text={`${user.firstName} ${user.lastName}`}
              navigateScreen={NavigationScreens.Details}
              isLoading={userId === user.id && !!isUserLoading}
              onPress={getUser(user.id)}
            />
          </AnimatedView>
        )}
        keyExtractor={user => String(user.id)}
        onEndReachedThreshold={0.2}
        onEndReached={startUploadMoreUsers}
        ListFooterComponent={renderFooter}
      />
      <Loader isVisible={!users?.length && !!isLoading} />
    </View>
  );
};
