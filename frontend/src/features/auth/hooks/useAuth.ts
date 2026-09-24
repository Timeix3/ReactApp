import { authApi } from '../../../store/authApi';
import { useAppSelector } from '../../../app/store';

export function useUser() {
    const token = useAppSelector((state) => state.auth.token);
    const {data: user, isLoading} = authApi.useGetUserQuery(undefined, { skip: !token });
    return { user, isLoading };
}