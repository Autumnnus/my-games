import GamesDataTable from '@/app/games/[games]/_components/games-data-table';
import AddGameModal from '@/components/modals/AddGameModal';
import EditGameModal from '@/components/modals/EditGameModal';

export default async function Games() {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <GamesDataTable />
      <AddGameModal />
      <EditGameModal />
    </div>
  );
}
