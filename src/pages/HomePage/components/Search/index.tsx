import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import SearchResults from "../Results";
import "./style.css";

function Search() {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounceValue(text, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <label htmlFor="serach-input">Search for coktails:</label>
      <input
        id="serach-input"
        onChange={handleInputChange}
        placeholder="Any cocktail name..."
      />
      <SearchResults input={debouncedText} />
    </>
  );
}

export default Search;
