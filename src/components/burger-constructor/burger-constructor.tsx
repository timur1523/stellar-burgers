import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearCurrentOrder,
  cancelOrder,
  createOrder
} from '../../services/slices/orders-slice';
import { clearConstructor } from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector((state) => state.burgerConstructor);
  const { isAuth } = useSelector((state) => state.auth);
  const { loading, currentOrder } = useSelector((state) => state.orders);
  const constructorItems = {
    bun,
    ingredients
  };
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || loading) return;
    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ids));
  };
  const closeOrderModal = () => {
    dispatch(cancelOrder());
    if (currentOrder) {
      dispatch(clearConstructor());
    }
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
