import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import {
  Paper,
  Divider,
  List,
  ListItem,
  Chip,
  Button,
  Card,
  MenuList,
  Box,
  Autocomplete,
  TextField,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import ChipList from "./ProvinceList";
// import ProvinceList from "./ProvinceList";
// import CountyList from "./CountyList";

import CovidInteractiveInfo from "./CovidInteractiveInfo";

const myJHWorldDataURL = "https://disease.sh/v3/covid-19/all";
const myJHUSDataURL = "https://disease.sh/v3/covid-19/jhucsse/counties";

const queryClient = new QueryClient();

export default function CovidInfo() {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}>
        <CovidInteractiveInfo URL={myJHWorldDataURL} />
      </QueryClientProvider> */}

      <QueryClientProvider client={queryClient}>
        <CovidInteractiveInfo URL={myJHUSDataURL} />
      </QueryClientProvider>
    </>
  );
}


const myMessage = "Loading Covid Info.... Stand by ...";

