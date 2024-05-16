import formatNumber from "../../utils/formatNumber";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Table = ({ data, inputValue }) => {
  if (!data) return null;

  const fields = [
    { label: "Ask", value: data.ask },
    { label: "Last Price", value: data.last_price },
    { label: "Volume", value: data.volume },
    { label: "High", value: data.high },
    { label: "Low", value: data.low },
  ];

  return (
    <div className="mt-4 p-6 border rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">BTC/USD</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-lg">
              Parameter
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-lg">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td className="py-3 px-6 border-b border-gray-200 text-lg">
                {field.label}
              </td>
              <td className="py-3 px-6 border-b border-gray-200 text-lg">
                {field.label === "Last Price" ? (
                  <>
                    {formatNumber(field.value)}{" "}
                    {inputValue !== null && inputValue > field.value ? (
                      <FaArrowDown className="inline text-red-500" />
                    ) : (
                      <FaArrowUp className="inline text-green-500" />
                    )}
                  </>
                ) : (
                  formatNumber(field.value)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
