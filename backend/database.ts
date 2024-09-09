import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize('agendify', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateHour: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'events',
  timestamps: true,
});
const MeetingRoom = sequelize.define('MeetingRoom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
}, {
  tableName: 'meeting_rooms',
  timestamps: true,
});
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workingHours: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: true,
});
User.hasMany(Event, { foreignKey: 'owner', as: 'ownedEvents' });
Event.belongsTo(User, { foreignKey: 'owner', as: 'ownerDetails' });
MeetingRoom.hasMany(Event, { foreignKey: 'meeting_room', as: 'events' });
Event.belongsTo(MeetingRoom, { foreignKey: 'meeting_room', as: 'meetingRoomDetails' });
const EventGuest = sequelize.define('EventGuest', {}, {
  tableName: 'event_guests',
  timestamps: false,
});
User.belongsToMany(Event, { through: EventGuest, foreignKey: 'guest_id', as: 'events' });
Event.belongsToMany(User, { through: EventGuest, foreignKey: 'event_id', as: 'guests' });

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado!');
  }
  catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}
syncDatabase();

export { Event, MeetingRoom, User };