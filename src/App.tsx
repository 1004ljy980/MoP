import './reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import ROUTES from './constants/Routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectListMain from './pages/ProjectList/indexCopy';
import Header from './components/Header/Header';
import Error from './components/common/Error';
import ChatBot from './components/ChatBot';
import Project from './pages/Project';
import MyPage from './pages/MyPage';
import styles from './index.module.scss';
import Login from './pages/Login';
import Password from './pages/ChangePassword';
import ProjectWriting from './pages/ProjectWriting';
import UpdateUser from './pages/UpdateUser';
import Register from './pages/Register';
import UserPage from './pages/UserPage';
import Modify from './pages/ProjectModify';
import Preview from './pages/ProjectPreview';
import PortfolioWriting from './pages/PortfolioWriting';
import PortfolioDetail from './pages/PortfolioDetail';
import Main from './pages/Main';
import PortfolioList from './pages/PortfolioList';
import PortfolioModify from './pages/PortfolioModify';
import { loginAtom } from './recoil/loginState';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { themeAtom } from './recoil/themeState';

function App() {
  const darkMode = useRecoilValue(themeAtom);

  const resetLogin = useResetRecoilState(loginAtom);
  useEffect(() => {
    return () => {
      resetLogin();
    };
  }, []);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <div className={`${styles.container} ${darkMode ? `${styles.darkMode}` : ''}`}>
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Main />} />
            <Route path={ROUTES.PROJECT_LIST} element={<ProjectListMain />} />
            <Route path={`${ROUTES.CREATE}:type`} element={<ProjectWriting />} />
            <Route path={`${ROUTES.PROJECT}:id`} element={<Project />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.EDIT_PASSWORD} element={<Password />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
            <Route path={ROUTES.USER_UPDATE} element={<UpdateUser />} />
            <Route path={`${ROUTES.USER_PAGE}:id`} element={<UserPage />} />
            <Route path={ROUTES.MODIFY_PROJECT} element={<Modify />} />
            <Route path={ROUTES.PREVIEW_PROJECT} element={<Preview />} />
            <Route path={ROUTES.PORTFOLIO_CREATE} element={<PortfolioWriting />} />
            <Route path={`${ROUTES.PORTFOLIO_MODIFY}:id`} element={<PortfolioModify />} />
            <Route path={`${ROUTES.PORTFOLIO_DETAIL}:id`} element={<PortfolioDetail />} />
            <Route path={ROUTES.PORTFOLIO_LIST} element={<PortfolioList />} />
          </Routes>
          <ChatBot />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
