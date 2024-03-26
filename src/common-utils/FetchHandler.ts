import auth from '@react-native-firebase/auth';
export interface FetchOptions {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  body?: string | FormData | null;
}

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default async (fetchOptions: FetchOptions) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error('No authenticated user found');
  }

  const idToken = await user.getIdToken();
  // Make the fetch request
  console.log(fetchOptions);
  const response = await fetch(fetchOptions.url, {
    method: fetchOptions.method,
    headers: {...header, Authorization: `Bearer ${idToken}`},
    body: fetchOptions.body,
  });
  return await response.json();
};
