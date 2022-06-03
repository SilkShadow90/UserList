import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { NavigationRow, ErrorWrapper, Loader, EmptyWrapper, NavigationRowRef } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers, fetchUser } from '../../redux/actionCreators';

import { NavigationScreens, RootStackParamList } from '../../types';
import { User } from '../../models';
import { styles } from './index.styles';

type Props = NativeStackScreenProps<RootStackParamList, NavigationScreens.Home>;

export const HomeScreen = ({}: Props) => {
  const { users, isLoading, isError } = useAppSelector(state => state.usersState || {});
  const { user: userData, isLoading: isUserLoading, id: userId } = useAppSelector(state => state.userState || {});
  const dispatch = useAppDispatch();

  const navigationRowRef = useRef<NavigationRowRef>();

  const startUploadUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
      dispatch(fetchUser(id));
    },
    [dispatch],
  );

  if (isError) {
    return <ErrorWrapper retry={startUploadUsers} />;
  }

  return (
    <View style={styles.flex} pointerEvents={isUserLoading ? 'none' : 'auto'}>
      <FlatList
        ListEmptyComponent={!isLoading ? <EmptyWrapper /> : null}
        refreshControl={<RefreshControl refreshing={!!users?.length && !!isLoading} onRefresh={onRefresh} />}
        style={styles.wrapper}
        contentContainerStyle={styles.intent}
        data={users}
        renderItem={({ item: user }: ListRenderItemInfo<User>) => (
          <NavigationRow
            ref={userId === user.id ? (navigationRowRef as RefObject<NavigationRowRef>) : undefined}
            text={`${user.first_name} ${user.last_name}`}
            navigateScreen={NavigationScreens.Details}
            isLoading={userId === user.id && !!isUserLoading}
            onPress={getUser(user.id)}
          />
        )}
        keyExtractor={user => String(user.id)}
      />
      <Loader isVisible={!users?.length && !!isLoading} />
    </View>
  );
};
