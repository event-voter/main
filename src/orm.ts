import { Sequelize, Model, DataTypes } from "sequelize";

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: "postgres",
    logging: true
});

export class Event extends Model {};
Event.init(
    {
        id: { type: DataTypes.STRING, primaryKey: true, unique: true } ,
        name: DataTypes.STRING,
        creator: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        last_vote: DataTypes.DATE,
        desc: DataTypes.STRING,
        pass: DataTypes.STRING,
        user: DataTypes.STRING,
        status: DataTypes.INTEGER
    },
    {
        modelName: "event", sequelize: db
    }
);

export class Voter extends Model {};
Voter.init(
    {
        id: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: DataTypes.STRING,
        user: DataTypes.STRING,
        created_at: DataTypes.DATE,
        status: DataTypes.INTEGER
    },
    {
        modelName: "voter", sequelize: db
    }
);

export class Voting extends Model {};
Voting.init(
    {
        id: { type: DataTypes.STRING, primaryKey: true, unique: true },
        event_id: DataTypes.STRING,
        voter_id: DataTypes.STRING,
        picked_date: DataTypes.DATE,
        user: DataTypes.STRING,
        created_at: DataTypes.DATE,
        status: DataTypes.INTEGER
    },
    {
        modelName: "voting", sequelize: db
    }
);

Voting.hasMany(Voter);
Event.hasMany(Voting);
Voter.belongsTo(Voting);
Voting.belongsTo(Event);

export function syncDB() : Promise<Sequelize> {
    return db.sync();
}
