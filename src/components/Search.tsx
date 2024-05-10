/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";

interface Search {
  setSearchQuery: (searchQuery: string) => void;
}

export default function Search({ setSearchQuery }: Search) {
  return (
    <form>
      <TextField
        id="search-bar"
        sx={{ width: "18em" }}
        className="text"
        onInput={(e: any) => {
          setSearchQuery(e.target.value);
        }}
        label="Search cocktail"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
    </form>
  );
}
