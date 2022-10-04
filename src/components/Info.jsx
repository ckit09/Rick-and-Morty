import "./info.css";

const Info = ({
  selectedItemId,
  hasCharacter,
  character,
}) => {
  var epIds = [];
  var episodeInfos = [];
  const infoEpDetails = document.querySelector(".infoEpDetails");

  const getEpisodeInfos = async (eps) => {
    //call episode api
    await eps.map(async (ep) => {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${ep}`);

      if (!res.ok) {
        throw new console.error(res.status);
      }
      const result = await res.json();
      episodeInfos[ep] = result;

      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdAirDate = document.createElement("td");
      const tdEpisode = document.createElement("td");
      const tdCreatedDate = document.createElement("td");

      tdName.append(episodeInfos[ep].name);
      tdAirDate.append(episodeInfos[ep].air_date);
      tdEpisode.append(episodeInfos[ep].episode);
      tdCreatedDate.append(new Date(episodeInfos[ep].created).toString());
      tr.append(tdName);
      tr.append(tdAirDate);
      tr.append(tdEpisode);
      tr.append(tdCreatedDate);

      infoEpDetails.append(tr);
    });
    console.log("episodeInfos:", episodeInfos);
  };

  if (selectedItemId >= 0) {
    hasCharacter = true;
    //retrieve episode list from character to call episode api
    console.log('episode:',character[selectedItemId].episode);
    epIds = character[selectedItemId].episode.map((ep) =>
      ep.split("/").pop().trim()
    );
    infoEpDetails.textContent = "";
    getEpisodeInfos(epIds);
  }

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
