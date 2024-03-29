import search from "@/lib/search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import * as S from "@/style/Home.style";
import ISearchResultItem from "@/types/ISearchResultItem";
import SearchResult from "@/components/SearchResult";
import isMovie from "@/utils/isMovieSearchResult";
import { APP_TITLE } from "@/lib/constants";
import debounce from "lodash/debounce";
import PageMeta from "@/components/Meta/PageMeta";
import Loader from "@/components/Icons/Loader";

const Home = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISearchResultItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = useRef(
    debounce(async (q) => {
      if (q.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsFetching(true);
      const results = await search(q);
      setIsFetching(false);

      if (results) {
        setSearchResults(results);
      }
    }, 300)
  ).current;

  useEffect(() => {
    handleSearch(query);

    return () => {
      handleSearch.cancel();
    };
  }, [query]);

  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      router.push(`/search/${query}`);
    }
  };

  const handleSearchRedirect = () => {
    if (query.trim().length > 0) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <>
      <PageMeta />
      <S.Container>
        <div>
          <h1>{APP_TITLE}</h1>
          <S.FormContainer>
            <S.Label htmlFor="query" aria-label="Search">
              Search
            </S.Label>
            <S.InputContainer>
              <input
                aria-label="Search"
                enterKeyHint="search"
                type="text"
                id="query"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputSubmit}
                value={query}
              />
              <S.IconWrapper>
                {query.length > 0 && (
                  <IoClose
                    size="24px"
                    color="white"
                    onClick={() => setQuery("")}
                  />
                )}
                {isFetching ? (
                  <S.LoaderWrapper>
                    <Loader size="16px" />
                  </S.LoaderWrapper>
                ) : (
                  <AiOutlineSearch
                    size="26px"
                    color="#ffffff"
                    onClick={handleSearchRedirect}
                  />
                )}
              </S.IconWrapper>
            </S.InputContainer>
            {searchResults && (
              <S.SearchResults>
                {JSON.parse(JSON.stringify(searchResults))
                  .slice(0, 3)
                  .map((result: ISearchResultItem) => {
                    if (isMovie(result)) {
                      return (
                        <SearchResult
                          isMovie
                          key={result.id}
                          id={result.id}
                          posterPath={result.poster_path}
                          title={result.title}
                        />
                      );
                    }

                    return (
                      <SearchResult
                        isTv
                        key={result.id}
                        id={result.id}
                        posterPath={result.poster_path}
                        title={result.name}
                      />
                    );
                  })}
                {searchResults.length > 3 && (
                  <S.MoreContainer>
                    <Link href={`/search/${query}`}>More results</Link>
                  </S.MoreContainer>
                )}
              </S.SearchResults>
            )}
          </S.FormContainer>
        </div>
      </S.Container>
    </>
  );
};

export default Home;
