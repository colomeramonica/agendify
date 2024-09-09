import { Response, Request } from 'express'
import { User } from '../../database';

export default class UserController { 
  async index(req: Request, res: Response) { 
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'User not found' })
    }

    const user = await User.findByPk(id);

    return res.status(200).json(user);
  }

  async store(req: Request, res: Response) {
    const { name, email, password, workingHours } = req.body;

    if (!name || !email || !password || !workingHours) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const user = await User.create({ name, email, password, workingHours });

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, workingHours } = req.body;

    if (!id) {
      return res.status(404).json({ message: 'User not found' })
    }

    await User.update({ name, email, password, workingHours }, {
      where: {
        id
      }
    });

    return res.status(204).send();
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: 'User not found' })
    }

    await User.destroy({
      where: {
        id
      }
    });

    return res.status(204).send();
  }
}