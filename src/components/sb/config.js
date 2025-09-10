export default function Config({ blok }) {
  return (
    <div className="p-4 border border-dashed text-gray-500 text-center">
      <pre>{JSON.stringify(blok, null, 2)}</pre>
    </div>
  );
}