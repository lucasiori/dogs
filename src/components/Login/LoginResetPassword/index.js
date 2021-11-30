import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD_POST } from '../../../api';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Error';
import Head from '../../Head';

const LoginResetPassword = () => {
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [key, setKey] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = RESET_PASSWORD_POST({
        login,
        key,
        password: password.value
      });
  
      const { response } = await request(url, options);
    
      if (response.ok) {
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const login = params.get('login');
    const key = params.get('key');

    if (login) {
      setLogin(login);
    }

    if (key) {
      setKey(key);
    }
  }, []);

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />

      <h1 className="title">Resete a Senha</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />

        <Button disabled={loading}>
          {loading ? 'Resetando...' : 'Resetar'}
        </Button>

        {error && <Error error={error} />}
      </form>
    </section>
  );
}

export default LoginResetPassword;