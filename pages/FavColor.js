import React, { useEffect, useState, useRef } from "react";
import uuid from "react-uuid";
import ReactDom from "react-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { color } from "@mui/system";

const myConst = 0;

function fetchData() {
  let res = axios.get("api/colors").then((ret) => {
    console.log(res.data);
    return ret.data;
  });
}

export default function FavColor() {
  const [colors, setColors] = useState(0);
  const [favColor, setFavColor] = useState(0);

  useEffect(() => {
    let res = axios.get("api/colors").then((ret) => {
      setColors(ret.data);
    });
  }, []);

  if (!colors) {
    return <h3>loading...</h3>;
  }

  return (
    <>
      <h2>fav color is {favColor}</h2>
      {colors.map((thiscolor) => {
        return (
          <Button
            sx={{ margin: 2, borderWidth: 2 }}
            key={uuid()}
            onClick={() => {
              setFavColor(thiscolor);
            }}
          >
            {thiscolor}
          </Button>
        );
      })}
    </>
  );
}
