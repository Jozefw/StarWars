import InfiniteScroll from "react-infinite-scroller";
import {useInfiniteQuery} from"@tanstack/react-query";
import { Species } from "./Species";

const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
        return lastPage.next ? baseUrl + lastPage.next : undefined 
    },
  });
  // if lastpage.next is undefined hasNextPage is set to false

  if(isLoading){
    return <div className="loading">...Loading...</div>
  }
  if(isError){
    return<div>{error.toString()}</div>
  }
  return (
    <>
    {isFetching && <div className="loading">...Loading...</div>}
    <InfiniteScroll 
    loadMore={()=>{if(!isFetching) fetchNextPage();}}
    hasMore={hasNextPage}
    />
    {data.pages.map((pageData)=>{
      return pagesData.results.map((species)=>{
        return(
          <Species 
          key={species.name}
          name={species.name}
          language={species.language}
          averageLifespan={species.average_lifespan}>
          </Species>
        )
      })
    })}
    </>


  )
}
