import React from "react";
import HospitalCard from "./HospitalCard";
import image1 from "../assets/hospital1.svg";
import image2 from "../assets/hospital2.svg";
import image3 from "../assets/hospital3.svg";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

const images = [image1, image2, image3];

const randomNumberBetweenZeroAnd = (a) => {
  return Math.floor(Math.random() * a);
};

export default function Home() {
  const [state, setState] = React.useState({
    age: 1,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="hospital-select-wrapper">
        <Typography variant="body2" style={{ marginRight: 10 }}>
          Select the type of Hospital you are looking for
        </Typography>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>Type1</option>
          <option value={2}>Type2</option>
          <option value={3}>Type3</option>
        </Select>
      </div>
      <div className="hospital-card-wrapper">
        <HospitalCard
          props={{
            name: "Hospital1",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
        <HospitalCard
          props={{
            name: "Hospital2",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
        <HospitalCard
          props={{
            name: "Hospital3",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
      </div>
      <div className="hospital-card-wrapper">
        <HospitalCard
          props={{
            name: "Hospital4",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
        <HospitalCard
          props={{
            name: "Hospital5",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
        <HospitalCard
          props={{
            name: "Hospital6",
            desc:
              "Fugiat ullamco eiusmod eu reprehenderit duis tempor est nulla sunt laboris ipsum.",
            address: "Laborum ea do tempor deserunt ",
            image: images[randomNumberBetweenZeroAnd(3)],
          }}
        />
      </div>
    </div>
  );
}
