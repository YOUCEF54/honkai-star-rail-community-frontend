import { StarRail } from "starrail.js";
const client = new StarRail();

client.fetchUser(800069903).then(user => {
  console.log(user);
});

export default function TicketPage() {
  return (
    <div>
      <h1>Ticket Page</h1>
      <p>This page is for managing tickets.</p>
    </div>
  );
}