import { Response, Request } from 'express'
import { Event } from '../../database';

export default class EventController {
  async index(req: Request, res: Response) { 
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(404).json({ message: 'User not found' })
    }

    const events = await Event.findAll({
      where: {
        owner: user_id
      }
    });

    return res.status(200).json(events);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'Event not found' })
    }

    const event = await Event.findByPk(id);

    return res.status(200).json(event);
  }

  async store(req: Request, res: Response) {
    const { title, owner, date, location, hour, guests, tags } = req.body;

    if (!title || !owner || !date || !location || !hour || !guests || !tags) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const event = await Event.create({ title, owner, date, location, hour, guests, tags });

    return res.status(201).json(event);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, owner, date, location, hour, guests, tags } = req.body;

    if (!id) {
      return res.status(404).json({ message: 'Event not found' })
    }

    await Event.update({ title, owner, date, location, hour, guests, tags }, {
      where: {
        id
      }
    });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'Event not found' })
    }

    await Event.destroy({
      where: {
        id
      }
    });

    return res.status(204).send();
  }
}