import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
    id: number;
    nombre: string;
    email: string;
    contrasenia?: string;
    id_roles: number;

}

interface UserCreationAttributes extends Optional<UserAttributes,  'id'>{
    contrasenia: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id!: number;
    public nombre!: string;
    public email!: string;
    public contrasenia!: string;
    public id_roles!: number;

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;

    public async comparePassword(contrasenia: string): Promise<boolean> {
        return bcrypt.compare(contrasenia, this.contrasenia);
    }

}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,

    },

    nombre: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },

    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },

    contrasenia: {
        type: new DataTypes.STRING(128),
        allowNull: false,

    },

    id_roles: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
},
    {
        tableName: 'usuarios',
        sequelize,
        timestamps:false
    });

export default User;