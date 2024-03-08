import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import env from "../constants/env";

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("Wedding Ceremony");
  const [searchResult, setSearchResult] = useState([]);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    searchType: "space",
    capacity: "8",
    location: "Lagos",
    service: "",
  });
  const [spaces, setSpaces] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const allSpaces = () => {
    const endPoint = process.env.API_URL;
  };

  const getAllEventTypes = () => {
    axios
      .get(`${env.API_URL}/search/event_type`)
      .then((res) => {
        setEventTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllServiceTypes = () => {
    axios
      .get(`${env.API_URL}/search/vendor_type`)
      .then((res) => {
        setServiceTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSpaces = () => {
    setSearchIsLoading(true);
    axios
      .get(
        `${env.API_URL}/search/spaces?event=${searchValue}&capacity=${searchOptions.capacity}&location=${searchOptions.location}`,
        {
          headers: {
            Authorization: `Bearea ${"000000"}`,
          },
        }
      )
      .then((res) => {
        setSearchIsLoading(false);
        console.log(res.data);
        setSpaces(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        setSearchIsLoading(false);
        console.log(err);
      });
  };

  const fetchVendors = () => {
    setSearchIsLoading(true);
    axios
      .get(
        `${env.API_URL}/search/vendors?service=${searchValue}&location=${searchOptions.location}`,
        {
          headers: {
            Authorization: `Bearea ${"000000"}`,
          },
        }
      )
      .then((res) => {
        setSearchIsLoading(false);
        console.log("Vendor", res.data);
        setVendors([res.data]);
        setSearchResult([res.data]);
      })
      .catch((err) => {
        setSearchIsLoading(false);
        console.log(err.response.data);
      });
  };

  const searchByType = () => {
    if (searchOptions.searchType === "service") {
      fetchVendors();
      getAllEventTypes();
    } else {
      getAllServiceTypes();
      fetchSpaces();
    }
  };

  useEffect(() => {
    getAllEventTypes();
  }, []);

  return (
    <SpaceContext.Provider
      value={{
        searchIsLoading,
        searchByType,
        spaces,
        fetchSpaces,
        setSpaces,
        eventTypes,
        setEventTypes,
        getAllEventTypes,
        searchValue,
        setSearchValue,
        fetchVendors,
        searchOptions,
        setSearchIsLoading,
        setSearchOptions,
        getAllServiceTypes,
        searchResult,
        serviceTypes,
        vendors,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
