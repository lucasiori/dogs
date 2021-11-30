import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import useForm from '../../../hooks/useForm'; 
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Error';
import Head from '../../Head';
import styles from './style.module.css';
import buttonStyles from '../../Forms/Button/style.module.css';

const LoginForm = () => {
  const { error, loading, userLogin } = useContext(UserContext);

  const username = useForm();
  const password = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="senha" type="password" name="password" {...password} />

        <Button disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>

        {error && <Error error="Dados incorretos." />}
      </form>

      <Link className={styles.forgotPassword} to="/login/forgot-password">
        Perdeu a Senha?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={buttonStyles.button} to="/login/create">
          Cadastro
        </Link>
      </div>

    </section>
  );
}

export default LoginForm;