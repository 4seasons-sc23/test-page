import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Header() {
    const navigate = useNavigate();

    const name = sessionStorage.getItem('name');

    const onClickLogo = () => {
        navigate('/');
    };

    const onClickSigninButton = () => {
        navigate('/signin');
    };

    const onClickLogoutButton = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까 ?')) {
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('applicationId');
            sessionStorage.removeItem('ApiKey');
            sessionStorage.removeItem('type');
            window.location.href = '/';
        }
    };

    return (
        <div className={styles.header}>
            <div onClick={onClickLogo} className={styles.header_logo}>
                <h2>JINY's SHOP</h2>
            </div>
            <div>
                {name ? (
                    <div className={styles.buttonArea}>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/info')}>
                            {name}
                        </div>
                        <div className={styles.divider} />
                        <button onClick={onClickLogoutButton} className={styles.button}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className={styles.buttonArea}>
                        <button onClick={onClickSigninButton} className={styles.button}>
                            Sign in
                        </button>
                        <div className={styles.divider} />
                        <button className={styles.button}>Sign up</button>
                    </div>
                )}
            </div>
        </div>
    );
}
