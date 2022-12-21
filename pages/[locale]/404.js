import { getStaticPaths, makeStaticProps } from "../../utils/getStatic";

const Homepage = () => {
  return <p>404</p>;
};

export default Homepage;

const getStaticProps = makeStaticProps(["404", "common", "footer"]);
export { getStaticPaths, getStaticProps };
