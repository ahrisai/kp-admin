import styled from 'styled-components';
import Navbar from './Navbar';
import Container from './Container';

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Container>
          <Navbar />
        </Container>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 90px;
  padding: 13px 0;
  background-color: rgb(31, 31, 31);
  color: #fff;
  display: flex;
  align-items: center;
`;

export default Header;
