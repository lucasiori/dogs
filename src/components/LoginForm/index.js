import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_POST, USER_GET } from '../../api/index';
import useForm from '../../hooks/useForm'; 
import Input from '../Forms/Input';
import Button from '../Forms/Button';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value
      });

      const response = await fetch(url, options);
      const { token } = await response.json();
      
      localStorage.setItem('dogs:token', token);
      getUser(token);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('dogs:token');

    if (token) {
      getUser(token);
    }
  }, []);

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="senha" type="password" name="password" {...password} />

        <Button>Entrar</Button>
      </form>

      <Link to="/login/create">Cadastro</Link>
    </section>
  );
}

export default LoginForm;