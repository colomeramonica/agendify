import { Response, Request } from 'express'
import { MeetingRoom } from '../../database';

export default class MeetingRoomController { 
  async index(req: Request, res: Response) { 
    const meetingRooms = await MeetingRoom.findAll();

    return res.status(200).json(meetingRooms);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'Meeting Room not found' })
    }

    const meetingRoom = await MeetingRoom.findByPk(id);

    return res.status(200).json(meetingRoom);
  }

  async store(req: Request, res: Response) {
    const { name, location, capacity } = req.body;

    if (!name || !location || !capacity) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const meetingRoom = await MeetingRoom.create({ name, location, capacity });

    return res.status(201).json(meetingRoom);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, location, capacity } = req.body;

    if (!id) {
      return res.status(404).json({ message: 'Meeting Room not found' })
    }

    await MeetingRoom.update({ name, location, capacity }, {
      where: {
        id
      }
    });

    return res.status(204).send();
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'Meeting Room not found' })
    }

    await MeetingRoom.destroy({
      where: {
        id
      }
    });

    return res.status(204).send();
  }
}