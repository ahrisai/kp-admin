import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux';
import Player from '../types/Player';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import CommonButton from './UI/CommonButton';
import dayjs, { Dayjs } from 'dayjs';
import Swal from 'sweetalert2';
import { validateNickname } from '../util/checkNickname';
import { validatePassword } from '../util/checkPassword';
import { validateEmail } from '../util/checkEmail';
import { checkYears } from '../util/checkYears';
import createPlayer from '../redux/playerThunks/createPlayer';
import deletePlayer from '../redux/playerThunks/deletePlayer';
import updatePlayer from '../redux/playerThunks/updatePlayer';
import fetchPlayers from '../redux/playerThunks/fetchPlayers';
import { setPlayer, setSearchFilter, setSearchQuery } from '../redux/playerSlice';
import { changeLoginState } from '../redux/modalSlice';
import Modal from './Modal';

const PlayersTable = () => {
  const [renderPlayers, setRenderPlayers] = useState<Player[]>([]);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState<Player | null>(null);
  const players = useSelector((state: RootState) => state.playerReducer.players);
  const { filter, sort, gender, cs2_data, desc, user_avatar, searchQuery, searchFilter } = useSelector(
    (state: RootState) => state.playerReducer,
  );
  const currentPage = useSelector((state: RootState) => state.playerReducer.currentPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [filter, sort, gender, cs2_data, desc, user_avatar, currentPage]);

  useEffect(() => {
    setRenderPlayers(players);
  }, [players]);

  const startCreatingNewPlayer = () => {
    setNewPlayer({
      nickname: '',
      password: '',
      description: '',
      user_avatar: '',
      birthday: '',
      gender: 'male',
      email: '',
    });
  };

  const checkCs2Data = (player: Player) => {
    dispatch(setPlayer(player));
    dispatch(changeLoginState(true));
  };

  const newPlayerNickname = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPlayer({ ...newPlayer, nickname: e.target.value } as Player);
  };
  const newPlayerPassword = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPlayer({ ...newPlayer, password: e.target.value } as Player);
  };

  const newPlayerDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPlayer({ ...newPlayer, description: e.target.value } as Player);
  };
  const newPlayerEmail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPlayer({ ...newPlayer, email: e.target.value } as Player);
  };

  const newPlayerGender = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewPlayer({ ...newPlayer, gender: e.target.value } as Player);
  };
  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const avatar = e.target.files[0];
    const storageRef = ref(storage, `avatars/${avatar.name}`);
    await uploadBytes(storageRef, avatar).then(() => {
      getDownloadURL(storageRef).then((url: string) => {
        setNewPlayer({ ...newPlayer, user_avatar: url } as Player);
      });
    });
  };

  const finishCreatingPlayer = () => {
    console.log(newPlayer);
    if (newPlayer) {
      if (newPlayer?.nickname.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: 'min length is 3',
        });
        return;
      }
      if (newPlayer?.nickname.length > 15) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: `max length is 15, your length is:${newPlayer.nickname.length}`,
        });
        return;
      }
      if (validateNickname(newPlayer.nickname)) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: `You can only use english letters or numbers`,
        });
        return;
      }

      if (newPlayer?.password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: 'Password error',
          text: 'min length is 6',
        });
        return;
      }
      if (newPlayer?.password.length > 15) {
        Swal.fire({
          icon: 'error',
          title: 'Password error',
          text: `max length is 15, your length is:${newPlayer.password.length}`,
        });
        return;
      }
      if (validatePassword(newPlayer.password)) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: `You can only use english letters or numbers`,
        });
        return;
      }

      if (validateEmail(newPlayer.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Email error',
          text: `Incorrect format. Try again`,
        });
        return;
      }
      const birth: Dayjs = dayjs(newPlayer.birthday);

      if (!checkYears(birth)) {
        Swal.fire({
          icon: 'error',
          title: 'Birthday error',
          text: `Too yong for this shit`,
        });
        return;
      }
    }

    dispatch(createPlayer(newPlayer as Player));
    setNewPlayer(null);
  };

  const handleDeletePlayer = (id: number) => {
    dispatch(deletePlayer(id));
  };

  const editPlayerNickname = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditPlayer({ ...editPlayer, nickname: e.target.value } as Player);
  };

  const editPlayerDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditPlayer({ ...editPlayer, description: e.target.value } as Player);
  };

  const editPlayerEmail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditPlayer({ ...editPlayer, email: e.target.value } as Player);
  };

  const editPlayerGender = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditPlayer({ ...editPlayer, gender: e.target.value } as Player);
  };
  const uploadEditAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const avatar = e.target.files[0];
    const storageRef = ref(storage, `avatars/${avatar.name}`);
    await uploadBytes(storageRef, avatar).then(() => {
      getDownloadURL(storageRef).then((url: string) => {
        setEditPlayer({ ...editPlayer, user_avatar: url } as Player);
      });
    });
  };

  const finishEditingPlayer = () => {
    console.log(editPlayer);
    if (editPlayer) {
      if (editPlayer?.nickname.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: 'min length is 3',
        });
        return;
      }
      if (editPlayer?.nickname.length > 15) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: `max length is 15, your length is:${newPlayer?.nickname.length}`,
        });
        return;
      }
      if (validateNickname(editPlayer.nickname)) {
        Swal.fire({
          icon: 'error',
          title: 'Nickname error',
          text: `You can only use english letters or numbers`,
        });
        return;
      }

      if (validateEmail(editPlayer.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Email error',
          text: `Incorrect format. Try again`,
        });
        return;
      }
      const birth: Dayjs = dayjs(editPlayer.birthday);

      if (!checkYears(birth)) {
        Swal.fire({
          icon: 'error',
          title: 'Birthday error',
          text: `Too yong for this shit`,
        });
        return;
      }
    }
    dispatch(updatePlayer(editPlayer as Player));
    setEditPlayer(null);
  };

  const handleChangeSearchFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchFilter(e.target.value));
  };

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const search = async () => {
    dispatch(fetchPlayers());
  };
  return (
    <>
      <Modal />
      <MainContainer>
        <SearchContainer>
          <SearhInput
            placeholder='Type and search...'
            value={searchQuery}
            onChange={(e) => {
              handleChangeSearchQuery(e);
            }}
          />
          <SearhButton onClick={search}>search</SearhButton>
          <Select
            value={searchFilter}
            onChange={(e) => {
              handleChangeSearchFilter(e);
            }}
            defaultValue={'nickname'}
          >
            <option value='nickname'>nickname</option>
            <option value='email'>email</option>
            <option value='description'>description</option>
          </Select>
        </SearchContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Password</TableHeader>
                <TableHeader>Nickname</TableHeader>
                <TableHeader>Email</TableHeader>

                <TableHeader>User Avatar</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Birthday</TableHeader>
                <TableHeader>CS2 Data</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {newPlayer ? (
                <TableRow>
                  <TableCell>???</TableCell>
                  <TableCell>
                    <EditTextArea
                      defaultValue={newPlayer.password}
                      onChange={(e) => {
                        newPlayerPassword(e);
                      }}
                    ></EditTextArea>
                  </TableCell>
                  <TableCell>
                    <EditTextArea
                      defaultValue={newPlayer.nickname}
                      onChange={(e) => {
                        newPlayerNickname(e);
                      }}
                    ></EditTextArea>
                  </TableCell>
                  <TableCell>
                    <EditTextArea
                      defaultValue={newPlayer.email}
                      onChange={(e) => {
                        newPlayerEmail(e);
                      }}
                    ></EditTextArea>
                  </TableCell>
                  <TableCell>
                    <UserAvatar src={newPlayer.user_avatar} />
                    <input
                      id='file__input'
                      className='file__upload__input'
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={(e) => {
                        uploadAvatar(e);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <EditTextArea
                      defaultValue={newPlayer.description}
                      onChange={(e) => {
                        newPlayerDescription(e);
                      }}
                    ></EditTextArea>
                  </TableCell>
                  <TableCell>
                    <select
                      defaultValue={'male'}
                      onChange={(e) => {
                        newPlayerGender(e);
                      }}
                    >
                      <option value='male'>male</option>
                      <option value='female'>female</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      format='DD/MM/YYYY'
                      label='Birthday'
                      onChange={(date) => {
                        const birth: string = date?.toString() as string;
                        setNewPlayer({ ...newPlayer, birthday: birth });
                      }}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Action
                      src='../../public/images/close-cross.png'
                      alt=''
                      onClick={() => {
                        setNewPlayer(null);
                      }}
                    />
                    <Action
                      src='../../public/images/confirm-edit.png'
                      alt=''
                      onClick={() => {
                        finishCreatingPlayer();
                      }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>???</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell>
                    <AddPlayer onClick={() => startCreatingNewPlayer()}>+</AddPlayer>
                  </TableCell>
                </TableRow>
              )}
              {renderPlayers.map((user) =>
                editPlayer?.id === user.id && editPlayer !== null ? (
                  <TableRow key={editPlayer.id}>
                    <TableCell>{editPlayer.id}</TableCell>
                    <TableCell>{editPlayer.password}</TableCell>
                    <TableCell>
                      <EditTextArea
                        defaultValue={editPlayer.nickname}
                        onChange={(e) => {
                          editPlayerNickname(e);
                        }}
                      ></EditTextArea>
                    </TableCell>
                    <TableCell>
                      <EditTextArea
                        defaultValue={editPlayer.email}
                        onChange={(e) => {
                          editPlayerEmail(e);
                        }}
                      ></EditTextArea>
                    </TableCell>
                    <TableCell>
                      <UserAvatar src={editPlayer.user_avatar} />
                      <input
                        id='file__input'
                        className='file__upload__input'
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={(e) => {
                          uploadEditAvatar(e);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <EditTextArea
                        defaultValue={editPlayer.description}
                        onChange={(e) => {
                          editPlayerDescription(e);
                        }}
                      ></EditTextArea>
                    </TableCell>
                    <TableCell>
                      <select
                        defaultValue={'male'}
                        onChange={(e) => {
                          editPlayerGender(e);
                        }}
                      >
                        <option value='male'>male</option>
                        <option value='female'>female</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        format='DD/MM/YYYY'
                        label='Birthday'
                        defaultValue={dayjs(editPlayer.birthday)}
                        onChange={(date) => {
                          const birth: string = date?.toString() as string;
                          setEditPlayer({ ...editPlayer, birthday: birth });
                        }}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Action
                        src='../../public/images/close-cross.png'
                        alt=''
                        onClick={() => {
                          setEditPlayer(null);
                        }}
                      />
                      <Action
                        src='../../public/images/confirm-edit.png'
                        alt=''
                        onClick={() => {
                          finishEditingPlayer();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <UserAvatar src={user.user_avatar} alt='' />
                    </TableCell>
                    <TableCell>{user.description}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.birthday}</TableCell>
                    <TableCell>
                      {user.cs2_data ? <CommonButton onClick={() => checkCs2Data(user)}>Check</CommonButton> : 'Not avaible'}
                    </TableCell>
                    <TableCell>
                      <Action src='../../public/images/edit.png' onClick={() => setEditPlayer(user)} />
                      <Action src='../../public/images/trash-can.png' onClick={() => handleDeletePlayer(user.id as number)} />
                    </TableCell>
                  </TableRow>
                ),
              )}
            </tbody>
          </Table>
        </TableContainer>
      </MainContainer>
    </>
  );
};

const Select = styled.select`
  height: 20px;
  font-size: 14px;
  border: 0;
  margin-left: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  overflow: hidden;
`;

const SearhInput = styled.input`
  padding-inline: 5px;
  border: 0;
  width: 40%;
  height: 25px;
`;

const SearhButton = styled.button`
  border: 0;
  width: 150px;
  height: 25px;
  color: #fff;
  text-transform: uppercase;
  background-color: #eb3d3d;
  &:hover {
    cursor: pointer;
    background-color: #952828;
  }
`;

const TableContainer = styled.div`
  background-color: aliceblue;
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
`;

const TableRow = styled.tr`
  background-color: #ababab;
`;

const TableCell = styled.td`
  max-width: 150px;

  overflow-x: auto;

  border: 1px solid black;
  text-align: center;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 65px;
  height: 65px;
`;

const EditTextArea = styled.textarea`
  width: 150px;
  border: 0;
  font-size: 14px;
`;
const AddPlayer = styled.div`
  font-size: 40px;
  cursor: pointer;
`;
const Action = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export default PlayersTable;
