import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class Order extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  firstName: string

  @Column()
  lastName: string
}

/* 

Auftragsnummer

Kundennr
Kundenadresse

Auftragstype: Online, Telefon, Inhouse, Vertrieb

Wunschliefertermin
Liefertermin


Artikelliste

Rabatt

*/
