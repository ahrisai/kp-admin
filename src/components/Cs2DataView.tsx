import React from 'react';
import styled from 'styled-components';
import MapsImages from '../consts/MapsImages';
import { RootState } from '../redux';
import { useSelector } from 'react-redux';
const Cs2DataView = () => {
  const cs2_data = useSelector((state: RootState) => state.playerReducer.player?.cs2_data);
  return (
    <Cs2Stats>
      <Cs2StatsHeader>
        <Cs2StatsText>
          Уровень: <img src={cs2_data?.lvlImg} alt='' />
        </Cs2StatsText>
      </Cs2StatsHeader>
      <Cs2StatsMain>
        <Cs2StatsText>
          Матчи: &nbsp;<span>{cs2_data?.matches}</span>
        </Cs2StatsText>
        <Cs2StatsText>
          Победы: &nbsp;<span>{cs2_data?.wins}</span>
        </Cs2StatsText>
        <Cs2StatsText>
          Процент побед: &nbsp;<span>{cs2_data?.winrate} %</span>
        </Cs2StatsText>
        <Cs2StatsText>
          КД: &nbsp;<span>{cs2_data?.kd}</span>
        </Cs2StatsText>
        <Cs2StatsText>
          Убийств в голову: &nbsp;<span>{cs2_data?.hs} %</span>
        </Cs2StatsText>
      </Cs2StatsMain>

      <RolesContainer>
        <Cs2StatsText>Роли:</Cs2StatsText>
        <Roles>{cs2_data?.roles?.map((role) => <Role key={role.cs2Role.name}>{role.cs2Role.name}</Role>)}</Roles>
      </RolesContainer>

      <MapsContainer>
        <Cs2StatsText>Избранные карты:</Cs2StatsText>
        <Maps>{cs2_data?.maps?.map((map) => <img key={MapsImages[map.cs2Map.name]} src={MapsImages[map.cs2Map.name]} />)}</Maps>
      </MapsContainer>
    </Cs2Stats>
  );
};

export default Cs2DataView;

const Cs2Stats = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Cs2StatsHeader = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;
const Cs2StatsMain = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  flex-wrap: wrap;
  column-gap: 3%;
  row-gap: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
`;

const Cs2StatsText = styled.p`
  white-space: nowrap;
  font-size: 14px;
  color: #9f9f9f;
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    font-weight: 700;
    color: #e0e0e0;
  }

  img {
    margin-left: 10px;
    width: 45px;
  }
`;

const RolesContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
  flex-wrap: wrap;
  @media (max-width: 980px) {
    flex-wrap: wrap;
  }
  &:last-child {
    padding: 0;
    border: 0;
  }
`;

const Roles = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Role = styled.div`
  color: #fff;
`;

const Maps = styled(Roles)`
  img {
    width: 100px;
    border-radius: 5px;
  }
`;

const MapsContainer = styled(RolesContainer)``;
