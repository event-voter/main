import { Event } from './orm';
import sha1 from "sha1-es";

async function createNewEvent(req, res) {
    const form = req.body;
    // validate input
    if(!form.name || !form.creator || !form.start_date 
        || !form.end_date! || !form.last_vote) 
        {
            res.status(400).send({msg: 'Form is not complete!'})
        }
    // validate date form

    // create id
    const id = sha1.hash(`${Date.now()}${form.name}${form.creator}`); 
    // save to db
    try {
        const event = await Event.create({
            id: id,
            name: form.name,
            creator: form.creator,
            start_date: form.start_date,
            end_date: form.end_date,
            last_vote: form.last_vote,
            desc: form.desc || '',
            pass: form.pass || '',
            user: form.creator,
            status: 1,
        });
        res.status(200).send({ok: true, id: id});
    } catch (err) {
        console.log(err);
        res.status(400).send({ok: false, msg: err});
    }
}

async function getEvent(req, res) {
    console.log('tesevent');
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
    createNewEvent: createNewEvent,
    getEvent: getEvent
}