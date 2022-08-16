export default function ResponseStatusBox({ code, message }) {
  return (
    <>
      <figure
        className={`flex items-center justify-center p-2 ${
          code === 200
            ? "bg-green-600"
            : code >= 400
            ? "bg-red-500"
            : "bg-yellow-400"
        } rounded`}
      >
        
        <p className="text-sm text-center text-white">{message}</p>
      </figure>
    </>
  );
}
