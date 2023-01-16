import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { List, ListItem, Chip, Button, Card } from "@mui/material";
import uuid from "react-uuid";
import { useEffect } from "react";

const myJHUSData = "/api/stuff";

const queryClient = new QueryClient();

export default function NewStuffList() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const myMessage = "Loading some mystuff Info.... Stand by ...";
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch(myJHUSData).then((res) => res.json())
  );
  if (isLoading) return <p key={uuid()}>{myMessage}</p>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card>
        <h3>New Stuff List</h3>
        <List>
          {data ? (
            data.map((item) => (
              <ListItem key={uuid()}>
                <Button
                  key={uuid()}
                  onClick={() => {
                    alert(item);
                  }}
                >
                  <Chip
                    padding={2}
                    variant="outlined"
                    size="small"
                    label="Stuff Item"
                  />{" "}
                  &nbsp; {item}
                  &nbsp;{" "}
                </Button>
              </ListItem>
            ))
          ) : (
            <ListItem>listitem {myMessage} Stand by ...</ListItem>
          )}
        </List>
        <p>{JSON.stringify(data)}</p>
      </Card>
    </>
  );
}
