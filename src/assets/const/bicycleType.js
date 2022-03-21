import axios from "axios";
let bicycleTypeData;
const bicycleTypes = async (tempVar) => {
  return await axios
    .get("http://18.189.6.9/api/v1/bicycle-type")
    .then((response) => {
      bicycleTypeData = response.data["$values"].map((value) => {
        return {
          id: value.id,
          type: value.type,
          color: value.color,
        };
      });
      tempVar(bicycleTypeData);
    });
};

export default bicycleTypes;
