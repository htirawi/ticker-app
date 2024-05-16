import { useState } from "react";
import useBitfinexTicker from "../../hooks/useBitfinexTicker";
import Table from "../../components/Table/Table";

const Home = () => {
  const { data, error, loading } = useBitfinexTicker("btcusd");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setInputValue(Number(e.target.value));
      setInputError("");
    } else {
      setInputError("Please enter a valid number");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Bitfinex Ticker</h1>

        <div className="w-[32rem] mt-20">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={inputValue}
              id="priceValue"
              name="priceValue"
              onChange={handleInputChange}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Please enter a value
            </label>
          </div>
          {inputError && <p className="text-red-600 text-sm">{inputError}</p>}
        </div>

        {/* <div className="fpeer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
          <label htmlFor="priceValue" className="mr-4">
            Set a value:
          </label>
          <input
            placeholder="Enter a value"
            value={inputValue}
            id="priceValue"
            name="priceValue"
            onChange={handleInputChange}
            className="my-6 px-4 py-2 border rounded-lg"
          />
        </div> */}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {loading ? (
          <p className="mt-4 text-gray-600">Loading...</p>
        ) : (
          <Table data={data} inputValue={inputValue} />
        )}
      </main>
    </div>
  );
};

export default Home;
