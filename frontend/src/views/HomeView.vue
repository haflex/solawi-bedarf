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
import { computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import HomeStatsCard from "../components/HomeStatsCard.vue";
import ShipmentCard from "../components/ShipmentCard.vue";
import { useBIStore } from "../store/biStore";
import { useConfigStore } from "../store/configStore.ts";
import { useUserStore } from "../store/userStore.ts";
import SeasonText from "../components/styled/SeasonText.vue";
import { getSeasonPhase } from "@lebenswurzel/solawi-bedarf-shared/src/util/configHelper.ts";
import SeasonStatusElement from "../components/season/SeasonStatusElement.vue";
import { SeasonPhase } from "@lebenswurzel/solawi-bedarf-shared/src/enum.ts";
import { useTextContentStore } from "../store/textContentStore.ts";

const configStore = useConfigStore();
const biStore = useBIStore();
const userStore = useUserStore();
const textContentStore = useTextContentStore();
const theme = useTheme();

onMounted(async () => {
  await configStore.update();
  await biStore.update(configStore.activeConfigId);
  await userStore.update();
});

const today = computed(() => new Date());

const phase = computed(() => {
  return getSeasonPhase(
    configStore.config!,
    today.value,
    userStore.currentUser?.active || false,
  );
});

const homeMessage = computed(() => {
  return textContentStore.getPageElement("homeMessage");
});

const isDarkTheme = computed(() => theme.global.current.value.dark);
</script>

<template>
  <v-card class="ma-2">
    <v-card-title>
      Herzlich Willkommen in der Plantage des ›Weiten Feldes‹ · Von der Planung bis zur Ernte!
    </v-card-title>
    <v-card-text>
      <ul>
        <li>Um welchen Zeitraum geht es Dir? Rechts oben kannst Du ihn auswählen. NEU: Ein Jahr hat für uns zukünftig 5 Zyklen mit jeweils 10 Wochen - mehr Flexibilität für Dich und uns! Ein Zyklus ist ein Zeitraum für Planung und Abrechnung.</li>
        <li>im Zeitraum der Bedarfsmeldung: Was soll auf Deinem Teller landen? Unser Ziel: Anbauen nach Bedarf. Der Richtwert ist aktuell nur eine grobe Schätzung. Bevor wir rechnen können, benötigen wir Futter für die Planung, also Deinen Bedarf.</li>
        <li>im Zeitraum der Beitragsrunde: Was kannst Du geben? Gemeinsam beschaffen wir die notwendigen Ressourcen (Geld / Zeit) für unsere kooperative Landwirtschaft. Wir haben den Aufwand für den gewählten Zeitraum geplant und ein Budget ermittelt. Der Richtwert basiert jetzt, im Vergleich zum Zeitpunkt der Bedarfsmeldung auf realistischen Einschätzungen.</li>
        <li>nach der Beitragsrunde und vor dem Verteilungszeitraum: Kannst Du es kaum erwarten? Schon bald kannst Du hier den Packzettel oder Lieferschein einsehen, welche Ernte Du in der jeweiligen Woche in Empfang nehmen wirst. Bis dahin kannst Du in der "Bedarfsmeldung" einsehen, was Dich erwartet.</li>
        <li>während des Verteilungszeitraumes: Was kommt diese Woche auf den Teller? Sobald der Lieferwagen das ›Weite Feld‹ verlässt, aktualisiert sich hier Dein Packzettel oder Lieferschein.</li>
        <li>Sofern Du Deine Ernte in einem Depot entgegennimmst, mache Dir bitte bewusst, dass Deine Zufriedenheit im direkten Zusammenhang mit der aller anderen steht (Prinzip: Verteilungsgerechtigkeit)</li>
      </ul>
    </v-card-text>
  </v-card>
  <v-card class="ma-2">

    <v-card-title>
      Information für den Zyklus
      <SeasonText />!
    </v-card-title>

    <v-card-subtitle>
      Ein Jahr hat für uns 5 Zyklen mit jeweils 10 Wochen - mehr Flexibilität für dich und uns!
      Ein Zyklus ist ein Zeitraum für Planung und Abrechnung.
    </v-card-subtitle>
    <v-card-text>
      <SeasonStatusElement
        :phase="phase.orderPhase"
        v-if="phase.seasonPhase != SeasonPhase.AFTER_SEASON"
      />
      <SeasonStatusElement :phase="phase.seasonPhase" class="mt-3" />
    </v-card-text>
  </v-card>
  <v-card
    v-if="homeMessage"
    class="ma-2"
    :class="isDarkTheme ? 'text-lime-darken-2' : 'text-grey-darken-2'"
    variant="elevated"
    :color="isDarkTheme ? 'grey-darken-3' : 'yellow-lighten-4'"
  >
    <v-card-text>
      <div v-html="homeMessage" />
    </v-card-text>
  </v-card>
  <ShipmentCard :season-phase="phase.seasonPhase" />
  <HomeStatsCard />
</template>
