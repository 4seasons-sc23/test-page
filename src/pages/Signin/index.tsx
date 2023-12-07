import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

interface ISigninForm {
    account: string;
    password: string;
}

export default function SigninContainer() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<ISigninForm>({ account: '', password: '' });

    const onChangeLoginForm = (key: keyof ISigninForm, value: string) => {
        setLoginForm((prev) => ({ ...prev, [key]: value }));
    };

    const onClickLoginButton = () => {
        if (loginForm.account === 'kmh0913') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '1');
            window.sessionStorage.setItem('name', '강동하');
            navigate('/');
        }

        if (loginForm.account === 'long') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '2');
            window.sessionStorage.setItem('name', '장성호');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '3');
            window.sessionStorage.setItem('name', '유진');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny1') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '4');
            window.sessionStorage.setItem('name', '유지니');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny2') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '5');
            window.sessionStorage.setItem('name', '지니');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny3') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '6');
            window.sessionStorage.setItem('name', '진');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny4') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '7');
            window.sessionStorage.setItem('name', '유');
            navigate('/');
        }

        if (loginForm.account === 'itsjiny5') {
            alert('로그인에 성공했습니다.');
            window.sessionStorage.setItem('id', '8');
            window.sessionStorage.setItem('name', '이츠지닝');
            navigate('/');
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickLoginButton();
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <h2 className={styles.title}>LOG IN</h2>
                <div className={styles.inputArea}>
                    <input
                        value={loginForm.account}
                        placeholder="ID"
                        onKeyDown={onKeyDown}
                        onChange={(e) => onChangeLoginForm('account', e.target.value)}
                    />
                    <input
                        type="password"
                        value={loginForm.password}
                        placeholder="Password"
                        onKeyDown={onKeyDown}
                        onChange={(e) => onChangeLoginForm('password', e.target.value)}
                    />
                </div>
                <div className={styles.buttonArea}>
                    <button className={styles.submitButton} onClick={onClickLoginButton}>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
