import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { RootState, useAppDispatch } from '../redux';
import { changeIsAuth } from '../redux/userSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);

  const handleExit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You need to enter your data next time',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#a4a4a4',
      confirmButtonText: 'Leave',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        dispatch(changeIsAuth(false));
      }
    });
  };
  const navigate = useNavigate();
  return (
    <NavbarContainer>
      <LogoWrapper
        onClick={() => {
          navigate('/');
        }}
      >
        <LogoImage src='/images/header1-logo.jpeg' />
        <LogoText>
          Squad
          <LogoTextSpan>Admin</LogoTextSpan>
        </LogoText>
      </LogoWrapper>
      {isAuth && (
        <AuthedNavbar>
          <NavProfile to={`/profile/${user?.nickname}`}>
            <NavNickname>{user?.nickname}</NavNickname>
            <NavAvatar src={user?.user_avatar} />
          </NavProfile>
          <Exit src='/images/logout.png' onClick={handleExit} />
        </AuthedNavbar>
      )}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 60px;
  border-radius: 5px;
`;
const LogoText = styled.h1`
  margin-left: 20px;
  font-size: 28px;
  background: linear-gradient(45deg, #f33e3e, #949494);
  -webkit-background-clip: text;
  color: transparent;
`;

const LogoTextSpan = styled.span`
  color: #fff;
`;

const AuthedNavbar = styled.div`
  width: 70%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavNickname = styled.span`
  color: #fff;
  transition: all 0.2s ease-in-out;
`;
const NavAvatar = styled.img`
  display: block;
  width: 50px;
  height: 50px;

  border-radius: 50%;
  transition: transform 0.2s linear;
`;
const NavProfile = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover ${NavNickname} {
    color: #ffbf00;
    transform: scale(1.06);
  }
  &:hover ${NavAvatar} {
    transform: scale(1.03);
  }
`;

const Exit = styled.img`
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Navbar;
