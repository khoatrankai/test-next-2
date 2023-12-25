import {combineReducers} from 'redux';
import profileReducer from './profileReducer/profileSlice';
import changeLanguage from './changeLanguageReducer/changeLanguage';
import dataLanguage from './dataLanguage';
import profileReducerV3 from './profileReducerV3';
import locationReducer from './locationReducer';
import categoryIdReducer from './categoryIdReducer';
import searchReducer from './searchReducer';
import checkPost from './checkPost';

const reducers = combineReducers({
  profile: profileReducer,
  dataLanguage: dataLanguage,
  changeLaguage: changeLanguage,
  dataProfileV3: profileReducerV3,
  dataLocation: locationReducer,
  categoryId: categoryIdReducer,
  dataSearchResult: searchReducer,
  checkPost: checkPost,
});
export default reducers;

export type RootState = ReturnType<typeof reducers>;
