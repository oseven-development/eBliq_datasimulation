export interface IArticel {
  high: IProduct[]
  mid: IProduct[]
  low: IProduct[]
}

export interface IProduct {
  kategorie: string
  products: {
    name: string
    price: number
  }[]
}

const articels: IArticel = {
  high: [
    {
      kategorie: 'Papier',
      products: [
        { price: 10.3, name: 'Druckerpapier' },
        { price: 7.9, name: 'Dreiloch-Stanzpapier' },
        { price: 99.33, name: 'Kohlepapier' },
        { price: 12.67, name: 'Farbkartenbestand' },
        { price: 3.3, name: 'Geschenkpapier' },
        { price: 1.2, name: 'Kuverts' },
        { price: 77.4, name: 'Visitenkarten' },
        { price: 12.3, name: 'Briefkopf' }
      ]
    },
    {
      kategorie: 'Kleinbürobedarf',
      products: [
        { price: 10.3, name: 'Heftgerät' },
        { price: 7.9, name: 'Heftklammern' },
        { price: 99.33, name: 'Hefter-Entferner' },
        { price: 12.67, name: 'Schere' },
        { price: 3.3, name: 'Kastenschneider' },
        { price: 1.2, name: 'Büroklammern (klein, mittel, groß)' },
        { price: 77.4, name: 'Binderclips (klein, mittel, groß)' },
        { price: 12.3, name: 'Klarsichtiger Zellophan-Bandabroller' },
        { price: 10.3, name: 'Klares Zellophanband' },
        { price: 7.9, name: 'Abdeckband' },
        { price: 9.33, name: 'Verpackungsband' },
        { price: 12.67, name: 'Klebeband' },
        { price: 3.3, name: 'Haftnotizen (klein, mittel, groß)' },
        {
          price: 1.2,
          name: 'Lesezeichen für klebrige Flaggen (klein, mittel, groß)'
        },
        { price: 77.4, name: 'Lesezeichen' },
        { price: 12.3, name: 'Weißkleber' },
        { price: 77.4, name: 'Gummizement' },
        { price: 12.3, name: 'Klebriger Wandgummi für die Wandmontage' },
        { price: 77.4, name: 'Aufhängehaken' },
        { price: 12.3, name: 'Lupe' }
      ]
    },

    {
      kategorie: 'Schreibgeräte',
      products: [
        { price: 7.9, name: 'Bleistifte' },
        { price: 99.33, name: 'Bleistiftanspitzer' },
        { price: 12.67, name: 'Druckbleistifte' },
        { price: 3.3, name: 'Druckbleistift-Minenminen' },
        { price: 1.2, name: 'Radiergummis' },
        { price: 7.4, name: 'Stifte' },
        { price: 12.3, name: 'Schwarze Universalmarker' },
        { price: 10.3, name: 'Textmarker' },
        { price: 7.9, name: 'Gummistempel' },
        { price: 9.33, name: 'Stempelkissen' },
        { price: 12.67, name: 'Korrekturflüssigkeit' },
        { price: 3.3, name: 'Trocken-/Nass-Löschbrett' },
        { price: 1.2, name: 'Trocken-/Nass-Löschmarker' },
        { price: 77.4, name: 'Trocken/Nass1 Löschspray' },
        { price: 2.3, name: 'Lineal' },
        { price: 5.73, name: 'Winkelmesser' },
        { price: 19.2, name: 'Kompass' },
        { price: 122.3, name: 'T-Quadrat' }
      ]
    }
  ],
  mid: [
    {
      kategorie: 'Kuverts und Boxen',
      products: [
        { price: 13.21, name: 'Reguläre Umschläge (4 1/8 x 9 1/2 Zoll)' },
        { price: 6.6, name: 'Gesetzliche Umschläge' },
        { price: 13.5, name: 'Gepolsterte legale Kuvertversandtaschen' },
        { price: 11.97, name: 'Briefmarken' },
        { price: 0.5, name: 'Kuvertversiegelung' },
        { price: 22.65, name: 'Kartons (klein, mittel, groß)' }
      ]
    },
    {
      kategorie: 'Notebooks und Notizblöcke',
      products: [
        { price: 51, name: 'Zusammenstellung von Notizbüchern' },
        { price: 1.55, name: 'Spiralgebundene Notebooks' },
        { price: 4.2, name: 'Stenopads' },
        { price: 3.86, name: 'Rechtliche Hinweise' }
      ]
    },
    {
      kategorie: 'Bürolagerung',
      products: [
        { price: 4.2, name: 'Buchstützen' },
        { price: 5.5, name: 'Briefbeschwerer' },
        { price: 34.2, name: 'Zeitschriftenhalter' },
        { price: 4.2, name: 'Bulletin board' },
        { price: 8.2, name: 'Pushpins' },
        { price: 5.2, name: 'Brieföffner' },
        { price: 42.27, name: 'Stifthalter' },
        { price: 23.25, name: 'In/Out-Box' },
        { price: 86.52, name: 'Dokumentsortierer/Halterung' },
        { price: 9.32, name: 'Vorratsbehälter und -behälter' }
      ]
    },
    {
      kategorie: 'Diverse',
      products: [
        { price: 4.2, name: 'Erste-Hilfe-Kasten' },
        { price: 5.5, name: 'Taschenlampe' },
        { price: 34.2, name: 'Feuerlöscher' },
        { price: 4.2, name: 'Desinfektionstücher' },
        { price: 8.2, name: 'Handdesinfektionsmittel' },
        { price: 5.2, name: 'Fensterreiniger' },
        { price: 42.27, name: 'Papierhandtücher' },
        { price: 23.25, name: 'Gesichtsgewebe' },
        { price: 86.52, name: 'Besen' },
        { price: 9.32, name: 'Kehrschaufel' },
        { price: 4.2, name: 'Staubsauger' },
        { price: 5.5, name: 'Müllsäcke' },
        { price: 34.2, name: 'Schnur' },
        { price: 4.2, name: 'Batterien' },
        { price: 8.2, name: 'Computerbildschirm und Tastaturreiniger' },
        { price: 5.2, name: 'Druckluft (zur Reinigung der Tastatur)' },
        { price: 42.27, name: 'Papierkorb' }
      ]
    }
  ],
  low: [
    {
      kategorie: 'Bindungselemente',
      products: [
        { price: 7.54, name: 'Bindemittel' },
        { price: 4.35, name: 'Bindungslaschen' },
        { price: 3.24, name: 'Ordnertaschen' },
        { price: 2.52, name: 'Klare Ordner-Dokumentenhalter' },
        { price: 3.52, name: 'Lochstanze' },
        { price: 99.3, name: 'Dreilochstanze' }
      ]
    },
    {
      kategorie: 'Aktenschrank',
      products: [
        { price: 7.54, name: 'Manila-Ordner' },
        { price: 7.54, name: 'Hängemappen' },
        { price: 7.54, name: 'Ordner-Registerkarten' }
      ]
    },
    {
      kategorie: 'Elektroartikel',
      products: [
        { price: 7.54, name: 'Computer und Monitor' },
        { price: 4.35, name: 'Tastatur' },
        { price: 3.24, name: 'Maus' },
        { price: 142.52, name: 'Drucker' },
        { price: 93.52, name: 'Toner- oder Druckkassetten' },
        { price: 119.3, name: 'Telefon' },
        { price: 27.54, name: 'Freisprecheinrichtung' },
        { price: 54.35, name: 'Headset' },
        { price: 23.24, name: 'Frankiermaschine' },
        { price: 23.52, name: 'Projektionsvorrichtung' },
        { price: 1233.52, name: 'Fotokopierer' },
        { price: 99.3, name: 'Lampen' },
        { price: 7.54, name: 'Etikettenhersteller' },
        { price: 554.35, name: 'Laminiermaschine' },
        { price: 333.24, name: 'Scanner' },
        { price: 232.52, name: 'Faxgerät' },
        { price: 123.52, name: 'Zerkleinerer' },
        { price: 9.3, name: 'Verlängerungskabel' }
      ]
    },

    {
      kategorie: 'Möbel',
      products: [
        { price: 1527.54, name: 'Schreibtisch' },
        { price: 245.35, name: 'Stühle' },
        { price: 2523.24, name: 'Aktenschränke' },
        { price: 2255.52, name: 'Tische' },
        { price: 1233.52, name: 'Bücherregale' },
        { price: 1199.3, name: 'Regale' }
      ]
    }
  ]
}

export default articels
