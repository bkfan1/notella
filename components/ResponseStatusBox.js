export default function ResponseStatusBox({ code, message }) {
  return (
    <>
      <figure
        className={`${
          code === 200
            ? "bg-green-600"
            : code >= 400
            ? "bg-red-500"
            : "bg-yellow-400"
        }`}
      >
        <i
          className={`bi ${
            code === 200 ? "bi-check-circle" : "bi-exclamation-triangle"
          } text-white`}
        />
        <p className="text-white">{message}</p>
      </figure>
    </>
  );
}
