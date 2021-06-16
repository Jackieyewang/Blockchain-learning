import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as actor_hello_idl, canisterId as actor_hello_id } from 'dfx-generated/actor_hello';

const agent = new HttpAgent();
const actor_hello = Actor.createActor(actor_hello_idl, { agent, canisterId: actor_hello_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await actor_hello.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
