import { RouteComponentProps } from "@gatsbyjs/reach-router";

interface Props extends RouteComponentProps {}

const Home = ({}: Props) => {
  return <h1>Home</h1>;
};

export default Home;
