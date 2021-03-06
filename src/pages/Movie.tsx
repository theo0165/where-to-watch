import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import NotFound from "./NotFound";
import styles from "../style/MoviePage.module.scss";
import { GoPrimitiveDot } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { FaImdb } from "react-icons/fa";
import PlatformSelect from "../components/PlatformSelect";
import { paramCase } from "change-case";
import tmdbLogo from "../assets/tmdb_logo.svg";

const Movie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //Use prop to fetch movie?
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, notFound] = useMovie(id ?? "0");

  useEffect(() => {
    setLoading(false);
  }, [movie]);

  const formatTime = (mins: number): string => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    const paddedM = m < 10 ? "0" + m : m;
    return `${h}h${paddedM}m`;
  };

  if (loading) return <h1>Loading</h1>;

  if (notFound || !movie) return <NotFound />;

  return (
    <div>
      <div
        className={`${styles.backdropContainer} ${
          movie.backdrop_path ? styles.noBackdrop : styles.isBackdrop
        }`}
      >
        {movie.backdrop_path && (
          <img
            className={styles.backdrop}
            alt={`Backdrop for ${movie.title}`}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
        )}
      </div>
      <div className={styles.main}>
        <div>
          <p className={styles.back} onClick={() => navigate(-1)}>
            {"< Back"}
          </p>
          <h1>{movie.title}</h1>
          <div className={styles.movieMeta}>
            <p>{new Date(movie.release_date).getFullYear()}</p>
            {movie.runtime && (
              <>
                <GoPrimitiveDot size="12px" />
                <p>{formatTime(movie.runtime)}</p>
              </>
            )}
            <GoPrimitiveDot size="12px" />
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          {movie.overview && (
            <p className={styles.description}>{movie.overview}</p>
          )}
          <div className={styles.moreInfo}>
            <div className={styles.rating}>
              <IoMdStar />
              <p>{movie.vote_average.toFixed(1)}</p>
            </div>
            <GoPrimitiveDot size="12px" className={styles.separator} />
            <div className={styles.links}>
              {movie.imdb_id && (
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
                  <FaImdb size="32px" />
                </a>
              )}
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}-${paramCase(
                  movie.title
                )}`}
              >
                <img src={tmdbLogo} alt="The Movie DB" />
              </a>
            </div>
          </div>
          <PlatformSelect movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
