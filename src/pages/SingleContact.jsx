import React from "react";
import "./singleContact.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const SingleContact = () => {
  const inputRef = useRef();
  const [queryInput, setQueryInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleQuery();
    }
  }

  useEffect(() => {
    document
      .querySelector(".contactContainer")
      .addEventListener("keypress", handleEnter);
    return () => window.removeEventListener("keypress", handleEnter);
  }, []);

  function reset() {
    inputRef.current.value = "";
  }

  function handleQuery() {
    // reset
    setSearchResult([])
    document.querySelector(".errMsg").style.display = "none";
    
    const query = {};
    let name = inputRef.current.value.toLowerCase();
    let status = document.querySelector(".contactStatus").value.toLowerCase();
    let gender = document.querySelector(".contactGender").value.toLowerCase();
    query.name = `name=${name}`;
    (status !== "false") ? (query.status = `&status=${status}`) : (query.status = "");
    (gender !== "false") ? (query.gender = `&gender=${gender}`) : (query.gender = "");
    console.log(query);

    if (!name) {
      document.querySelector(".errMsg").innerText = "Please Enter Character Name";
      document.querySelector(".errMsg").style.display = "block";
      return;
    }

    axios
      .get(`https://rickandmortyapi.com/api/character/?${query.name}${query.gender}${query.status}`)
      .then((result) => {
        console.log(result.data);
        setSearchResult(result.data.results);
      })
      .catch((e) => {
        console.log(e.response.status);
        document.querySelector(".errMsg").style.display = "block";
        document.querySelector(".errMsg").innerText = "Character Not Found";
      });
  }

  return (
    <div className="singleContact">
      <div className="contactContainer">
        <h1>Contact</h1>
        <input
          autoFocus
          className="contactInput"
          type="text"
          placeholder="Type character name here ..."
          ref={inputRef}
          value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
          }}
        />
        <div className="contactOption">
          <select className="contactStatus">
            <option value="false" >
              Status
            </option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
            <option value="false"></option>
          </select>
          <select className="contactGender">
            <option value="false">
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="Unknown">Unknown</option>
            <option value="false"></option>
          </select>
        </div>
        <div className="contactButtons"></div>
        <button className="contactSubmit" onClick={handleQuery}>
          Submit
        </button>
        <button className="contactReset" onClick={reset}>
          Reset
        </button>

        <div className="contactSearchResult">
          <span className="errMsg"></span>
          <ul>
            {
              searchResult.length > 0 ?
              <li className="singleContact-itemList">
                <div className="singleContact-content" style={{fontSize: "20px"}}><u>Character Name</u></div>
                <div className="singleContact-content" style={{fontSize: "20px"}}><u>Status</u></div>
                <div className="singleContact-content" style={{fontSize: "20px"}}><u>Gender</u></div>
                <div className="singleContact-content" style={{fontSize: "20px"}}><u>Species</u></div>
              </li>
              : null
            }
            {searchResult?.map((item, key) => (
              <li key={key} className="singleContact-itemList">
                <div className="singleContact-content">{item.name}</div>
                <div className="singleContact-content">{item.status}</div>
                <div className="singleContact-content">{item.gender}</div>
                <div className="singleContact-content">{item.species}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
