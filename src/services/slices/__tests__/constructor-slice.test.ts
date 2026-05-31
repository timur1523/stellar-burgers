import { TConstructorIngredient, TIngredient } from '@utils-types';
import constructorReducer, {
  addIngredient,
  clearConstructor,
  removeIngredient,
  replaceIngredient
} from '../constructor-slice';

describe('constructorSlice', () => {
  const bun: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'bun'
  };
  const sause: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    id: 'ingredient'
  };
  const ingredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: 'ingredient'
  };
  it('Начальное состояние', () => {
    const initialState = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(initialState).toEqual({ ingredients: [], bun: null });
  });
  it('Добавление булочки в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });
  it('Добавление ингредиента в коструктор', () => {
    const state = constructorReducer(undefined, addIngredient(sause));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: sause._id,
      name: sause.name
    });
    expect(state.bun).toBeNull();
  });
  it('Удаление ингредиента из конструктора', () => {
    const inititalState = { bun: null, ingredients: [sause] };
    const state = constructorReducer(inititalState, removeIngredient(sause.id));
    expect(state.ingredients).toEqual([]);
  });
  it('Изменение порядка ингредиентов в конструкторе', () => {
    const inititalState = { bun: null, ingredients: [sause, ingredient] };
    const state = constructorReducer(
      inititalState,
      replaceIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients).toEqual([ingredient, sause]);
  });
  it('Очистка конструктора', () => {
    const inititalState = { bun, ingredients: [sause, ingredient] };
    const state = constructorReducer(inititalState, clearConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
