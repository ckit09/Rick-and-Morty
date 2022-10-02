import React from "react";
import "./info.css";

const Info = ({ character, selectedItemId }) => {
  var epNumber = [];
  var episodes = [];
  var hasCharacter = false;
  var hasEpisodes = false;

  const addEpisodes = ()=>{
    const episodeList = document.querySelector(".episodeList")
    
  }

  const fetchEpisode = async (eps) => {
    await eps.map(async (ep) => {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${ep}`);

      if (!res.ok) {
        throw new console.error(res.status);
      }
      const result = await res.json();
      episodes[ep] = result;
      console.log("episodes[ep]:", episodes[ep]);
    });

  };

  if (selectedItemId >= 0) {
    hasCharacter = true;
    epNumber = character[selectedItemId].episode.map((ep) =>
      ep.split("/").pop().trim()
    );
    console.log('epNumber:',epNumber);
    fetchEpisode(epNumber).then(hasEpisodes = true);
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
              : ""}{" "}
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
          <tbody className="episodeList">
            {hasEpisodes
              ? episodes?.map((ep) => (
                  <tr>
                    <td>{ep.id}</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Info;
