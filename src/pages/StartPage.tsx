import styled from 'styled-components';

import LoginForm from '../components/AuthForms/LoginForm';

const StartPage = () => {
  return (
    <>
      <Main>
        <ContentContainer>
          <Content>
            <LoginForm />
          </Content>
        </ContentContainer>
      </Main>
    </>
  );
};

const Main = styled.main`
  height: 70vh;
  background-image: url('/images/start-page-bg.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 30px;
`;
const Content = styled.div`
  margin-top: 50px;
`;

export default StartPage;
