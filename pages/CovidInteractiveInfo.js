import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import uuid from "react-uuid";
import {
  Paper,
  Divider,
  List,
  ListItem,
  Chip,
  Button,
  Card,
  Stack,
  MenuList,
  Box,
  Autocomplete,
  TextField,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

const myMessage = "Loading Covid Info.... Stand by ...";

import { useEffect, useState } from "react";
function MyList(props) {
  return (
    <Box sx={{ width: 800, padding: "20px", margin: 2 }}>
        <h4>{props.list.length} Items in {props.listname} </h4>
      <List>
        {props.list ? (
          props.list.map((item) => (
            <ListItem key={uuid()} sx={{ border: "1px", margin: 2 }}>
              <Button
                sx={{ height: "10px" }}
                key={uuid()}
                onClick={() => {
                  alert(item.country + item.province + item.county);
                }}
              >
                <Chip
                  padding={0}
                  variant="outlined"
                  size="small"
                  label="Country"
                />
                <Divider orientation='vertical'/>
                {" "}
                &nbsp; {item.country}
                &nbsp;{" "}
                <Chip
                  padding={0}
                  variant="outlined"
                  size="small"
                  label="Province"
                />{" "}
                &nbsp; {item.province}
                &nbsp;{" "}
                <Divider orientation='vertical'/>
                <Chip
                  padding={0}
                  variant="outlined"
                  size="small"
                  label="County"
                />{" "}
                &nbsp; {item.county}
                &nbsp;{" "}
                <Divider orientation='vertical'/>
                <Chip
                  padding={0}
                  variant="outlined"
                  size="small"
                  label="Deaths"
                />{" "}
                &nbsp; {item.stats.deaths}
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem key={uuid()}>{myMessage}</ListItem>
        )}
      </List>
    </Box>
  );
}

export default function CovidInteractiveInfo(props) {
  const { isLoading, error, data } = useQuery(["repoData"], async () =>
    fetch(props.URL).then((res) => res.json())
  );
  const [myFlist, setMyFlist] = useState();
  const [mySelectedCounty, setMySelectedCounty] = useState(null);
  const [mySelectedProvince, setMySelectedProvince] = useState(null);
  //
  //  now data has the result
  //
  const myList = data ? data : ["a"];
  let myCounties = [];
  let myProvinces = [];
  let myFilteredList = [];
  let myFilteredByCounty = [];
  let myFilteredByProvince = [];
  let myTotalDeaths = 0;
  let myFilteredTotalDeaths = 0;
  let myFilteredCountyDeaths = 0;
  let myFilteredProvinceDeaths = 0;


  function colorByLength(_list) {
    if (_list.length === 0) {
        return 'red';
    }
    return 'green';
  }

  const makeFilteredListWith = (_list, _field, _this) => {
    myList.forEach((item) => {
      if (!myCounties.includes(item.county)) {
          myCounties.push(item.county);
      }
      if (!myProvinces.includes(item.province)) {
           myProvinces.push(item.province);
      }
      if (item[_field]) {
//          console.log(item.stats.deaths);
          myTotalDeaths += item.stats.deaths;
      }
      if (item[_field] === _this) {
        _list.push(item);
        myFilteredList.push(item);
        try {
          myFilteredTotalDeaths += item.stats.deaths;
        if (item[_field] === mySelectedCounty && mySelectedCounty !== null) {
            myFilteredCountyDeaths += item.stats.deaths
        }
          if (item[_field]   && mySelectedProvince !== null) {
              myFilteredProvinceDeaths += item.stats.deaths
          }

        } catch (err) {
          console.log("error = ", err);
        }
      }
    });
  };

  makeFilteredListWith(myFilteredByCounty, "county", mySelectedCounty);
  makeFilteredListWith(myFilteredByProvince, "province", mySelectedProvince);

  if (myCounties.length > 0) myCounties.sort();
  if (myProvinces.length > 0) myProvinces.sort();

  // const myCountySet = new Set(myCounties);
  const myCountyList = myCounties;
  // const myProvinceSet = new Set(myProvinces);
  const myProvinceList = myProvinces;

  function CountyList() {
    return myCountyList.map((item) => {
      return (
        <Button
          key={uuid()}
          onClick={() => {
            setMySelectedCounty(item);
          }}
        >
          <Chip label={item} />
        </Button>
      );
    });
  }

  function ProvinceList() {
    return myProvinceList.map((item) => {
      return (
        <Button
          key={uuid()}
          onClick={() => {
            setMySelectedProvince(item);
          }}
        >
          <Chip label={item} />
        </Button>
      );
    });
  }

  if (isLoading) return <p key={uuid()}>{myMessage}</p>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <Typography variant="h6">Covid Info From Johns Hopkins Updated every 10 Minutes</Typography>
      </Paper>
      <Divider />

     <Paper sx={{ width: "100%" }}>
      <Card variant="outlined">
      <CardContent>

      <Chip sx={{ color: colorByLength(myFilteredByCounty) }}
        variant="outlined"
        label={
          "County = " +
          mySelectedCounty +
          " " +
          myFilteredByCounty.length +
          " county filtered items "
        }
      />






      <Chip sx={{ color: colorByLength(myFilteredByProvince) }}
        variant="outlined"
        label={
          "Province = " +
          mySelectedProvince +
          " " +
          myFilteredByProvince.length +
          " province or state filtered items "
        }
      />






      <Chip
        variant="outlined"
        label={
          myFilteredList.length +
          " total items "
        }
      />





      <Chip style={{ fontSize: 20}}
        variant="outlined"
        label={
          myFilteredCountyDeaths.toLocaleString() +
          " deaths in " +  mySelectedCounty + " County"
        }
      />


      <Chip style={{ fontSize: 20}}
        variant="outlined"
        label={
          myFilteredProvinceDeaths.toLocaleString() +
          " deaths in " +  mySelectedProvince + " State"
        }
      />


      <Chip style={{ fontSize: 20}}
        variant="outlined"
        label={
          myTotalDeaths.toLocaleString() +
          " deaths in all"
        }
      />


        </CardContent>
        </Card>
        </Paper>

      <Divider />
    <Paper          style={{
                                   maxHeight: 300,
                                   maxWidth: 300,
                                   overflow: "auto",
                                   borderWidth: "20px",
                                   borderColor: "red",
                                   margin: 2,
                                 }}>

        </Paper>
       <Paper          style={{
                         maxHeight: 300,
                         maxWidth: 300,
                         overflow: "auto",
                         margin: 2,
                       }}>


      <Card variant="outlined" sx = {{ width: "1800px", padding: "20px", margin: 1 }}>
      <CardContent>
      <Typography variant="h6">Provinces - States  </Typography>
      <Autocomplete
        size="small"
        sx={{ width: "200px" }}
        options={myProvinceList}
        renderInput={(listitem) => <TextField {...listitem} />}
        value={mySelectedProvince}
        onChange={(event, newValue) => {
          setMySelectedProvince(newValue);
        }}
      />
      <Typography variant="h6">Counties  </Typography>
      <Autocomplete
        size="small"
        sx={{ width: "200px" }}
        options={myCountyList}
        renderInput={(listitem) => <TextField {...listitem} />}
        value={mySelectedCounty}
        onChange={(event, newValue) => {
          setMySelectedCounty(newValue);
        }}
      />
      </CardContent>
      </Card>
        </Paper>


       <Box >
               <Card>
               <CardContent>
             <Chip
               variant="outlined"
               label={
                 myList.length.toLocaleString() +
                 " Items In List"
               }
             />

             <Chip
               variant="outlined"
               label={
                 myTotalDeaths.toLocaleString() +
                 " Total Deaths In List"
               }
             />
               </CardContent>
               </Card>

       </Box>

      <Card       sx = {{ width: "600px", padding: "20px", margin: 2 }}>

        <Button
                onClick={() => {
                  {
                    setMySelectedCounty(null);
                  }
                }}
              >
                reset counties
          </Button>
          <Button
            onClick={() => {
              {
                setMySelectedProvince(null);
              }
            }}
          >
            reset provinces / states
          </Button>

        </Card>

        <Stack orientation="horizontal" spacing={2} maxWidth="900px">
        <Typography>Counties</Typography>

        <Paper
          style={{
            maxHeight: 120,
            maxWidth: 400,
            overflow: "auto",
            margin: "5px",
          }}>
          <CountyList list={myCountyList} />
        </Paper>
        <Typography>States / Provinces</Typography>
        <Paper
          style={{
            maxHeight: 120,
            maxWidth: 400,
            overflow: "auto",
            margin: "5px",
          }}
        >

        <Divider />
          <ProvinceList list={myProvinceList} />
        </Paper>

        </Stack>


        <Paper
          style={{
            minHeight:
              myFilteredList.length > 0
                ? myFilteredList.length * 100.0 + 100.0
                : 10,
            maxHeight: myFilteredList.length * 100.0,
            overflow: "auto",
            borderWidth: "20px",
            borderColor: "darkgrey",
            margin: "50px",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">Filtered List of Counties</Typography>
              <MyList list={myFilteredList} listname="Full List"/>
              <Divider/>
              <MyList list={myFilteredByCounty}  listname="By County"/>
              <Divider/>
              <Typography variant="h6">Filtered List of Province or State</Typography>
              <MyList list={myFilteredByProvince}  listname="By Province - State"/>
            </CardContent>
          </Card>
        </Paper>




        <Divider />

        <Typography variant="h6">Raw Data</Typography>
        <Paper
          style={{
            maxHeight: 200,
            overflow: "auto",
            borderWidth: "2px",
            borderColor: "red",
            margin: "5px",
          }}
        >


      <Box>
        <p>{JSON.stringify(data)}</p>
      </Box>
    </Paper>



    </>
  );
}
