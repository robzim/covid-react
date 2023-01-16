import { Chip, Button } from "@mui/material";
import uuid from "react-uuid";

export default function CountyList(props) {
 
  const doFilter = (_item) => {
    const myMsg = `in dofilter with ${_item}`;
    console.log(myMsg);
    alert(myMsg);
  };

  return props.list.map((item) => {
    return (
      <Button
        key={uuid()}
        onClick={() => {
          doFilter(item);
        }}
      >
        <Chip label={item} />
      </Button>
    );
  });
}
