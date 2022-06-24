import { useEffect, useState } from "react";
import { BASE_URL } from "../baseUrl";
import { getYears } from "../components/utils";

const useFetchData = () => {
  const [podList, setPodList] = useState();
  const [data, setData] = useState([]);
  const [filterSelected, setFilterSelected] = useState("electricity");
  const [yearSelected, setYearSelected] = useState("all");
  const [years, setYear] = useState([]);

  const fetchPodList = async () => {
    await fetch(`${BASE_URL}/meters`)
      .then((response) => response.json())
      .then((data) => setPodList(data));
  };

  useEffect(() => {
    fetchPodList();
  }, []);

  const filterByYear = (data, yearSelected) => {
    const result =
      yearSelected !== "all"
        ? data.filter(({ date }) => date.includes(yearSelected, "year"))
        : data;
    return result;
  };

  console.log("yearSelected", yearSelected);
  console.log("data", data);

  const fetchData = async (pointOfDelivery) =>
    await fetch(`${BASE_URL}/${pointOfDelivery}`)
      .then((response) => response.json())
      .then((data) => {
        setData(filterByYear(data, yearSelected));
        setYear(getYears(data));
      });

  useEffect(() => {
    if (podList) {
      fetchData(podList[0].pointOfDelivery); // podList array's first element is electricity
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podList, yearSelected]);
  return {
    fetchData,
    filterSelected,
    setFilterSelected,
    podList,
    yearSelected,
    setYearSelected,
    years,
    data,
  };
};

export default useFetchData;
