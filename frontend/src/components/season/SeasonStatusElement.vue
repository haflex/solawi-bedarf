<!--
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
-->
<script setup lang="ts">
import { format } from "date-fns/format";
import { computed } from "vue";
import { SeasonPhase } from "@lebenswurzel/solawi-bedarf-shared/src/enum.ts";
import { useConfigStore } from "../../store/configStore";
import { interpolate } from "@lebenswurzel/solawi-bedarf-shared/src/lang/template.ts";
import { RequisitionConfig } from "@lebenswurzel/solawi-bedarf-shared/src/types";
import { useOrderStore } from "../../store/orderStore";

const props = defineProps<{
  phase: SeasonPhase;
  noButton?: boolean;
  alternativeConfig?: RequisitionConfig;
}>();

const configStore = useConfigStore();
const orderStore = useOrderStore();

const prettyDate = (date: Date) => {
  if (date) {
    return format(date, "dd.MM.yyyy");
  }
  return "?";
};

type VariantType = "elevated" | "outlined" | "plain";

export type SeasonStatusElement = {
  phase: SeasonPhase;
  title: string;
  description: string;
  dateBegin: Date;
  dateEnd: Date;
  color: string;
  variant: VariantType;
  icon: string;
  addGotoOrderButton: boolean;
};

const mustAddOrder = computed(() => {
  return !orderStore.modificationOrder;
});

const status = computed((): SeasonStatusElement => {
  const config = props.alternativeConfig ?? configStore.config;
  const startOrder = config?.startOrder!;
  const startBiddingRound = config?.startBiddingRound!;
  const endBiddingRound = config?.endBiddingRound!;
  const startSeason = config?.validFrom!;
  const endSeason = config?.validTo!;
  const elements = [
    {
      phase: SeasonPhase.FREE_ORDER,
      title: "Bedarf melden!",
      description:
        "Was soll auf deinem Teller landen? Unser Ziel: Anbauen nach Bedarf. Bevor wir wir aufs Feld gehen, benötigen wir Futter für die Planung. Bis zum {dateEnd} kannst du deinen Bedarf melden oder anpassen.",
      dateBegin: startOrder,
      dateEnd: startBiddingRound,
      addGotoOrderButton: true,
      variant: "elevated" as VariantType,
      color: "primary",
      icon: "mdi-cart",
    },
    {
      phase: SeasonPhase.INCREASE_ONLY,
      title: "Beitrag festlegen",
      description:
        "Was kannst du geben? Gemeinsam beschaffen wir die notwendigen Ressourcen (Geld / Zeit) für unsere kooperative Landwirtschaft. Wir haben den Aufwand für den gewählten Zeitraum anhand der gemeldeten Bedarfe eingeschätzt und ein Budget ermittelt. Der Richtwert basiert jetzt, im Vergleich zum Zeitpunkt der Bedarfsmeldung auf realistischen Einschätzungen." +
        (mustAddOrder.value
          ? " Bitte wende dich an die Mitgliederbetreung der Solawi, wenn du deine Bedarfsanmeldung anpassen möchtest."
          : ""),
      dateBegin: startBiddingRound,
      dateEnd: endBiddingRound,
      addGotoOrderButton: true,
      variant: "elevated" as VariantType,
      color: "primary",
      icon: "mdi-cart-arrow-up",
    },
    {
      phase: SeasonPhase.ORDER_CLOSED,
      title: "Bedarfsmeldung und Beitragsrunde abgeschlossen!",
      description:
        "Für den gewählten Zyklus können keine Änderungen vorgenommen werden. Kannst du es kaum erwarten? Schon bald kannst du hier den Packzettel oder Lieferschein einsehen, welche Ernte du in der jeweiligen Woche in Empfang nehmen wirst. Bis dahin kannst du in deiner 'Bedarfsmeldung' einsehen, was dich erwartet.",
      dateBegin: startBiddingRound,
      dateEnd: endBiddingRound,
      addGotoOrderButton: false,
      variant: "outlined" as VariantType,
      color: "grey",
      icon: "mdi-lock",
    },
    {
      phase: SeasonPhase.BEFORE_SEASON,
      title: "Zyklus beginnt bald",
      description: "Die Zyklus beginnt am {dateBegin}",
      dateBegin: startSeason,
      dateEnd: endSeason,
      addGotoOrderButton: false,
      color: "primary",
      variant: "outlined" as VariantType,
      icon: "",
    },
    {
      phase: SeasonPhase.ACTIVE_SEASON,
      title: "Dir Zyklus ist grade aktiv",
      description:
        "Von {dateBegin} bis {dateEnd} bekommst du jeden Donnerstag deinen angemeldeten Bedarf (je nach Verfügbarkeit) in dein Depot geliefert (siehe unten).",
      dateBegin: startSeason,
      dateEnd: endSeason,
      addGotoOrderButton: false,
      color: "primary",
      variant: "outlined" as VariantType,
      icon: "mdi-truck-delivery",
    },
    {
      phase: SeasonPhase.AFTER_SEASON,
      title: "Der Zyklus ist abgeschlossen",
      description:
        "Der gewählte Zyklus liegt in der Vergangenheit. Bitte wähle oben rechts einen anderen Zyklus aus.",
      dateBegin: startSeason,
      dateEnd: endSeason,
      addGotoOrderButton: false,
      color: "primary",
      variant: "outlined" as VariantType,
      icon: "mdi-alert-outline",
    },
  ];

  return elements.find((v) => v.phase === props.phase)!;
});
</script>

<template>
  <v-card
    :prepend-icon="status.icon"
    :color="status.color"
    :title="status.title"
    :variant="status.variant"
  >
    <v-card-text>
      {{
        interpolate(status.description, {
          dateBegin: prettyDate(status.dateBegin),
          dateEnd: prettyDate(status.dateEnd),
        })
      }}
      <p
        v-if="status.addGotoOrderButton && !props.noButton"
        class="justify-center d-flex"
      >
        <router-link to="/shop">
          <v-btn class="mt-4 my-1" color="secondary" variant="elevated">
            Zur Bedarfsanmeldung
          </v-btn>
        </router-link>
      </p>
    </v-card-text>
  </v-card>
</template>
