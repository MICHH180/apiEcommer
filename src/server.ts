import  app from "./app";

// define el puerto
const PORT: number = 3000; // ⬅️ aquí se define correctamente como número

app.get("/", (req, res) => {
  res.send("Servidor funcionando ✅");
});

// escucha en localhost
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});



