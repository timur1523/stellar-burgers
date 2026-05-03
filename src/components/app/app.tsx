import { ConstructorPage, Feed, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <ConstructorPage />
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )} */}
    </div>
  );
};

export default App;
