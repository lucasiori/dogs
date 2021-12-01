import React from 'react';
import { FORGOT_PASSWORD_POST } from '../../../api';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Error';
import Head from '../../Head';

const LoginForgotPassword = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = FORGOT_PASSWORD_POST({
        login: login.value,
        url: `${window.location.origin}/login/resetar`
      });
  
      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha?" />
      
      <h1 className="title">Perdeu a senha?</h1>

      {data ? (
        <p style={{ color: '#4c1' }}>
          {data}
        </p>
      ): (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />

          <Button disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar email'}
          </Button>

          {error && <Error error={error} />}
        </form>
      )}
    </section>
  );
}

export default LoginForgotPassword;