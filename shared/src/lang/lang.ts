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
import { ProductCategoryType, UserCategory, UserRole } from "../enum";

// info i: 24D8
// black truck: 26DF

export const language = {
  app: {
    title: "›Weites Feld‹",
    subtitle: "ehemals Schellehof GbR",
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
          title: "Fördermitglied im ideellen Bereich",
          subtitle: "finanzielle Unterstützung des ideellen Bereichs",
        },
        [UserCategory.CAT115]: {
          title: "aktives Mitglied",
          subtitle: "Mitarbeit ca. 2 Feldstunden/Monat",
        },
        [UserCategory.CAT100]: {
          title: "engagiertes Mitglied",
          subtitle:
            "Mitarbeit mindestens 10 h/Monat, (Orientierungswert mit ca. 15% Ermäßigung als Wertschätzung für zusätzliches Engagement)",
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
            'Am 17.02.2024 beginnt die <a href="/#/shop">Bedarfsmeldung</a>. Anschließend findet vom 04.03.2024 bis zum 10.03.2024 die Beitragsrunde (ehemals Geberrunde oder Bieterrunde) statt.<br/>In der Bedarfsmeldung stellst du deinen individuellen Ernteanteil zusammen. In der Beitragsrunde legst du fest, wie du das ›Weite Feld‹ mit Geld und Zeit unterstützen wirst.',
          offers: "{offers} € erreichtes monatliches Budget",
          food: "{food} % verteilte Nahrungsmittel aus Selbstanbau",
          action: "Zur Bedarfsmeldung",
        },
        list: {
          title: "Nahrungsmittel entsprechend Deiner Bedarfsmeldung für",
          detailText:
            "Bitte entnimm in deinem Depot genau die hier angegebenen Mengen. Diese berücksichtigen bereits mögliche Abweichungen in der Lieferung durch variierende Erntemengen.",
          subtitle: "KW {kw}",
          text: "Hier erscheinen ab der nächsten Saison 2024/25 wöchentlich die Lebensmittel, die Du entsprechend Deiner Bedarfsmeldung in Deinem Depot abholen kannst.",
          shipment: "Nach der Bedarfsmeldung gibt es:",
          additionalShipment: "Zusätzlich gibt es:",
        },
      },
    },
    shop: {
      navigation: {
        title: "Bedarfsmeldung",
      },
      cards: {
        header: {
          hello: "Hallo",
          depot: "Dein Depot:",
          openingHours: "Abholzeiten:",
          explaination:
          "Bitte wähle in den entsprechenden Kategorien die Lebensmittel (Gemüse, Eier, Backwaren, Getreide, Lupinenkaffee) aus, die Du in der Saison 2024/25 im Rahmen der solidarischen kooperativen Selbstversorgung vom ›Weiten Feld‹ beziehen möchtest. Lege dafür Deine individuelle Menge je <u>geplanter</u> Verteilung \u26df fest. Bitte beachte die zusätzlichen Infor&shy;matio&shy;nen für manche Nahrungs&shy;mittel (abrufbar über das Information-Symbol \u24d8 hinter dem Namen des Lebensmittels) sowie den",
          faq: "Informationen und Grundlagen",
        },
        products: {
          title: "Bedarfsmeldung",
          msrp: "Dein Richtwert: {total} € pro Monat",
          msrpTooltip:
          "Der Richtwert errechnet sich aus dem Sockelbeitrag und den von Dir gewählten Lebensmitteln und Mengen.",
          offer: "Dein finanzieller Beitrag: {offer} € pro Monat",
          item: {
            freq: "{freq} voraussichtliche Häufigkeit (in Wochen)",
            stock: "{stock} % verteilt",
            value: "Menge [{unit}]",
          },
        },
      },
      dialog: {
        title: "Bedarfsmledung",
        alert: {
          title: "Wichtige Eingabehinweise",
          text: '<p class="my-2">Bitte fülle alle Eingabefelder aus und stimme den Bedingungen am Ende dieses Formulars zu. Erst wenn diese Voraus&shy;setzungen erfüllt sind, wird der Speichern-Button aktiviert.</p><p>Danke!</p>',
        },
        offer: {
          label: "Finanzieller Beitrag pro Monat [€]",
          hint: "Mindestwert für Deinen finanziellen Beitrag: {msrp}€",
        },
        offerReason: {
          label: "Warum möchtest Du weniger zahlen?",
          hint: "Bitte gib an, warum Du weniger als den Richtwert zahlen möchtest.",
        },
        depot: {
          label: "Depot",
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
          "Ich habe die »Fragen & Antworten« (F&A) gelesen. Mir ist bewusst, dass meine Bedarfsmeldung bis zum Beginn der Beitragsrunde unverbindlich bleibt und jederzeit änderbar ist. Erst mit Beginn der Beitragsrunde werden meine zuletzt ausgewählten Lebensmittel und Mengen sowie mein finanzieller Beitrag verbindlich. Ich verpflichte mich, mit meinem verbindlichen finanziellen Beitrag für die gesamte Saison 2024/25 (12 Monate) das ›Weite Feld‹ mitzufinanzieren.",
        },
        confirmContribution: {
          title: "Bestätigung deines Mitgliedschaftsmodells als {model}",
          label:
            "Ich habe zur Kenntnis genommen, dass es für eine gut funktionierende Solawi essentiell ist, die mit meiner Mitgliedschaft verbundenen Mitarbeitsstunden zu erfüllen und dies zu dokumentieren. Die Bedingungen der Beteiligung und Konsequenzen bei fehlender Beteiligung und Dokumentation sind mir bewusst.",
        },
        depotNote: {
          title: "Hinweis zu Depots mit (*)",
          show: "Anzeigen",
          paragraphs: [
            "Depots, die mit einem Sternchen (*) gekennzeichnet sind, befinden sich aktuell noch in der Planungs- und Abstimmungsphase. Es kann daher sein, dass diese Depots zu Beginn der Saison noch nicht verfügbar sind.",
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
        createShipmentItem: "Verteilung",
        createAdditionalShipmentItem: "Verteilung",
      },
      dialog: {
        title: "Verteilung",
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
        "Hier können Einstellungen für die jeweils ausgewählte Saison vorgenommen werden.",
      navigation: {
        subtitle: "Admin",
      },
      name: "Bezeichnung",
      public: {
        yes: "Veröffentlicht: für alle Benutzer sichtbar",
        no: "Nicht veröffentlicht: sichtbar nur für Administratoren und Mitarbeiter",
      },
      startOrder: "Start der Bedarfsmeldung",
      startBiddingRound: "Start der Beitragsrunde",
      endBiddingRound: "Ende der Beitragsrunde",
      budget: "Budget [€]",
      validFrom: "Start der Saison",
      validTo: "Ende der Saison",
      newSeason: {
        title: "Neue Saison anlegen",
        copyFromPrevious: "Kopiere Produktkonfiguration von vorheriger Saison",
      },
    },
    content: {
      title: "Text",
      navigation: {
        subtitle: "Admin",
      },
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
      navigation: {
        subtitle: "Admin",
      },
      productsCard: {
        title: "Produkte nach monatlichem Umsatz",
        text: "In Bedarfsmeldungen enthaltene Produkte mit durchschnittlichem Monatsumsatz in Klammern.",
      },
    },
  },
  components: {
    seasonSelector: {
      label: "Saison-Auswahl",
      description:
        "Hier kannst du festlegen, für welche Saison du deinen Bedarf anmelden und Einstellungen vornehmen möchtest.",
      notYetAvailable:
        "Hier kann die nächste Saison für die Bedarfsmeldung ausgewählt werden, sobald diese freigeschaltet wurde.",
    },
  },
  email: {
    orderConfirmation: {
      subject:
        "Bestätigung Deiner Bedarfsmeldung für die {season} (Stand {now})",
      changingUserNote: "Hinweis: Änderung wurde vorgenommen durch {userName}",
      disclaimer: "Diese E-Mail wurde automatisiert erstellt",
      body: [
        "Liebe(r) {userName},",

        "vielen Dank für Deine Bedarfsmeldung für die {season} im {solawiName}. Deine Angaben wurden erfolgreich gespeichert.",

        "Im Anhang befindet sich ein PDF-Dokument mit einer Übersicht der von Dir angemeldeten Mengen für Gemüse und Kooperationsprodukte für die kommende Saison. Die Saison startet am {seasonStart} und endet am {seasonEnd}.",

        "Beim Speichern der Bedarfsmeldung hast Du bestätigt, dass Du die „[Grundlagen und Informationen]({appUrl}/#/faq)“ der Solawi gelesen und verstanden hast. Sollten dennoch Unklarheiten bestehen, kannst Du Dich bei Rückfragen jederzeit an die Mitgliederbetreuung unter {solawiEmail} wenden.",

        "Besonders wichtig bei den „[Grundlagen und Informationen]({appUrl}/#/faq)“ sind die Abschnitte zur Verbindlichkeit und den Bedingungen der Bedarfsmeldung:",

        "**Verbindlichkeit Deiner Bedarfsmeldung:**",

        "Solange die Anmeldefrist für die laufende Bieterunde (auf der [Home-Seite der Bedarfsmeldung]({appUrl}/) sichtbar) noch nicht verstrichen ist, bleiben Deine angemeldeten Bedarfsmengen unverbindlich. Das heißt, Du kannst diese jederzeit bis zum Ende der Anmeldefrist ändern, also sowohl Deine Nahrungsmittelmengen als auch Deinen Solawi-Beitrag nach oben oder unten justieren. In folgenden Bieterunden, mit verlängerten Anmeldefristen, kannst Du Deinen Solawi-Beitrag ausschließlich nach oben justieren.",

        "Mit Ablauf der Anmeldefrist wird der zuletzt von Dir gespeicherte Stand Deiner Bedarfsmeldung verbindlich. In diesem Moment gehst Du automatisch eine rechtsverbindliche Zusage mit dem Träger des Solawi-Projektes ein, woran Du bis zum Ende der Solawi-Saison am 31.03. des Folgejahres gebunden bist.",

        "**Diese Bedingungen akzeptierst Du mit der Anmeldung Deines Bedarfs:**",

        "Du trägst das Ernterisiko für die Solawi-{season} (vom {seasonStart} bis zum {seasonEnd}) gemeinsam mit allen anderen Solawi-Mitgliedern.",

        "Dafür kannst Du die von Dir als Bedarf angemeldeten Nahrungsmittel in dem von Dir gewählten Depot abholen (8). Dir ist dabei bewusst, dass die Häufigkeit der Verteilung je Gemüse erntebedingt schwanken kann. Du trägst sowohl Überschüsse als auch Mindererträge mit.",

        "Die Information zur voraussichtlichen Häufigkeit der Verteilung erhältst Du wöchentlich per E-Mail oder über die Seite der Bedarfsmeldung.",

        "Du kannst darauf vertrauen, dass das angebaute Gemüse höhere Ansprüche erfüllt, als es die EU-Bio-Verordnung verlangt, das Gemüse zu Deiner nährstoff- sowie vitaminreichen Ernährung beiträgt und der genutzte Boden – gemäß dem Leitbild dieses Solawi-Projektes – ökologisch, naturnah, schonend bewirtschaftet und gepflegt wird. Die Pflege der organischen Bodensubstanz (wie Bodenlebewesen, Humus) und die Förderung der Artenvielfalt ist dabei wichtig.",

        "Für die Dauer der Solawi-Saison zahlst Du Deinen monatlichen Solawi-Beitrag, oder zahlst die Gesamtsumme aller Monatsbeiträge im Voraus zu Beginn der Saison.",

        "Du verpflichtest Dich, die mit der Wahl Deiner Art der Mitgliedschaft einhergehenden Bedingungen einzuhalten:",

        "* **stilles Mitglied** | keine Mitarbeit\n* **aktives Mitglied** | Mitarbeit mindestens 5 h/Monat\n* **engagiertes Mitglied** | Mitarbeit mindestens 10 h/Monat",

        "Dir ist bewusst, dass bei mangelnder Beteiligung oder fehlendem Nachweis der im Rahmen Deiner Art der Mitgliedschaft zugesicherten Stunden, der entsprechende Ausgleich nachgezahlt werden muss. Diese Zahlung ist nach Aufforderung durch die Solawi entweder als Einmalzahlung zu erstatten, oder Du erteilst Deine Zustimmung für den Einzug des entsprechend höheren Monatsbeitrags für den Rest der Saison.",

        "**Folgende Angaben sind auf Grundlage deiner Bedarfsmeldung bei uns hinterlegt:**",

        "* Benutzername: {userId}\n* Monatlicher Beitrag: {offer}\n* Mitgliedschaftsmodell: {contributionModel}\n{contributionKindBulletPoint}* Bestellte Lebensmittel und Depot: siehe PDF im Anhang",

        "Vielen Dank für Deine Unterstützung des {solawiName} und das Engagement für eine nachhaltige und faire Landwirtschaft.",

        "Viele Grüße",

        "Dein {solawiName}",
      ],
      contributionKindBulletPoint: "* Art der Mitarbeit: {contributionKind}\n",
    },
  },
};
