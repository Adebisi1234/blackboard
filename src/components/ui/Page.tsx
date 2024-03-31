export default function Page(data?: number[]) {
  return (
    <div className="w-[220px] max-h-[50vh] h-fit flex flex-col">
      <div className="flex justify-between items-center">
        <p>Pages</p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 18a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M10 6a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
