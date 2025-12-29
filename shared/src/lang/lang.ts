/*
This file is part of the SoLawi Bedarf app

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import {
  OrderPaymentType,
  ProductCategoryType,
  ShipmentType,
  UserCategory,
  UserRole,
} from "../enum";
import {
  EmailTextsKeys,
  OrganizationInfoKeys,
  PageElementKeys,
  PdfTextsKeys,
} from "../types";

// info i: 24D8
// black truck: 26DF

export const language = {
  app: {
    title: "›Weites Feld‹",
    subtitle: "Kooperative Landwirtschaft (CSA) · mit gutem Grund und viel Geschmack!",
    navigation: {
      title: "Navigation",
      subtitle: "Solawi",
    },
    units: {
      weight: "Gewicht",
      piece: "Stück",
      volume: "Volumen",
      kg: "kg",
      g: "g",
      l: "l",
      ml: "ml",
      pcs: "Stk.",
      ct: "ct",
      euro: "€",
      unit: "Einheit",
    },
    actions: {
      cancel: "Abbrechen",
      save: "Speichern",
      close: "Schließen",
      more: "Mehr",
      createNew: "Neu erstellen",
      delete: "Löschen",
      apply: "Übernehmen",
      edit: "Bearbeiten",
      update: "Aktualisieren",
      restore: "Änderungen verwerfen",
      activate: "Aktivieren",
    },
    hints: {
      warning: "Warnung",
      note: "Hinweis",
    },
    uiFeedback: {
      saving: {
        success: "Speichern erfolgreich",
        failed: "Speichern fehlgeschlagen",
      },
      deleting: {
        success: "Löschen erfolgreich",
        failed: "Löschen fehlgeschlagen",
        askConfirmation: "Soll {item} wirklich gelöscht werden?",
      },
    },
    maintenance: {
      defaultMessage:
        "Wartungsmodus: Änderungen gehen möglicherweise verloren!",
      inconsistentServerVersion:
        "Es existiert eine neuere Version der App. Bitte die Seite aktualisieren.",
      serverError: "Server nicht verfügbar: {message}",
      serverAvailable:
        "Server wieder verfügbar. Bitte die die Seite aktualisieren.",
    },
    options: {
      active: {
        true: "aktiv",
        false: "inaktiv",
      },
      userRoles: {
        [UserRole.USER]: "Ernteteiler",
        [UserRole.EMPLOYEE]: "Mitarbeiter",
        [UserRole.ADMIN]: "Admin",
      },
      orderUserCategories: {
        [UserCategory.CAT130]: {
          title: "stilles Solawi-Mitglied",
          subtitle: "Keine Mitarbeit, Richtwert ca. 15% erhöht.",
        },
        [UserCategory.CAT115]: {
          title: "aktives Mitglied",
          subtitle:
            "Mitarbeit mindestens 5 h/Monat, regulärer Richtwert.",
        },
        [UserCategory.CAT100]: {
          title: "engagiertes Mitglied",
          subtitle:
            "Mitarbeit mindestens 10 h/Monat, Richtwert ca. 15% reduziert.",
        },
      },
      productCategoryTyps: {
        [ProductCategoryType.SELFGROWN]: {
          title: "Selbstanbauprodukte",
          subtitle: "Die Produkte werden in {name} angebaut",
        },
        [ProductCategoryType.COOPERATION]: {
          title: "Kooperationsprodukte",
          subtitle:
            "Die Produkte werden durch Kooperationspartner bereitgestellt",
        },
      },
      paymentTypes: {
        [OrderPaymentType.SEPA]: "SEPA-Lastschrift",
        [OrderPaymentType.BANK_TRANSFER]: "Überweisung",
        [OrderPaymentType.UNCONFIRMED]: "Unbestätigt",
      },
    },
    errors: {
      general:
        "Es ist leider ein Fehler aufgetreten. Bitte lade die Seite neu und versuche es noch einmal.",
    },
    footer: {
      imprint: "Impressum",
      privacyNotice: "Datenschutzerklärung",
      licensedUnder: "Lizensiert unter AGPLv3",
      sourceCode: "Quellcode",
    },
    status: {
      autoLogout:
        "Du wurdest automatisch ausgeloggt. Zum Weiterarbeiten bitte erneut einloggen.",
      loginAgain: "Erneut einloggen",
    },
  },
  navigation: {
    employees: "Mitarbeiter",
    administration: "Administration",
  },
  pages: {
    login: {
      title: "Login",
      subtitle: '',
      username: {
        label: "Anmeldename",
        placholder: "vorname.nachname",
      },
      password: {
        label: "Passwort",
      },
      action: {
        login: "Login",
        logout: "Logout",
      },
    },
    home: {
      navigation: {
        title: "Startseite",
      },
      cards: {
        shop: {
          title:
            "Herzlich willkommen zur Bedarfsmeldung des ›Weiten Feldes‹",
          subtitle:
            'Hier kannst Du Deine <a href="/#/shop">Bedarfsmeldung</a> abgeben.',
          offers: "{offers} € erreichtes wöchentliches Budget",
          food: "{food} % verteilte Nahrungsmittel",
          action: "Zur Bedarfsmeldung",
        },
        list: {
          title: "Packzettel / Lieferschein für",
          subtitle: "KW {kw}",
          text: "Hier erscheinen zu gegebener Zeit die Lebensmittel, die Du entsprechend Deiner Bedarfsmeldung in Deinem Depot abholen werden kannst.",
          shipment: "Nach der Bedarfsmeldung gibt es ab {from}",
          additionalShipment: "Zusätzlich gibt es:",
          seasonBefore: "Der Zyklus ist zur Zeit noch nicht aktiv.",
        },
      },
    },
    shop: {
      navigation: {
        title: "Bedarfsmeldung",
      },
      cards: {
        header: {
          hello: "Bedarf melden!",
          depot: "Lieferung an:",
          openingHours: "Abholzeiten:",
          explaination:
          "Die von Dir für ein Lebensmittel eingegebene Menge bezieht sich immer auf eine Verteilungswoche. Wie oft das Lebensmittel innerhalb des Planungszeitraums verteilt werden soll, wird durch die Zahl neben dem LKW angegeben. Achtung: Es handelt sich um eine Planung. Das Wetter und die verfügbaren Ressourcen auf dem ›Weiten Feld‹ schaffen ihre eigene Realität. CSA heißt - Wir teilen das Anbaurisiko.<br/>Wenn die Anzahl der Verteilungen (LKW-Symbol) auf 0 gesetzt wurde, dann war die Wirtschaftlichkeit möglicher Weise nicht gegeben oder uns stehen nicht genug Ressourcen zur Verfügung. Es sind dann keine Verteilungen mehr geplant. In der Plantage ist es nicht vorgesehen, Lebensmittel nach der Bedarfsmeldung zu löschen. Dein Richtwert berücksichtigt aber nur Lebensmittel, für die wir abschließend eine Verteilung geplant haben. Vergiss nicht, Deinen finanziellen Beitrag entsprechend anzupassen!",
          faq: "Informationen und Grundlagen",
          orderDuringSeason:
            "Für Ernteteiler, die erst während des Zylkus dazustoßen und die daher nicht die vollen zwölf Monate dabei sind, wird zusätzlich angezeigt, wieviel eines Produkts bereits verteilt wurde (hellgraues Lastwagensymbol mit Prozentangabe). Bei der Berechnung des Richtwertes sind die bereits verteilten Produkte bereits herausgerechnet.",
        },
        products: {
          title: "Bedarfsmeldung",
          msrp: "Dein Richtwert: **{total} € pro Monat**",
          msrpSelfgrown: "{selfgrown} € für selbst angebaute Produkte",
          msrpCooperation: "{cooperation} € für Kooperationsprodukte",
          msrpCompensation:
            "{compensation} € Differenz für Verringerung selbst angebauter Produkte",
          msrpTooltip:
            "Der Richtwert errechnet sich aus den von Dir gewählten Lebensmitteln sowie Mengen und entspricht dem durchschnittlichen Solawi-Beitrag für Deine Auswahl.",
          msrpCompensationTooltip:
            "Ausgleichsbeitrag, da die Verringerung des Gemüses aus Eigenanbau nicht auf eine Erhöhung der Kooperationsprodukte angerechnet werden kann",
          offer: "Dein gewählter Beitrag:",
          item: {
            freq: "{freq} vorraussichtliche Häufigkeit (in Wochen)",
            deliveryPercentage:
              "{percent} % der geplanten Lieferungen sind bereits erfolgt",
            stock: "{stock} % verteilt",
            value: "Menge [{unit}]",
            oldValue: "Menge vorher [{unit}]",
          },
        },
      },
      dialog: {
        title: "Bedarfsmledung",
        alert: {
          title: "Wichtige Eingabehinweise",
          text: '<p class="my-2"> In Abhängigkeit davon, was Du eingibst, erscheinen möglicherweise zusätzliche Eingabefelder.</p> <p class="mb-2">Bitte fülle alle Eingabefelder, auch die gegebenenfalls zusätzlich erscheinenden, aus und stimme den Bedingungen am Ende dieses Formulars zu. Erst wenn diese Voraus­setzungen erfüllt sind, wird der »Speichern«-Button aktiviert.</p><p>Danke!</p>',
        },
        offer: {
          label: "Finanzieller Beitrag pro Monat [€]",
          hint: "Mindestwert für Deinen finanziellen Beitrag: {msrp}€. Wird dieser unterschritten ist es nicht möglich deine Bedarfsmeldung zu speichern",
          lowOfferHint: "Begründung für Deinen Solawi-Beitrag erforderlich",
        },
        offerReason: {
          label: "Warum möchtest Du weniger zahlen?",
          hint: "Bitte gib an, warum Du weniger als den Richtwert zahlen möchtest.",
        },
        depot: {
          label: "Depot (Abholstation)",
          hint: "Bitte wähle ein Depot.",
        },
        alternateDepot: {
          label: "Ausweichdepot",
          hint: "Das Ausweichdepot wird genutzt wenn die erste Wahl überfüllt ist.",
        },
        category: {
          label: "Art deiner Mitgliedschaft",
        },
        categoryReason: {
          label: "Wie möchtest Du mitarbeiten?",
          hint: "Bitte gib an, wie Du mitarbeiten möchtest.",
        },
        confirm: {
          title: "Deine Zustimmung zu den Bedingungen",
          label:
          "Ich habe die »Fragen & Antworten« (F&A) gelesen. Mir ist bewusst, dass meine Bedarfsmeldung bis zum Beginn der Beitragsrunde unverbindlich bleibt und jederzeit änderbar ist. Erst mit Beginn der Beitragsrunde werden meine zuletzt ausgewählten Lebensmittel und Mengen sowie mein finanzieller Beitrag verbindlich. Ich verpflichte mich, mit meinem verbindlichen finanziellen Beitrag für den gesamten Zyklus {season} das ›Weite Feld‹ mitzufinanzieren.",
        },
        confirmContribution: {
          title: "Bestätigung deines Mitgliedschaftsmodells als {model}",
          label:
            "Ich habe zur Kenntnis genommen, dass es für eine gut funktionierende Solawi essentiell ist, die mit meiner Mitgliedschaft verbundenen Mitarbeitsstunden zu erfüllen und dies zu dokumentieren. Die Bedingungen der Beteiligung und Konsequenzen bei fehlender Beteiligung und Dokumentation sind mir bewusst.",
        },
        confirmPaymentMethod: {
          title: "Bitte wähle eine Zahlungsmethode:",
          subtitleModificationOrder: "",
          subtitleNewOrder:
            "(Diese Angabe ist optional, hilft uns aber sehr bei der organisatorischen Abwicklung.)",
        },
        confirmSepaUpdate: {
          title: "Bestätigung der SEPA-Lastschrift",
          labelModificationOrder:
            "Ich ermächtige den {organization.name}, ab {from} bis {to} den monatlichen Beitrag in Höhe von {total}€ (statt bisher {previousOffer}€) per SEPA-Lastschrift von meinem Konto einzuziehen.",
          labelNewOrder:
            "Ich ermächtige den {organization.name}, ab {from} bis {to} den monatlichen Beitrag in Höhe von {total}€ per SEPA-Lastschrift von meinem Konto einzuziehen.",
        },
        confirmBankTransfer: {
          title: "Bestätigung der Überweisung",
          labelModificationOrder:
            "Ich überweise den zusätzlichen Gesamtbetrag von {difference}€ bis zum {date} auf folgendes Konto:",
          labelNewOrder:
            "Ich überweise den Jahresgesamtbetrag von {difference}€ bis zum {date} auf folgendes Konto:",
          referenceModificationOrder:
            "Verwendungszweck: Bedarfsanpassung {userName}",
          referenceNewOrder: "Verwendungszweck: Jahresbeitrag {userName}",
        },
        depotNote: {
          title: "Hinweis zu Depots mit (*)",
          show: "Anzeigen",
          paragraphs: [
            "Depots, die mit einem Sternchen (*) gekennzeichnet sind, befinden sich aktuell noch in der Planungs- und Abstimmungsphase. Es kann daher sein, dass diese Depots zu Beginn des Zylkus noch nicht verfügbar sind.",
            "Solltest Du eines dieser Depots wählen, könnte es notwendig sein, dass Du Dein Gemüse doch in einem anderen Depot abholen musst. Wir informieren Dich rechtzeitig und geben unser Bestes, die Planung so schnell wie möglich abzuschließen, damit alle gelisteten Depots nutzbar werden. Bitte gib daher ein zweites Wunschdepot an, welches kein Sternchen hat.",
            "Wenn du die Depotkoordination in deinem Wunschdepot unterstützen möchtest, leistest du einen wertvollen Beitrag zur Sicherstellung des Depots. Melde dich hierfür gern im Forum bei {forumContact} oder bei der Mitgliederbetreuung unter {email}.",
          ],
        },
        sendConfirmationEmail: {
          title:
            "Eine Kopie der Bedarfsmeldung an meine hinterlegte E-Mail-Adresse schicken.",
          notAvailable:
            "E-Mail-Versand nicht möglich, da für dein Konto keine E-Mail-Adresse hinterlegt ist.",
        },
        action: {
          faq: "Informationen & Grundlagen",
        },
        missingFields: "Bitte fülle alle erforderlichen Felder aus.",
      },
      messages: {
        newOfferLowerThanPreviousOffer:
          "Der neue Solawi-Beitrag darf nicht geringer sein als der alte",
      },
    },
    faq: {
      title: "Informationen und Grundlagen",
      navigation: {
        title: "Informationen & Grundlagen",
      },
    },
    user: {
      title: "Benutzer",
      navigation: {
        subtitle: "Admin",
      },
      filter: {
        label: "Filter",
      },
      sort: {
        label: "Sortierung",
        alpha_up: "Alphabetisch \u2191",
        alpha_down: "Alphabetisch \u2193",
      },
      action: {
        createUser: "Benutzer",
      },
      dialog: {
        title: "Benutzer Profil",
        name: "Name",
        password: "Passwort",
        role: "Role",
        orderValidFrom: "Fr. vor 1. Liefertag",
      },
    },
    shipment: {
      title: "Verteilungen",
      navigation: {
        subtitle: "Mitarbeiter",
      },
      action: {
        createShipment: "Verteilung",
        createForecastShipment: "Prognose-Verteilung",
        createShipmentItem: "Verteilung",
        createAdditionalShipmentItem: "Verteilung",
      },
      dialog: {
        title: "Verteilung",
      },
      types: {
        [ShipmentType.NORMAL]: "Standard",
        [ShipmentType.DRAFT]: "Entwurf",
        [ShipmentType.FORECAST]: "Prognose",
      },
    },
    product: {
      title: "Lebensmittel",
      subtitle: "Beiträge: {offers} €",
      navigation: {
        subtitle: "Admin",
      },
      item: {
        subtitle: "Umsatz (Gesamt): {msrp} €",
      },
      action: {
        createProductCategory: "Produktkategorie",
        createProduct: "Produkt",
        editProductCategory: "Einstellungen",
      },
      dialog: {
        productCategory: "Produktkategorie",
        product: "Produkt",
        name: "Name",
        active: "Aktiv",
        productCategoryType: "Art der enthaltenen Produkte",
        sold: "Verkauft [{unit}]",
        delivered: "Geliefert",
        deliveries: "Lieferungen an Depots",
        description: "Beschreibung",
        msrp: "Richtwert [ct/{unit}]",
        msrpHint: "Der Wert gilt für engagierte Mitglieder",
        frequency: "Verteilhäufigkeit",
        quantity: "Gesamtmenge [{unit}]",
        quantityMin: "Menge (min) [{unit}]",
        quantityMax: "Menge (max) [{unit}]",
        quantityStep: "Menge (Stückelung) [{unit}]",
      },
    },
    applicants: {
      title: "Registrierte Nutzer",
      navigation: {
        subtitle: "Admin",
      },
      state: "Status",
      options: {
        new: "Neu",
        deleted: "Gelöscht",
        confirmed: "Bestätigt",
      },
      hint: "GELÖSCHT",
      deleteConfirmation:
        "Bitte bestätigen, dass die persönlichen Daten des Nutzers {realName} gelöscht werden sollen. Dabei bleibt die LW-Nummer {name} und potentiell vorhandenen Bestellungen in der Datenbank erhalten.",
    },
    depots: {
      title: "Depots",
      navigation: {
        subtitle: "Admin",
      },
      action: {
        createDepot: "Depot",
      },
      dialog: {
        title: "Depot",
        name: "Name",
        adress: "Adresse",
        openingHours: "Abholzeiten",
        comment: "Kommentar",
        capacity: "Kapazität",
      },
    },
    config: {
      title: "Konfiguration",
      subtitle:
        "Hier können Einstellungen für die jeweils ausgewählten Zylkus vorgenommen werden.",
      navigation: {
        subtitle: "Admin",
      },
      name: "Bezeichnung",
      public: {
        yes: "Veröffentlicht: für alle Benutzer sichtbar",
        no: "Nicht veröffentlicht: sichtbar nur für Administratoren und Mitarbeiter",
      },
      validity: {
        title: "Zeitraum des Zylkus",
        description:
          "Gültigkeitszeitraum des Zylkus. Üblicherweise 12 Monate vom 1.4. eines Jahres bis zum 31.3. des Folgejahres.",
      },
      bidding: {
        title: "Bedarfsanmeldung und Bieterrunde",
        description:
          "Festlegung ab wann Nutzer ihren Bedarf für den Zylkus anmelden können (Start der Bedarfsanmeldung). Ab dem Zeitpunkt der Bieterrunde kann der Bedarf nur noch nach oben angepasst werden. Zum Ende der Bieterrunde wird der Bedarf verbindlich.",
      },
      startOrder: "Start der Bedarfsmeldung",
      startBiddingRound: "Start der Beitragsrunde",
      endBiddingRound: "Ende der Beitragsrunde",
      budget: "Budget [€]",
      validFrom: "Start des Zylkus",
      validTo: "Ende des Zylkus",
      newSeason: {
        title: "Neuen Zyklus anlegen",
        copyFromPrevious: "Kopiere Produktkonfiguration von vorherigem Zyklus",
      },
    },
    content: {
      title: "Text",
      navigation: {
        subtitle: "Admin",
      },
      pageTitle: "Textelemente",
      maintenanceMessage: {
        title: "Wartungshinweis",
        description:
          "Ein hier festgelegter Text wird allen Benutzern angezeigt",
        enabled: "Wartungshinweis aktiv!",
        disabled: "Aktuell kein Wartungshinweis aktiv",
      },
      imprint: "Impressum",
      privacyNotice: "Datenschutzerklärung",
      faq: "Informationen & Grundlagen",
      action: "Textbaustein hinzufügen",
      organizationInfo: "Organisation",
      pdf: "PDF",
      email: "E-Mail",
      general: "Allgemein",
      pageElements: "Seitenelemente",
      dialog: {},
    },
    overview: {
      title: "Übersicht",
      navigation: {
        subtitle: "Admin",
      },
      text: 'Bei Klick auf "Übersicht herunterladen" wird eine aktuelle Übersicht der Bedarfsmeldung als csv heruntergeladen und generiert. Das kann eine Weile dauern und sollte mit Rücksicht auf die Nutzer nicht zur Hauptnutzungszeit erfolgen.',
      action: "Übersicht Herunterladen",
      documents: {
        user: {
          description: "Dein angemeldeter Bedarf für die Solawi-{season}",
        },
        depot: {
          description: "Angemeldeter Bedarf für die Solawi-{season}",
        },
      },
    },
    statistics: {
      title: "Statistiken",
      tabs: {
        products: "Produkte",
        orders: "Bedarfsanmeldungen",
        map: "Karte",
      },
      navigation: {
        subtitle: "Admin",
      },
      productsCard: {
        title: "Produkte nach monatlichem Umsatz",
        text: "In Bedarfsmeldungen enthaltene Produkte mit durchschnittlichem Monatsumsatz in Klammern.",
      },
      ordersCard: {
        title: "Bedarfsanmeldungen in der gewählten",
        text: "Alle Bedarfsanmeldung, die für den gewählten Zyklus relevant sind.",
        distributions: "Verteilungen",
      },
    },
  },
  components: {
    seasonSelector: {
      label: "Zyklus",
      description:
        "Hier kannst du festlegen, für welchen Zyklus du deinen Bedarf anmelden und Einstellungen vornehmen möchtest.",
      notYetAvailable:
        "Hier kann den nächsten Zyklus für die Bedarfsmeldung ausgewählt werden, sobald diese freigeschaltet wurde.",
    },
  },
  email: {
    orderConfirmation: {
      subject:
        "Bestätigung Deiner Bedarfsmeldung für die {season} (Stand {now})",
      changingUserNote: "Hinweis: Änderung wurde vorgenommen durch {userName}",
      disclaimer: "Diese E-Mail wurde automatisiert erstellt",
      defaultOrderConfirmationFullSeason: [
        "Liebe(r) {userName},",

        "vielen Dank für Deine Bedarfsmeldung für den Zyklus {season} im {solawiName}. Deine Angaben wurden erfolgreich gespeichert.",

        "Im Anhang befindet sich ein PDF-Dokument mit einer Übersicht der von Dir angemeldeten Mengen für Gemüse und Kooperationsprodukte für den kommenden Zyklus. Der Zyklus startet am {seasonStart} und endet am {seasonEnd}.",

        "Beim Speichern der Bedarfsmeldung hast Du bestätigt, dass Du die „[Grundlagen und Informationen]({appUrl}/#/faq)“ der Solawi gelesen und verstanden hast. Sollten dennoch Unklarheiten bestehen, kannst Du Dich bei Rückfragen jederzeit an die Mitgliederbetreuung unter {solawiEmail} wenden.",

        "Besonders wichtig bei den „[Grundlagen und Informationen]({appUrl}/#/faq)“ sind die Abschnitte zur Verbindlichkeit und den Bedingungen der Bedarfsmeldung:",

        "**Verbindlichkeit Deiner Bedarfsmeldung:**",

        "Solange die Anmeldefrist für die laufende Bieterunde (auf der [Home-Seite der Bedarfsmeldung]({appUrl}/) sichtbar) noch nicht verstrichen ist, bleiben Deine angemeldeten Bedarfsmengen unverbindlich. Das heißt, Du kannst diese jederzeit bis zum Ende der Anmeldefrist ändern, also sowohl Deine Nahrungsmittelmengen als auch Deinen Solawi-Beitrag nach oben oder unten justieren. In folgenden Bieterunden, mit verlängerten Anmeldefristen, kannst Du Deinen Solawi-Beitrag ausschließlich nach oben justieren.",

        "Mit Ablauf der Anmeldefrist wird der zuletzt von Dir gespeicherte Stand Deiner Bedarfsmeldung verbindlich. In diesem Moment gehst Du automatisch eine rechtsverbindliche Zusage mit dem Träger des Solawi-Projektes ein, woran Du bis zum Ende des Zyklus gebunden bist.",

        "**Diese Bedingungen akzeptierst Du mit der Anmeldung Deines Bedarfs:**",

        "Du trägst das Ernterisiko für den Zyklus {season} (vom {seasonStart} bis zum {seasonEnd}) gemeinsam mit allen anderen Solawi-Mitgliedern.",

        "Dafür kannst Du die von Dir als Bedarf angemeldeten Nahrungsmittel in dem von Dir gewählten Depot abholen (8). Dir ist dabei bewusst, dass die Häufigkeit der Verteilung je Gemüse erntebedingt schwanken kann. Du trägst sowohl Überschüsse als auch Mindererträge mit.",

        "Die Information zur voraussichtlichen Häufigkeit der Verteilung erhältst Du wöchentlich per E-Mail oder über die Seite der Bedarfsmeldung.",

        "Du kannst darauf vertrauen, dass das angebaute Gemüse höhere Ansprüche erfüllt, als es die EU-Bio-Verordnung verlangt, das Gemüse zu Deiner nährstoff- sowie vitaminreichen Ernährung beiträgt und der genutzte Boden – gemäß dem Leitbild dieses Solawi-Projektes – ökologisch, naturnah, schonend bewirtschaftet und gepflegt wird. Die Pflege der organischen Bodensubstanz (wie Bodenlebewesen, Humus) und die Förderung der Artenvielfalt ist dabei wichtig.",

        "Für die Dauer des Zyklus zahlst Du Deinen monatlichen Solawi-Beitrag, oder zahlst die Gesamtsumme aller Monatsbeiträge im Voraus zu Beginn des Zyklus.",

        "Du verpflichtest Dich, die mit der Wahl Deiner Art der Mitgliedschaft einhergehenden Bedingungen einzuhalten:",

        "* **stilles Mitglied** | keine Mitarbeit\n* **aktives Mitglied** | Mitarbeit mindestens 5 h/Monat\n* **engagiertes Mitglied** | Mitarbeit mindestens 10 h/Monat",

        "Dir ist bewusst, dass bei mangelnder Beteiligung oder fehlendem Nachweis der im Rahmen Deiner Art der Mitgliedschaft zugesicherten Stunden, der entsprechende Ausgleich nachgezahlt werden muss. Diese Zahlung ist nach Aufforderung durch die Solawi entweder als Einmalzahlung zu erstatten, oder Du erteilst Deine Zustimmung für den Einzug des entsprechend höheren Monatsbeitrags für den Rest des Zyklus.",

        "**Folgende Angaben sind auf Grundlage deiner Bedarfsmeldung bei uns hinterlegt:**",

        "* Benutzername: {userId}\n* Monatlicher Beitrag: {offer}\n* Mitgliedschaftsmodell: {contributionModel}\n{contributionKindBulletPoint}* Bestellte Lebensmittel und Depot: siehe PDF im Anhang",

        "Vielen Dank für Deine Unterstützung des {solawiName} und das Engagement für eine nachhaltige und faire Landwirtschaft.",

        "Viele Grüße",

        "Dein {solawiName}",
      ],
      defaultOrderConfirmationChangedOrder: [
        "Liebe(r) {userName},",

        "vielen Dank für die Änderung Deiner Bedarfsanmeldung für die {season} im {solawiName}. Deine Angaben wurden erfolgreich gespeichert.",

        "Im Anhang befindet sich ein PDF-Dokument mit einer Übersicht der von Dir angemeldeten Mengen für Gemüse und Kooperationsprodukte für den kommende Zyklus. Der Zyklus läuft vom {seasonStart} bis zum {seasonEnd}. Deine Änderung gilt ab {orderStartMonth}.",

        "Beim Speichern der Bedarfsmeldung hast Du bestätigt, dass Du die „[Grundlagen und Informationen]({appUrl}/#/faq)“ der Solawi gelesen und verstanden hast. Sollten dennoch Unklarheiten bestehen, kannst Du Dich bei Rückfragen jederzeit an die Mitgliederbetreuung unter {solawiEmail} wenden.",

        "Besonders wichtig bei den „[Grundlagen und Informationen]({appUrl}/#/faq)“ sind die Abschnitte zur Verbindlichkeit und den Bedingungen der Bedarfsmeldung:",

        "**Verbindlichkeit Deiner Bedarfsmeldung:**",

        "Solange die Anmeldefrist für die laufende Bieterunde (auf der [Home-Seite der Bedarfsanmeldung]({appUrl}/) sichtbar) noch nicht verstrichen ist, bleiben Deine angemeldeten Bedarfsmengen unverbindlich. Das heißt, Du kannst diese jederzeit bis zum Ende der Anmeldefrist ändern, also sowohl Deine Nahrungsmittelmengen als auch Deinen Solawi-Beitrag nach oben oder unten justieren. In folgenden Bieterunden, mit verlängerten Anmeldefristen, kannst Du Deinen Solawi-Beitrag ausschließlich nach oben justieren.",

        "Mit Ablauf der Anmeldefrist wird der zuletzt von Dir gespeicherte Stand Deiner Bedarfsanmeldung verbindlich. In diesem Moment gehst Du automatisch eine rechtsverbindliche Zusage mit dem Träger des Solawi-Projektes ein, woran Du bis zum Ende des Zyklus gebunden bist.",

        "**Diese Bedingungen akzeptierst Du mit der Anmeldung Deines Bedarfs:**",

        "Du trägst das Ernterisiko für die Solawi-{season} (vom {seasonStart} bis zum {seasonEnd}) gemeinsam mit allen anderen Solawi-Mitgliedern.",

        "Dafür kannst Du die von Dir als Bedarf angemeldeten Nahrungsmittel in dem von Dir gewählten Depot abholen (8). Dir ist dabei bewusst, dass die Häufigkeit der Verteilung je Gemüse erntebedingt schwanken kann. Du trägst sowohl Überschüsse als auch Mindererträge mit.",

        "Die Information zur voraussichtlichen Häufigkeit der Verteilung erhältst Du wöchentlich per E-Mail oder über die Seite der Bedarfsanmeldung.",

        "Du kannst darauf vertrauen, dass das angebaute Gemüse höhere Ansprüche erfüllt, als es die EU-Bio-Verordnung verlangt, das Gemüse zu Deiner nährstoff- sowie vitaminreichen Ernährung beiträgt und der genutzte Boden – gemäß dem Leitbild dieses Solawi-Projektes – ökologisch, naturnah, schonend bewirtschaftet und gepflegt wird. Die Pflege der organischen Bodensubstanz (wie Bodenlebewesen, Humus) und die Förderung der Artenvielfalt ist dabei wichtig.",

        "Du verpflichtest Dich, die mit der Wahl Deiner Art der Mitgliedschaft einhergehenden Bedingungen einzuhalten:",

        "* **stilles Mitglied** | keine Mitarbeit\n* **aktives Mitglied** | Mitarbeit mindestens 5 h/Monat\n* **engagiertes Mitglied** | Mitarbeit mindestens 10 h/Monat",

        "Dir ist bewusst, dass bei mangelnder Beteiligung oder fehlendem Nachweis der im Rahmen Deiner Art der Mitgliedschaft zugesicherten Stunden, der entsprechende Ausgleich nachgezahlt werden muss. Diese Zahlung ist nach Aufforderung durch die Solawi entweder als Einmalzahlung zu erstatten, oder Du erteilst Deine Zustimmung für den Einzug des entsprechend höheren Monatsbeitrags für den Rest des Zyklus.",

        "**Folgende Angaben sind auf Grundlage deiner geänderten Bedarfsanmeldung ab {orderStartMonth} bei uns hinterlegt:**",

        "* Benutzername: {userId}\n* Monatlicher Beitrag: {offer}\n* Mitgliedschaftsmodell: {contributionModel}\n{contributionKindBulletPoint}* Geltungsdauer: {orderValidMonths} Monate\n* Bestellte Lebensmittel und Depot: siehe PDF im Anhang",

        "Gewählte Zahlungsweise (falls sich Dein Monatsbeitrag geändert hat): {paymentMessage}",

        "Vielen Dank für Deine Unterstützung des {solawiName} und das Engagement für eine nachhaltige und faire Landwirtschaft.",

        "Viele Grüße",

        "Dein {solawiName}",
      ],
      contributionKindBulletPoint: "* Art der Mitarbeit: {contributionKind}\n",
    },
    passwordResetRequest: {
      subject: "Anfrage Passwort zurücksetzen",
      body: [
        "Liebe(r) {userName},",

        "auf {appUrl} wurde eine Anfrage zum Zurücksetzen deines Passworts eingereicht.",

        "<a href='{passwordResetLink}'>Klicke bitte auf diesen Link</a>, um ein neues Passwort zu vergeben.",

        "Falls die Anfrage nicht von Dir stammt, dann kannst du diese Nachricht ignorieren.",

        "Viele Grüße",

        "Dein {solawiName}",
      ],
    },
    passwordReset: {
      subject: "Das Passwort wurde zurückgesetzt",
      body: [
        "Liebe(r) {userName},",

        "dein Passwort wurde zurückgesetzt. Falls du das nicht warst, dann setze dein Passwort bitte neu.",

        "Viele Grüße",

        "Dein {solawiName}",
      ],
    },
  },
};

export const langOrganizationInfo: Record<OrganizationInfoKeys, string> = {
  appUrl: "URL",
  name: "Name des Vereins",
  "address.email": "E-Mail-Addresse",
  address: "Addresse",
  "address.name": "Name",
  "address.street": "Straße",
  "address.postalcode": "Postleitzahl",
  "address.city": "Stadt",
  "address.forumContact": "Forum-Kontakt",
  bankAccount: "Kontoverbindung",
};

export const langPdfTexts: Record<PdfTextsKeys, string> = {
  packagingListFooter: "Fußzeile im Lieferschein",
  packagingListHeader: "Kopfzeile im Lieferschein",
  packagingListDetailText: "Detailtext im Lieferschein",
};

export const langEmailTextLabels: Record<EmailTextsKeys, string> = {
  orderConfirmationFullSeason: "Bestätigungsmail für den gesamten Zyklus",
  orderConfirmationChangedOrder:
    "Bestätigungsmail für die geänderte Bedarfsmeldung",
};

export const langPageElementLabels: Record<PageElementKeys, string> = {
  homeMessage: "Nachricht auf der Home-Seite",
  shipmentMessage: "Allgemeine Nachricht auf der Verteilungsseite",
};
