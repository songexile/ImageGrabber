import React, { useState, FormEvent } from "react";

interface SearchFunctionProps {
  query: string;
  setQuery: (newQuery: string) => void;
}

function SearchFunction({ query, setQuery }: SearchFunctionProps) {
  const [inputValue, setInputValue] = useState<string>(query); // Track input locally
  const [errorMessage, setErrorMessage] = useState<string>(""); // Fix the syntax for useState

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value); // Only update local state while typing
    checkString(event.target.value); // Call checkString on every input change
  };

  const checkString = (inputValue: string) => {
    if (inputValue.length < 2) {  // Correct the syntax of the comparison
      setErrorMessage("Please enter more than 1 character");
    } else {
      setErrorMessage(""); // Clear error message when the input is valid
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputValue.length >= 2) {
      setQuery(inputValue); // Update the parent state only on submit
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <h1 className="text-4xl">Enter your vision</h1>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input className="bg-base-300 rounded-md"
          type="text"
          placeholder="Search..."
          value={inputValue} // Display the local input value
          onChange={handleChange} // Update local state while typing
        />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message if present */}
    </div>
  );
}

export default SearchFunction;
