import GamesDataTable from '@/app/games/[games]/_components/games-data-table';
import EditGameModal from '../../../components/modals/EditGameModal';

export default async function Games() {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <GamesDataTable />
      <EditGameModal />
    </div>
  );
}
