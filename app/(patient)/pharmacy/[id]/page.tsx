export default async function PharmacyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <h1>Pharmacy Detail</h1>
      <p className="text-sm text-zinc-500">Pharmacy ID: {id}</p>
      {/* TODO: implement Page 8 — Pharmacy Detail per Figma + PRD */}
    </main>
  );
}
