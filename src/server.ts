import  app from "./app";

// define el puerto
const PORT: number = 3000; // ⬅️ aquí se define correctamente como número

app.get("/", (req, res) => {
  res.send("Servidor funcionando ✅");
});

// escucha en localhost
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});


