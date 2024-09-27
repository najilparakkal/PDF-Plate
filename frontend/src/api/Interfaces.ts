export interface IUserDetails {
    userName?: string;
    email?: string;
    password?: string;
}

export interface IUserState {
    userName?: string | null;
    email?: string | null;
    status?: 'idle' | 'loading' | 'failed' | 'success';
    error?: string | null;
  }