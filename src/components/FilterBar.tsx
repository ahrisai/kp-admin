import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux';
import { useAppDispatch } from '../redux';
import { setCs2_data, setDesc, setFilter, setGender, setSort, setUser_Avatar } from '../redux/playerSlice';
const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { filter, sort, gender, cs2_data, desc, user_avatar } = useSelector((state: RootState) => state.playerReducer);
  const player = {
    id: 1,
    nickname: 'nickname',
    email: 'email@example.com',
    description: 'description',
    gender: 'male',
    birthday: '2000-01-01',
  };
  const handleChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'male' || e.target.value === 'female' || e.target.value === '') dispatch(setGender(e.target.value));
  };

  const handleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value));
  };

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'asc' || e.target.value === 'desc') dispatch(setSort(e.target.value));
  };

  const handleChangeCs2Data = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCs2_data(e.target.checked));
  };

  const handleChangeUser_avatar = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser_Avatar(e.target.checked));
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDesc(e.target.checked));
  };
  return (
    <FilterBarContainer>
      <div>
        <h3>Filter by</h3>
        <select value={filter} onChange={(e) => handleChangeFilter(e)}>
          {Object.keys(player).map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>sort by</h3>
        <select onChange={(e) => handleChangeSort(e)} value={sort}>
          <option value='asc'>ascending</option>
          <option value='desc'>descending</option>
        </select>
      </div>

      <div>
        <h3>gender</h3>
        <select onChange={(e) => handleChangeGender(e)} value={gender}>
          <option value='male'>male</option>
          <option value='female'>female</option>
          <option value=''>any</option>
        </select>
      </div>

      <div>
        <h3>Include</h3>
        <div>
          <div>
            <input onChange={(e) => handleChangeCs2Data(e)} type='checkbox' checked={cs2_data} />
            <label>cs2_data</label>
          </div>

          <div>
            <input onChange={(e) => handleChangeUser_avatar(e)} type='checkbox' checked={user_avatar} />
            <label>user_avatar</label>
          </div>
          <div>
            <input onChange={(e) => handleChangeDescription(e)} type='checkbox' checked={desc} />
            <label>description</label>
          </div>
        </div>
      </div>
    </FilterBarContainer>
  );
};

const FilterBarContainer = styled.div`
  width: 15%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: aliceblue;
  height: 100%;
`;

export default FilterBar;
