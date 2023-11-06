# Utiliza una imagen base oficial de Node.js
FROM node:18.9.0-alpine3.14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY ./app/package*.json ./
COPY ./app/app.js ./

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
