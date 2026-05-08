import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: null | TIngredient;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TIngredient>) {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient as TConstructorIngredient);
        }
      },
      prepare(ingredient: TIngredient) {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        }
        return { payload: { ...ingredient, id: Date.now().toString() } };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    replaceIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    },
    clearConstructor(state) {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  replaceIngredient,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
