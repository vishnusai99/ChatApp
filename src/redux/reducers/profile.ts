import {BASE_URL} from '../../../config';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import FetchHandler, {FetchOptions} from '../../common-utils/FetchHandler';
import auth from '@react-native-firebase/auth';

const baseUrl = BASE_URL;

interface Profile {
  uid: string;
  displayName: string;
  email: string;
  pictureUrl?: string;
}

interface initialStateInterface {
  profile: Profile[];
  userProfile?: Profile;
}

const initialState: initialStateInterface = {
  profile: [],
};

const searchProfile = createAsyncThunk(
  'profile/searchProfile',
  async (query: string, thunkAPI) => {
    try {
      const options: FetchOptions = {
        method: 'GET',
        url: `${baseUrl}/profile/search/${query}`,
      };
      const data = await FetchHandler(options);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
const getProfile = createAsyncThunk('profile/getProfile', async thunkAPI => {
  try {
    const options: FetchOptions = {
      method: 'GET',
      url: `${baseUrl}/profile/get/${auth().currentUser?.uid}`,
    };
    const data = await FetchHandler(options);
    return data;
  } catch (error) {
    throw error;
  }
});
const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (body: {pictureUrl: string}, thunkAPI) => {
    try {
      const options: FetchOptions = {
        method: 'PUT',
        url: `${baseUrl}/profile/update/${auth().currentUser?.uid}`,
        body: JSON.stringify(body),
      };
      const data = await FetchHandler(options);
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchProfile.pending, state => {
        console.log('Profile search pending');
      })
      .addCase(searchProfile.fulfilled, (state, action) => {
        console.log(action.payload, 'profile action payload');
        state.profile = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log(action.payload, 'profile action payload');
        state.userProfile = action.payload;
      })
      .addCase(searchProfile.rejected, (state, action) => {
        console.log('Profile search rejected');
      });
  },
});

export {searchProfile};
export default profileSlice.reducer;
