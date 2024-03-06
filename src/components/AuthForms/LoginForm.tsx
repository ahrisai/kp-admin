import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, useAppDispatch } from '../../redux';
import { changeLoginState } from '../../redux/modalSlice';
import fetchUser from '../../redux/userThunks/fetchUser';
import { ErrorAlert } from './RegistrationForm';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface IFormInput {
  password: string;
  nickname: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const loginStatus = useSelector((root: RootState) => root.userReducer.fetchUserStatus);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const login = import.meta.env.VITE_ADMIN_LOGIN;
    const password = import.meta.env.VITE_ADMIN_PASSWORD;
    if (data.nickname !== login || data.password !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'wrong login or password',
      });
    } else await dispatch(fetchUser({ nickname: data.nickname, password: data.password }));
  };
  useEffect(() => {
    if (loginStatus === 'fulfilled') {
      dispatch(changeLoginState(false));
    }
  }, [loginStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <h3>Login</h3>
        <TextField
          {...register('nickname', {
            required: { value: true, message: 'nickname is required' },
            maxLength: { value: 10, message: 'max length is 10' },
            minLength: { value: 3, message: 'min length is 3' },
          })}
          size='small'
          label='Nickname'
          color='secondary'
          variant='filled'
        ></TextField>
        {errors.nickname?.type === 'required' && <ErrorAlert role='alert'>Nickname is required</ErrorAlert>}
        {errors.nickname?.type === 'maxLength' && <ErrorAlert role='alert'>Max length is 10</ErrorAlert>}
        {errors.nickname?.type === 'minLength' && <ErrorAlert role='alert'>Min length is 3</ErrorAlert>}

        <TextField
          type='password'
          {...register('password', {
            required: true,
          })}
          size='small'
          label='Password'
          color='secondary'
          variant='filled'
        ></TextField>

        {errors.password?.type === 'required' && <ErrorAlert role='alert'>Password is required</ErrorAlert>}

        <FormButtons>
          <LoginButton type='submit'>Welcome back</LoginButton>
        </FormButtons>
      </FormContainer>
    </form>
  );
};

const FormContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  background-color: #a0a0a0;
  border-radius: 15px;
`;

const FormButtons = styled.div`
  width: 100%;
  display: flex;
  column-gap: 20px;
`;

const LoginButton = styled.button`
  font-weight: 700;
  font-size: 14px;
  font-family: montserrat;
  text-transform: uppercase;
  color: #fff;
  padding: 5px 15px;
  border-radius: 4px;
  background-size: 100%;
  background-color: #df1818;
  height: 40px;

  border: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #282828;
    transform: scale(1.05);
  }
`;

export default LoginForm;
