export default function handler(req, res) {
  let myResponse = `<h1>Zinno Zinnolee with this req ${req.query.name}</h1> Header <h2>test</h2>`;
  res.status(200).send(myResponse);
}
