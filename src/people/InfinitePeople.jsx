import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

// const initialUrl = "https://swapi.dev/api/people/";
const initialUrl = "https://swapi-node.vercel.app/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {data,fetchNextPage,hasNextPage,isFetching,isLoading,isError,error} = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: ({pageParam = initialUrl})=> fetchUrl(pageParam),
    getNextPageParam: (lastPage) =>{return lastPage.next || undefined}
  })

if(isLoading){
  return<div className="loading">...Loading</div>
}
if(isError){
  return<div className="Error">Woopsie, we have an error in loading the page: {error.toString()}</div>
}

  return <InfiniteScroll 
  initialLoad={false}
  loadMore={()=>{if(!isFetching){fetchNextPage()}}}
  hasMore={hasNextPage}>
    {data.pages.map((pageData)=>{console.log(pageData.results);return pageData.results.map((person)=>{return <Person key={person.fields.name} name={person.fields.name} hairColor={person.fields.hair_color} eyeColor={person.fields.eye_color}></Person>})})}
  </InfiniteScroll>;
}
