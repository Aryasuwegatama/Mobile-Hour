import express from "express";

const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})