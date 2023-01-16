import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

export default function StuffList() {
  const b = null;
  const [a, setA] = useState(null);
  const [myList, setMylist] = useState(null);
  useEffect(() => {
    axios.get("api/stuff").then((res) => {
      setMylist(res.data);
    });
  });
  return (
    (
      <>
        {/* <h1> {myList ? myList : ""} test </h1> */}
        <div>
          <Container>
          <h3>StuffList</h3>
            <ul>
              {myList
                ? myList.map((item) => {
                    return <li key={item}>{item}</li>;
                  })
                : ""}
            </ul>
          </Container>
        </div>
      </>
    )
  );
}
