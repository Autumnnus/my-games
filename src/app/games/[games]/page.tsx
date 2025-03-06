import GamesDataTable from "@/app/games/[games]/_components/games-data-table";

export default async function Games({
  params,
}: {
  params: Promise<{ games: string }>;
}) {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <GamesDataTable id={(await params).games} />
    </div>
  );
}
