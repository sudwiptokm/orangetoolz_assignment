import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
type Props = {
  val: string;
  setVal: (val: string) => void;
};

export default function SearchBar({ val, setVal }: Props) {
  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-50"
            aria-hidden="true"
          />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black opacity-30"
          placeholder="Enter City Name"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    </div>
  );
}
