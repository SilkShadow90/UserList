import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, View } from 'react-native';
import { NavigationScreens, RootStackParamList } from '../../types/navigationScreens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { NavigationRow } from '../../components/NavigationRow';
import { Loader } from '../../components/Loader';
import { User } from '../../models/User';
import { styles } from './index.styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/actionCreators/users';
import { ErrorWrapper } from '../../components/ErrorWrapper';
import { fetchUser } from '../../redux/actionCreators/user';
import { EmptyWrapper } from '../../components/EmptyWrapper';

type Props = NativeStackScreenProps<RootStackParamList, NavigationScreens.Home>;

const HomeScreen = ({}: Props) => {
  const { users, isLoading, isError } = useAppSelector(state => state.usersState || {});
  const {
    user: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    id: userId,
  } = useAppSelector(state => state.userState || {});
  const dispatch = useAppDispatch();

  const startUploadUsers = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    startUploadUsers();
  }, [startUploadUsers]);

  const onRefresh = useCallback(() => {
    startUploadUsers();
  }, [startUploadUsers]);

  const getUser = useCallback(
    (id: number) => () => {
      dispatch(fetchUser(id));
    },
    [dispatch],
  );

  if (isError || isUserError) {
    return <ErrorWrapper retry={startUploadUsers} />;
  }

  return (
    <View style={styles.flex} pointerEvents={isUserLoading ? 'none' : 'auto'}>
      <FlatList
        ListEmptyComponent={<EmptyWrapper />}
        refreshControl={<RefreshControl refreshing={!!users?.length && !!isLoading} onRefresh={onRefresh} />}
        style={styles.wrapper}
        contentContainerStyle={styles.intent}
        data={users}
        renderItem={({ item: user }: ListRenderItemInfo<User>) => (
          <NavigationRow
            text={`${user.first_name} ${user.last_name}`}
            navigateScreen={NavigationScreens.Details}
            isLoading={userId === user.id && !!isUserLoading}
            onPress={getUser(user.id)}
            isSuccess={userId === user.id && !!userData?.id}
          />
        )}
        keyExtractor={user => String(user.id)}
      />
      <Loader isVisible={!users?.length && !!isLoading} />
    </View>
  );
};

export default HomeScreen;
