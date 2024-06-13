import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

const About: FC = () => {
  return (
    <Fragment>
      <div>Hello from About page</div>
      <Link to={"/"}>Go to Home page</Link>
    </Fragment>
  );
};

export default About;
