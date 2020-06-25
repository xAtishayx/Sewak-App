import React from "react";
import HospitalCard from "./HospitalCard";
import image1 from "../assets/hospital1.svg";
import image2 from "../assets/hospital2.svg";
import image3 from "../assets/hospital3.svg";

const images = [image1, image2, image3];

const randomNumberBetweenZeroAnd = (a) => {
  return Math.floor(Math.random() * a);
};

export default function Home() {
  return (
    <>
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
    </>
  );
}