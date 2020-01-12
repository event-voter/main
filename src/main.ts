import { Event } from './orm';

async function createNewEvent(req, res) {
    console.log(req.body);
    const form = req.body;
    // validate input

    // save to db
    try {
        const event = await Event.create({
            id: form.id,
            name: form.name,
            creator: form.creator,
            start_date: form.start_date,
            end_date: form.end_date,
            last_vote: form.last_vote,
            desc: form.desc,
            pass: form.pass,
            user: form.user,
            status: form.status,
        });
        res.status(200).send({ok: true});
    } catch (err) {
        console.log(err);
        res.status(400).send({ok: false});
    }
}

async function getEvent(req, res) {
  try {
    const event_id = await Event.findOne({ where : {id : req.params.id }, raw: true});
    console.log(event_id);
    res.status(200).send(event_id)
  } catch (err) {
      console.log(err);
      res.status(400).send({ok: false});
  }
}

module.exports = {
    createNewEvent: createNewEvent
}