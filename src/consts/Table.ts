import PlayersTable from '../components/PlayersTable';
import RolesTable from '../components/RolesTable';
import MapsTable from '../components/MapsTable';
type Tables = {
  [path: string]: React.ComponentType<any>;
};
const Table: Tables = {
  '/players': PlayersTable,
  '/roles': RolesTable,
  '/maps': MapsTable,
};

export default Table;
