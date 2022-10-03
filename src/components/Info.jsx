import "./info.css";

const Info = ({
  selectedItemId,
  hasCharacter,
  character,
}) => {
  return (
    <div className="info">
      <div className="header">
        <div>
          <img
            className="headerImg"
            src={hasCharacter ? character[selectedItemId].image : null}
            alt={hasCharacter ? character[selectedItemId].name : ""}
          />
        </div>
        <div className="characterName">
          {hasCharacter ? <h3>{character[selectedItemId].name}</h3> : ""}
        </div>
      </div>
      <h3 className="detailsTitle">Personal Information</h3>
      <div className="infoDetails">
        <ui>
          <li>
            Status:{" "}
            {hasCharacter ? character[selectedItemId].status + ", " : ""}{" "}
          </li>
          <li>
            Gender:{" "}
            {hasCharacter ? character[selectedItemId].gender + ", " : ""}{" "}
          </li>
          <li>
            Species:{" "}
            {hasCharacter ? character[selectedItemId].species + ", " : ""}{" "}
          </li>
          <li>
            Location:{" "}
            {hasCharacter ? character[selectedItemId].location.name + ", " : ""}{" "}
          </li>
          <li>
            Origin:{" "}
            {hasCharacter ? character[selectedItemId].origin.name + ", " : ""}{" "}
          </li>
          <li>
            Created Date:{" "}
            {hasCharacter
              ? new Date(character[selectedItemId].created).toDateString()
              : ""}
          </li>
        </ui>
      </div>
      <h3 className="epTitle">Episodes</h3>
      <div className="infoEp">
        {/* <section className="infoEpTitle"></section>
        <section className="infoEpItem"></section> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Air Date</th>
              <th scope="col">Episode</th>
              <th scope="col">Created Date</th>
            </tr>
          </thead>
          <tbody className="infoEpDetails">
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Info;
