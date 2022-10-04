// import styled from "styled-component";
import Navbar from "../components/Navbar";
import ContactList from "../components/ContactList";
import Info from "../components/Info";
import { useState, useEffect } from "react";

function Home() {
  const [selectedItemId, setSelectedItemId] = useState();
  const [character, setCharacter] = useState([]);
  var result;
  var hasCharacter = false;

  const getCharacter = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new console.error(res.status);
    }
    result = await res.json();
    
      // setCharacter(result.results)
    await setCharacter(prevCharacter => {
        return [...new Set([...prevCharacter, ...result.results.map(c => c)])]
    })

    console.log("result:", result.results)
    console.log('character:',character);
  };

  useEffect(() => {
    //call character api
    const characterPage = "https://rickandmortyapi.com/api/character/?page=1";
    getCharacter(characterPage)
  }, []);

  useEffect(() => {
    //listen to scrollbar and call api to get next page of character
    const itemList = document.querySelector(".itemList");

    function handleScroll() {
      if (itemList.scrollTop + itemList.clientHeight  === itemList.scrollHeight) {
        getCharacter(result.info.next).then(
          console.log('next page')
        )
      }
    }
    itemList.addEventListener("scroll", handleScroll);

    return itemList.removeEventListener("click", handleScroll);
  }, []);

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
          />
        </div>
      </div>
    </>
  );
}

export default Home;