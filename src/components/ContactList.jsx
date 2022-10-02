import React from "react";
import "./contactList.css";
import { useState } from "react";

const ContactList = ({ setSelectedItemId, character }) => {
  const [inputValue, setInputValue] = useState();

  function selectItem(event) {
    event.stopPropagation();
    setSelectedItemId(event.target.attributes.id.textContent - 1);
  }

  return (
    <div className="contactList">
      <div className="contactListTop">
        <h1>Contact List</h1>
      </div>
      <div className="contactListSearch">
        <input
          className="contactListInput"
          type="text"
          placeholder="Type character name to search here"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div className="itemList">
        <ul>
          {inputValue
            ? character?.map(({ id, image, name, species }) =>
                name.includes(inputValue) ? (
                  <li key={id} className="item" id={id} onClick={selectItem}>
                    <img className="itemImg" id={id} src={image} alt={name} />
                    <div className="itemContent" id={id} onClick={selectItem}>
                      <p id={id}>{name}</p>
                      <p id={id}>{species}</p>
                    </div>
                  </li>
                ) : null
              )
            : character?.map(({ id, image, name, species }) => (
                <li key={id} className="item" id={id} onClick={selectItem}>
                  <img className="itemImg" id={id} src={image} alt={name} />
                  <div className="itemContent" id={id} onClick={selectItem}>
                    <p id={id}>{name}</p>
                    <p id={id}>{species}</p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
