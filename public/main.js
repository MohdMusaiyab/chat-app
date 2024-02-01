const socket = io();

const clientsTotal = document.getElementById("clients-total");
// Listenign for an event from Backend
socket.on("clients-total", (data) => {
    // console.log(data);
    clientsTotal.innerText='Ttoal clients connected: '+data;
});