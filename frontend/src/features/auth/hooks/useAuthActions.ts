import { authApi } from '../../../store/authApi';

export function useAuthActions() {
  const [loginUser] = authApi.useLoginMutation();
  const [registerUser] = authApi.useRegisterMutation();

  return {
    loginUser: (username: string, password: string) => loginUser({username, password}).unwrap(),
    registerUser: (username: string, password: string) => registerUser({username, password}).unwrap(),
  };
}