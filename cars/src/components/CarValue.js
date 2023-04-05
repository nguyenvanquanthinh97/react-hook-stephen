import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectCarValueWithSearchTerm = createSelector(
  (state) => state.cars,
  ({ data, searchTerm }) => {
    console.log("selector calculate");
    return data
      .filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce((acc, car) => acc + car.cost, 0);
  }
);

function CarValue() {
  const totalCost = useSelector(selectCarValueWithSearchTerm);

  return <div className="car-value">Total Cost: ${totalCost}</div>;
}

export default CarValue;
