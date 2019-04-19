import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number

  @BeforeInsert()
  updateDates() {
    this.firstName = 'max'
  }
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

