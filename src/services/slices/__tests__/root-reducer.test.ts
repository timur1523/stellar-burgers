import { rootReducer } from '../index';

describe('rootReducer', () => {
  it('Начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      ingredients: { ingredients: [], loading: false, error: null },
      burgerConstructor: { bun: null, ingredients: [] },
      orders: {
        feed: { orders: [], total: 0, totalToday: 0 },
        userOrders: [],
        currentOrder: null,
        modalOrder: null,
        loading: false,
        error: null,
        feedLoading: false,
        modalLoading: false
      },
      auth: {
        user: null,
        isAuth: false,
        loading: false,
        error: null,
        isAuthChecked: false
      }
    });
  });
});
