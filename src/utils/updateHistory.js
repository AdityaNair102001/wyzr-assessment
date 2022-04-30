import axios from "axios";
export async function updateHistory(input) {
  try {
    const response = await axios.patch(
      "https://stjbh47fui.execute-api.ap-south-1.amazonaws.com/deploy/users",
      {
        email_id: localStorage.getItem("email"),
        searched_history: input,
      }
    );
    console.log(response.data);
    if (response.data.success == true) {
      console.log("updated the history");
    }
  } catch (err) {
    console.log(err);
  }
}
