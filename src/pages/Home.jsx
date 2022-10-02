// import styled from "styled-component";
import Navbar from "../components/Navbar";
import ContactList from "../components/ContactList";
import Info from "../components/Info";
import { useState, useEffect } from "react";

function Home() {
  const [selectedItemId, setSelectedItemId] = useState();
  const [character, setCharacter] = useState();
  var result;
  var epNumbers = [];
  var episodes = [];
  var hasCharacter = false;
  const infoEpDetails = document.querySelector(".infoEpDetails");

  const getEpisodes = async (eps) => {
    //call episode api
    await eps.map(async (ep) => {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${ep}`);

      if (!res.ok) {
        throw new console.error(res.status);
      }
      const result = await res.json();
      episodes[ep] = result;

      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdAirDate = document.createElement("td");
      const tdEpisode = document.createElement("td");
      const tdCreatedDate = document.createElement("td");

      tdName.append(episodes[ep].name);
      tdAirDate.append(episodes[ep].air_date);
      tdEpisode.append(episodes[ep].episode);
      tdCreatedDate.append(new Date(episodes[ep].created).toString());
      tr.append(tdName);
      tr.append(tdAirDate);
      tr.append(tdEpisode);
      tr.append(tdCreatedDate);

      infoEpDetails.append(tr);
    });
  };

  if (selectedItemId >= 0) {
    hasCharacter = true;
    //retrieve episode list from character to call episode api
    epNumbers = character[selectedItemId].episode.map((ep) =>
      ep.split("/").pop().trim()
    );
    console.log("epNumbers:", epNumbers);
    infoEpDetails.textContent = "";
    getEpisodes(epNumbers);
  }

  const getCharacter = async (characterPage) => {
    const res = await fetch(characterPage);

    if (!res.ok) {
      throw new console.error(res.status);
    }
    result = await res.json();
    
    setCharacter(result.results);
    
    console.log("result:", result.results);
  };

  useEffect(() => {
    //call character api
    var characterPage = "https://rickandmortyapi.com/api/character/?page=1";
    getCharacter(characterPage);
  }, []);

  // useEffect(() => {
  //   //listen to scrollbar and call api to get next page of character
  //   const itemList = document.querySelector(".itemList");

  //   function handleScroll() {
  //     if (itemList.scrollTop + itemList.clientHeight  === itemList.scrollHeight) {
  //       getCharacter(result.info.next)
  //     }
  //   }
  //   itemList.addEventListener("scroll", handleScroll);

  //   return itemList.removeEventListener("click", handleScroll);
  // }, []);

  return (
    <>
      <div className="home">
        <div className="container">
          <Navbar />
          <ContactList
            setSelectedItemId={setSelectedItemId}
            selectedItemId={selectedItemId}
            character={character}
          />
          <Info
            selectedItemId={selectedItemId}
            hasCharacter={hasCharacter}
            character={character}
            episodes={episodes}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
