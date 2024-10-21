
Everwhere this section mentions https://swapi.dev, use https://swapi-node.vercel.app instead.

The data is returned in an results array for each API. For https://swapi.dev, each element is an object, for example:

 "results": [
    {
      "name": "Anakin Skywalker",
      "gender": "male",
      "skin_color": "fair",
      "hair_color": "blond",
      // more properties
    },
  // more results
]



However, for https://swapi-node.vercel.app, each element has a nested object with the key of fields: 
 

"results": [
    {
      "fields": {
        "name": "Anakin Skywalker",
        "gender": "male",
        "skin_color": "fair",
        "hair_color": "blond",
        // more properties
     }, 
  },
  // more results
]

So you will need to add a fields key when accessing the data, compared to what you see in the docs. For example:

- in the videos: person.name

- using the alternative API: person.fields.name

import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();


export function InfinitePeople() {
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
  });

export function InfinitePeople() {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
                key={person.fields.name}
                name={person.fields.name}
                hairColor={person.fields.hair_color}
                eyeColor={person.fields.eye_color}
              />
            );
          });


import { useInfiniteQuery } from "@tanstack/react-query";

import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
@@ -21,7 +22,9 @@ export function InfiniteSpecies() {
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
  });

  if (isLoading) return <div className="loading">Loading...</div>;
@@ -40,10 +43,10 @@ export function InfiniteSpecies() {
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.average_lifespan}
                key={species.fields.name}
                name={species.fields.name}
                language={species.fields.language}
                averageLifespan={species.fields.average_lifespan}
              />
            );
          });