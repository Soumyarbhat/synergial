const express = require('express');
const app = express();

app.use(express.json());

let events = [];
let bookings = [];

app.get('/events', (request, response) => {
  response.send(events);
});

app.post('/events/add', (request, response) => {
  const { id, name, date, location } = request.body;
  events.push({ id, name, date, location });
  response.send(' Event added successfully');
});

app.get('/event/:id', (request, response) => {
  const event = events.find(e => e.id == request.params.id);
  if (event) response.send(event);
  else response.status(404).send('Event not found');
});

app.put('/event/:id', (request, response) => {
  const event = events.find(e => e.id == request.params.id);
  if (event) {
    const { name, date, location } = request.body;
    if (name) event.name = name;
    if (date) event.date = date;
    if (location) event.location = location;
    response.send('Event updated successfully');
  } else {
    response.send('Event not found');
  }
});

app.delete('/event/:id', (request, response) => {
  events = events.filter(e => e.id != request.params.id);
  response.send(' Event cancelled');
});

app.get('/api/bookings', (request, response) => {
  response.send(bookings);
});

app.post('/api/bookings', (request, response) => {
  const { id, participantName, email, eventId } = request.body;
  bookings.push({ id, participantName, email, eventId });
  response.send('Booking created successfully');
});

app.get('/api/bookings/:id', (request, response) => {
  const booking = bookings.find(b => b.id == request.params.id);
  if (booking) res.send(booking);
  else response.send(' Booking not found');
});

app.put('/api/bookings/:id', (request, response) => {
  const booking = bookings.find(b => b.id == request.params.id);
  if (booking) {
    const { participantName, email } = request.body;
    if (participantName) booking.participantName = participantName;
    if (email) booking.email = email;
    response.send('Booking details updated');
  } else {
    response.send(' Booking not found');
  }
});

app.delete('/api/bookings/:id', (request, response) => {
  bookings = bookings.filter(b => b.id != request.params.id);
  response.send('Booking cancelled');
});

app.get('/', (request, response) => {
  response.send(' Synergia Event Booking API is running!');
});

app.listen(3000, () => {
  console.log('🚀 Server started');
});
