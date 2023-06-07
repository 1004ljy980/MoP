import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfile } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import DefaultUserImg from '../../assets/DefaultUser.png';
import { FcBriefcase, FcSupport } from "react-icons/fc";

function Profile() {
  const [user, setUser] = useState<TypeUserProfile>();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const { data } = await getUserProfile();
      setUser(data);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            alert(`잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.`);
            navigate(`${ROUTES.LOGIN}`);
            break;
        }
      }
    }
  };

  const handleClickEdit = () => {
    navigate(`${ROUTES.USER_UPDATE}`);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.profileContainer}> 
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={user?.user_img || DefaultUserImg} alt={user?.user_name}></img>
        <button className={styles.updateButton} onClick={handleClickEdit}>
          편집
        </button>
      </div>
      <div className={styles.introWrapper}>
        <div className={styles.name}>{user?.user_name}</div>
        <div className={styles.intro}>{user?.user_introduction}</div>
        <div className={styles.career}>
          <FcBriefcase/>
          {user?.user_career_goal 
          ? user.user_career_goal 
          : <div className={styles.emptyCareer}>{user?.user_name}님의 목표 직군이 비어있어요</div>}
        </div>
        <div className={styles.stacks}>
          <FcSupport />
          {user?.user_stacks?.stackList && user?.user_stacks?.stackList?.length > 0 
          ? user?.user_stacks?.stackList?.map((stack, index) => {
            return (
              <div className={styles.stack} key={`${stack}-${index}`}>
                {stack}
              </div>
            );
          }) : <div className={styles.emptyStack}>{user?.user_name}님의 기술 스택이 비어있어요</div>}
      </div>
      </div>
    </div>
  );
}

export default Profile;
