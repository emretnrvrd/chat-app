import jsonData from "./fakeData.json";

const runSeeder = async () => {
  if(!localStorage.getItem("users")){
    localStorage.setItem("users", JSON.stringify(jsonData.users));
    localStorage.setItem("auth", JSON.stringify(jsonData.auth));
    localStorage.setItem("messages", JSON.stringify(jsonData.messages));
    localStorage.setItem("conversations", JSON.stringify(jsonData.conversations));
  }
}

export { runSeeder }
