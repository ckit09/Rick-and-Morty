import React from "react";
import "./singleContact.css";
import { useRef, useState } from "react";

const SingleContact = () => {
  const inputRef = useRef();
  const [queryInput, setQueryInput] = useState("");
  var searchResult = [];

  function reset() {
    inputRef.current.value = queryInput;
    // console.log(document.querySelector(".contactGender").value);
  }

  function handleQuery() {
    const query = {};
    query.name = queryInput.toLowerCase();
    query.status = document.querySelector(".contactStatus").value.toLowerCase()
    query.gender = document.querySelector(".contactGender").value.toLowerCase()
    reset()
    console.log(query);
    // console.log(searchResult.push(fetch(`https://rickandmortyapi.com/api/character/?status=${query.status}&gender=${query.gender}`).json() ));
    getCharacter(query)
  }

  const getCharacter = async ({query}) => {
    var searchName
    var searchGender
    var searchStatus
    if (query.name){searchName="name="}
    if (query.status){searchStatus="&status="}
    if (query.gender){searchGender="&gender="}
    
    const res = await fetch(`https://rickandmortyapi.com/api/character/?${searchName}${query.name}${searchStatus}${searchGender}${query.status}`);

    if (!res.ok) {
      throw new console.error(res.status);
    }
    const result = await res.json();
    
    searchResult.push(result.results);
    
    console.log("result:", searchResult);
  };

  return (
    <div className="singleContact">
      <div className="contactContainer">
        <h1 className>Contact</h1>
        <input
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
            <option selected="selected" disabled hidden>
              Status
            </option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
            <option value={false}>empty</option>
          </select>
          <select className="contactGender">
            <option selected="selected" disabled hidden>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="Unknown">Unknown</option>
            <option value={false}>empty</option>
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
          {}
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
