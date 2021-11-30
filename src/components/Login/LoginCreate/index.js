import React, { useContext } from 'react';
import { USER_POST } from '../../../api';
import { UserContext } from '../../../contexts/UserContext';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Error';
import Head from '../../Head';

const LoginCreate = () => {
  const { userLogin } = useContext(UserContext);

  const { loading, error, request } = useFetch();
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
  
    const { response } = await request(url, options);
    
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        <Button disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginCreate;