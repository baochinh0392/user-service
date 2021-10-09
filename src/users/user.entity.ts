import { Column, Entity, PrimaryColumn } from 'typeorm';
 
@Entity()
export class User {
  @PrimaryColumn()
  public id: string;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public password: string;

  @Column()
  public full_name: string;

  @Column()
  public dob: string;
}
