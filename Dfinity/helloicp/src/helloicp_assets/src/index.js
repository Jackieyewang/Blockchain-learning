import { helloicp } from "../../declarations/helloicp";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with helloicp actor, calling the greet method
  const greeting = await helloicp.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
