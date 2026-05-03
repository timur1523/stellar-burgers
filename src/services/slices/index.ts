import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';

export const rootReducer = combineReducers({ ingredients: ingredientsReducer });
