const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //urls
    this.path = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
      buscar: "/api/buscar",
    };
    //conectar bd
    this.conectarDB();

    //Parseo y lectura del body
    this.app.use(express.json());
    //Middlewares
    this.middlewares();
    // rutas
    this.routes();
  }
  middlewares() {
    //cors
    this.app.use(cors());
    //Directorio publico
    this.app.use(express.static("public"));
  }
  async conectarDB() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.usuarios, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, (req, res) => {
      console.log("Servidor corriendo", this.port);
    });
  }
}

module.exports = Server;
