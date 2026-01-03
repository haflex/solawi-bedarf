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
