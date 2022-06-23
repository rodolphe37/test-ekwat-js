import React from "react";
import styled from "@emotion/styled";

const DataContainerMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
`;
const TextContainer = styled.div`
  padding: 10px;
`;

const StyledTd = styled.td`
  text-align: center;
`;
const StyledTdHeadColumn = styled(StyledTd)`
  font-weight: bold;
  color: #00a997;
  padding: 5px 5px;
`;

function DataContainer({ data, filterSelected }) {
  return (
    <DataContainerMainContainer>
      {data && data.length >= 1 && (
        <table>
          {/* Head of the Table  */}
          <thead>
            <tr>
              {/* Common to both energy  */}
              <StyledTdHeadColumn>Date</StyledTdHeadColumn>
              {/* Only for electricity  */}
              {filterSelected === "electricity" ? (
                <>
                  <StyledTdHeadColumn>Heures Pleines</StyledTdHeadColumn>
                  <StyledTdHeadColumn>Heures Creuses</StyledTdHeadColumn>
                </>
              ) : (
                // Only for Gas
                <StyledTdHeadColumn>Consommation</StyledTdHeadColumn>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((result) => {
              const { id, date, valueHC, valueHP, value } = result;
              return (
                <tr key={id}>
                  <StyledTd>{new Date(date).toLocaleDateString()}</StyledTd>
                  {result && <StyledTd> {valueHP}</StyledTd>}
                  {result && <StyledTd> {valueHC}</StyledTd>}
                  {result && <StyledTd> {value}</StyledTd>}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!data ||
        (data.length === 0 && (
          <TextContainer>
            Pas de résultats à afficher pour cette année. Veuillez en
            sélectionner une autre...
          </TextContainer>
        ))}
    </DataContainerMainContainer>
  );
}

export default DataContainer;
