import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert,  ObjectID, ObjectIdColumn,} from 'typeorm'

@Entity()
export class Order {
    
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ default: Math.random() })
    name: string;

    @Column({ default: Math.random() })
    value: string
}


// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column()
//   firstName: string

//   @Column()
//   lastName: string

//   @Column()
//   age: number

//   @BeforeInsert()
//   updateDates() {
//     this.firstName = 'max'
//   }
// }


/* 

Auftragsnummer

Kundennr
Kundenadresse

Auftragstype: Online, Telefon, Inhouse, Vertrieb

Wunschliefertermin
Liefertermin


Artikelliste

Rabatt

