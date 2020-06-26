import React from "react";
import { HMap } from "./Hmap";
const Dashboard = () => {
  const API_URL = "http://localhost:5000/api/hospital/all";
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(API_URL);
    const res = await response.json();
    setData(res);
    console.log(res);
  };
  return (
    <div >
      <HMap data={data} />
    </div>
  );
};

export default Dashboard;