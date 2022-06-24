import styled from "@emotion/styled";
import DataContainer from "./DataContainer";
import useFetchData from "../hooks/useFetchData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledSelect = styled.select`
  border: 2px solid red;
  background-color: white;
  color: #00a997;
  border: 1px solid #00a997;
  font-weight: bold;
  border-radius: 30px;
  margin: 5px;
  text-align: center;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  padding: 10px;
  background-color: ${({ selected }) => (selected ? "#ffb135" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#00A997")};
  border: ${({ selected }) =>
    selected ? "1px solid #ffb135 " : "1px solid #00A997 "};
  font-weight: bold;
  width: 200px;
  border-radius: 30px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dashboard = () => {
  const {
    fetchData,
    filterSelected,
    setFilterSelected,
    podList,
    yearSelected,
    setYearSelected,
    years,
    data,
  } = useFetchData();

  const handleSelectedPointOfDelivery = (id, type) => {
    fetchData(podList[id].pointOfDelivery);
    setFilterSelected(`${type}`);
  };

  return (
    <Container>
      <FilterBarContainer>
        <ButtonContainer
          selected={filterSelected === "electricity"}
          onClick={() => handleSelectedPointOfDelivery(0, "electricity")}
        >
          Electricité
        </ButtonContainer>
        <ButtonContainer
          selected={filterSelected === "gas"} // podList array's second element is gas
          onClick={() => handleSelectedPointOfDelivery(1, "gas")}
        >
          Gaz
        </ButtonContainer>
        <StyledSelect
          value={yearSelected}
          onChange={(event) => setYearSelected(event.target.value)}
        >
          {years.map(
            (oneYear, index) =>
              oneYear !== "Invalid date" && (
                <option key={index} value={oneYear}>
                  {oneYear}
                </option>
              )
          )}
          <option key={"all"} value={"all"}>
            Toutes les années
          </option>
        </StyledSelect>
      </FilterBarContainer>
      <DataContainer data={data} filterSelected={filterSelected} />
    </Container>
  );
};
