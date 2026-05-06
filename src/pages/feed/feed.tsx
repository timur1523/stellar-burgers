import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/orders-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feed, feedLoading } = useSelector((state) => state.orders);
  /** TODO: взять переменную из стора */

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);
  if (feedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feed.orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
