type Options = {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body: string;
};

const queryCharacters = (pageNumber: number) => `query {
  characters (page: ${pageNumber}) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      species
      image
      status
      gender
      episode {
        name
        air_date
      }
      location {
        dimension
        name
      }
    }
  }
}`;

export const getCharacters = async (pageNumber: number) => {
  const options: Options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: queryCharacters(pageNumber)
    })
  };

  try {
    const res = await fetch("https://rickandmortyapi.com/graphql", options);

    if (res.ok) {
      const result = await res.json();
      return result.data.characters;
    } else throw new Error("BIG fuck up!");
  } catch (exc) {
    return exc;
  }
};
