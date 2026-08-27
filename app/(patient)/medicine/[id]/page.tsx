export default async function DrugInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <h1>Drug Info</h1>
      <p className="text-sm text-zinc-500">Medicine ID: {id}</p>
      {/* TODO: implement Page 9 — Drug Info per Figma + PRD */}
    </main>
  );
}
