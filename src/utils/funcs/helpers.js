import axios from "axios";
import env from "../../constants/env";

// Function to add commas to a number for numbers >= 1000
const formatNumber = (num) => {
  if (num >= 1000) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

// Function to get the booking ids of items(spaces or services)
const getBookingIds = async (items, user, miscFunc) => {
  try {
    if (Array.isArray(items)) {
      let data = [];
      items.forEach((item) => {
        data.push({
          itemId: item.itemId,
          clientId: user?.data._id,
        });
      });

      const res = await axios.post(
        "/booking/get/id",
        { items: data },
        {
          baseURL: `${env.API_URL}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!res?.data?.data) throw new Error(res);

      if (typeof miscFunc === "function") {
        miscFunc(res);
      } else {
        return res?.data?.data;
      }
    } else {
      return [];
    }
  } catch (error) {
    const theError = error;
    console.log(theError);
  }
};

export { formatNumber, getBookingIds };
