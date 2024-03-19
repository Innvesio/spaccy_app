import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import env from "../constants/env";
import { AuthContext } from "./AuthContext";
import { useToast } from "react-native-toast-notifications";

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("Wedding Ceremony");
  const [searchResult, setSearchResult] = useState([]);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    searchType: "space",
    capacity: "8",
    location: "Lagos",
    service: "",
  });
  const toast = useToast();
  const [spaces, setSpaces] = useState([]);
  const [allSpaces, setAllSpaces] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllSpaces = () => {
    axios
      .get(`${env.API_URL}/space/all`, {
        headers: {
          Authorization: `Bearea ${user.token}`,
        },
      })
      .then((res) => {
        setAllSpaces(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
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
        console.log(res.data);
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
        console.log("Vendor", [res.data]);
        setVendors([res.data]);
        setSearchResult([res.data]);
      })
      .catch((err) => {
        setSearchIsLoading(false);
        console.log(err.response.data);
      });
  };

  const fetchAllVendors = () => {
    axios
      .get(`${env.API_URL}/business`, {
        headers: {
          Authorization: `Bearea ${user.token}`,
        },
      })
      .then((res) => {
        setAllVendors(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const searchByType = () => {
    if (searchOptions.searchType === "space") {
      getAllEventTypes();
      fetchSpaces();
    } else {
      fetchVendors();
      getAllServiceTypes();
    }
  };

  const addToSaved = (details) => {
    const data = {
      venueDetails: details,
      userId: user.data._id,
    };
    axios
      .post(`${env.API_URL}/venue/space/${details._id}/save`, details, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setIsSaved(true);
        toast.show("Added to saved", {
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.show("Could not add to saved", {
          type: "danger",
        });
      });
  };
  const removeFromSaved = (id) => {
    const data = {
      venueDetails: details,
      userId: user.data._id,
    };
    axios
      .delete(`${env.API_URL}/venue/space/saved/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setIsSaved(true);
        toast.show("Remove from saved", {
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.show("Could not remove from saved", {
          type: "danger",
        });
      });
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
        addToSaved,
        removeFromSaved,
        getAllSpaces,
        allSpaces,
        fetchAllVendors,
        allVendors,
        isSaved,
        setIsSaved,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
