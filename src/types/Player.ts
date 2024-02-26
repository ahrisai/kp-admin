import ClientUser from './ClientUser';
import Cs2Data from './Cs2Data';

export default interface Player extends ClientUser {
  id?: number;
  password: string;
  nickname: string;
  email: string;
  user_avatar?: string;
  description?: string;
  gender: string;
  birthday: string;
  cs2_data?: Cs2Data | null;
}
