const stuff = ["abc debf", "ghijkl", "mnopqr"];

var myRes = "<h1>test</h1>";

myRes += "<ul>";
myRes += stuff
  .map((line) => {
    return `<li>${line}</li>`;
  })
  .join("");
myRes += "</ul>";

export default async function handler(req, res) {
  res.status(200).send(myRes);
}
