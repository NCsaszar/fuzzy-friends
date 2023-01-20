import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import { discover, friends, messages, sampleEvents } from './mock_data';
import { Request, Response } from 'express';
import { db, Event } from './db';

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/users/:id/messages/:mateId', (req: Request, res: Response) => {
  db.addMessage(req.params.id, req.params.mateId, req.body.content)
    .then(() => res.sendStatus(201))
    .catch((err) => res.send(err));
});

app.post('/users/:id/update', (req: Request, res: Response) => {
  db.updateProfile(req.params.id, req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => res.send(err));
});

app.get('/users/:id/messages/:mateId', (req: Request, res: Response) => {
  db.getMessages(req.params.id, req.params.mateId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/users/:id/friends', (req: Request, res: Response) => {
  db.getFriends(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/users/:id/friends/:mateId', (req: Request, res: Response) => {
  db.addFriend(req.params.id, req.params.mateId)
    .then(() => res.sendStatus(201))
    .catch((err) => res.send(err));
});

app.get('/users/:id/requests', (req: Request, res: Response) => {
  db.getRequests(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete('/users/:id/requests/:mateId', (req: Request, res: Response) => {
  db.removeRequest(req.params.id, req.params.mateId)
    .then(() => {
      res.sendStatus(202);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/users/:id/requests/:mateId', (req: Request, res: Response) => {
  db.addRequest(req.params.id, req.params.mateId)
    .then(() => {
      res.send(201);
    })
    .catch(() => {
      res.send(501);
    });
});

// app.put('/users/:id/friends/*', (req: Request, res: Response) => {
//   db.
//   res.sendStatus(200);
// });

app.get('/users/:id/discover', (req: Request, res: Response) => {
  db.getProfiles(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/users/:id', (req: Request, res: Response) => {
  db.getUser(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/users/:id', (req: Request, res: Response) => {
  db.addUser(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.sendStatus(404));
});

/*
  GET /events
  params:
    - month
    - year
*/

let evts = sampleEvents;
app.get('/users/:id/events', async (req, res) => {
  // res.send(evts);
  try {
    const results = await Event.find({ userId: req.params.id });
    console.log('what are my results:', results);
    res.send(results);
  } catch (err) {
    console.log('got an error GET events', err);
    res.sendStatus(500);
  }
});

app.post('/users/:id/events', async (req, res) => {
  const event = new Event(req.body);
  event.userId = req.params.id;
  evts.push({
    _id: '5',
    userId: req.params.id,
    title: event.title,
    description: event.description,
    friend: event.friend,
    location: event.location,
    start: event.start,
    end: event.end,
    date: new Date('2023-01-22'),
  });

  try {
    const result = await event.save();
    console.log('what does mongoose send back?', result);
    res.status(201).send(result);
  } catch (err) {
    console.log('what is the error:', err);
    res.sendStatus(500);
  }
});

app.put('/users/:id/events', async (req, res) => {
  if (req.body._id === undefined) {
    return res.sendStatus(400);
  }

  try {
    const result = await Event.updateOne({ _id: req.body._id }, req.body);
    if (result.modifiedCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (err) {
    console.log('PUT events error:', err);
    res.sendStatus(500);
  }
});

app.delete('/users/:id/events', async (req, res) => {
  evts = evts.filter((evt) => evt._id !== req.query._id);
  try {
    const result = await Event.deleteOne({ _id: req.query._id });
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (err) {
    console.log('DELETE events error:', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
