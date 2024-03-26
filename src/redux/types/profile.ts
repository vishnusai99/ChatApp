export const ACTION = {
  GET_PROFILE: 'PROFILE/GET',
};

export interface Profile {
  uid: string;
  displayName: string;
  email: string;
}
