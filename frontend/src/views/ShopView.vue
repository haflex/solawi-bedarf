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
import { computed, onMounted, provide, ref, watch } from "vue";
import { language } from "../../../shared/src/lang/lang.ts";
import { interpolate } from "../../../shared/src/lang/template.ts";
import ShopItem from "../components/ShopItem.vue";
import { useProductStore } from "../store/productStore.ts";
import { useUserStore } from "../store/userStore.ts";
import ShopDialog from "../components/ShopDialog.vue";
import { useOrderStore } from "../store/orderStore.ts";
import FAQDialog from "../components/FAQDialog.vue";
import { useBIStore } from "../store/biStore";
import { storeToRefs } from "pinia";
import { useConfigStore } from "../store/configStore.ts";
import SeasonText from "../components/styled/SeasonText.vue";
import { UserWithLastOrderChange } from "../../../shared/src/types.ts";
import { useRoute } from "vue-router";
import { router } from "../routes.ts";

const t = language.pages.shop;

const configStore = useConfigStore();
const productStore = useProductStore();
const userStore = useUserStore();
const orderStore = useOrderStore();
const biStore = useBIStore();

const { depot, msrp, submit } = storeToRefs(biStore);
const { userId } = storeToRefs(userStore);
const { productCategories } = storeToRefs(productStore);
const { activeConfigId, config } = storeToRefs(configStore);

const open = ref(false);
const faqOpen = ref(false);
const requestUserId = ref<number | undefined>(userStore.userId);
const requestUser = ref<UserWithLastOrderChange | undefined>(
  userStore.currentUser,
);
const canAdministerOtherUsers = computed(() => {
  return userStore.userOptions.length > 1;
});

const route = useRoute();

provide("requestUser", requestUser);

watch(userId, async () => {
  const paramUserId = parseUserIdParam();
  requestUserId.value = paramUserId ?? userId.value;
});

watch(
  () => route.params.userId,
  async () => {
    const newValue = parseUserIdParam();
    if (newValue) {
      requestUserId.value = newValue;
    }
  },
);

watch([requestUserId, configStore], async () => {
  if (requestUserId.value) {
    if (requestUserId.value !== userStore.currentUser?.id) {
      router.push({ path: `/shop/${requestUserId.value}` });
    } else {
      router.push({ path: `/shop/` });
    }
  }
  await refresh(true);
  requestUser.value = userStore.users.find(
    (user) => user.id == requestUserId.value,
  );
});

const onClose = async () => {
  open.value = false;
};

const onFaqClose = async () => {
  faqOpen.value = false;
};

const onSave = () => {
  open.value = true;
};

const parseUserIdParam = (): number | undefined => {
  const value = route.params.userId;
  if (canAdministerOtherUsers.value) {
    if (typeof value === "string") {
      const converted = parseInt(value);
      if (!Number.isNaN(converted)) {
        return converted;
      }
    }
  }
};

const refresh = async (keepUserId?: boolean) => {
  const userIdParam = parseUserIdParam();
  if (userIdParam && !keepUserId) {
    requestUserId.value = userIdParam;
  }
  if (requestUserId.value && activeConfigId.value != -1) {
    productStore.update(configStore.activeConfigId);
    biStore.update(configStore.activeConfigId);
    orderStore.update(requestUserId.value, activeConfigId.value);
  }
};
onMounted(refresh);
</script>

<template>
  <v-card class="ma-4">
    <v-card-title v-if="canAdministerOtherUsers">
      <v-select
        v-model="requestUserId"
        :items="userStore.userOptions"
      ></v-select>
    </v-card-title>
    <v-card-title v-else>
      {{ t.cards.header.hello }} {{ userStore.currentUser?.name }}
    </v-card-title>
    <v-card-subtitle v-if="depot" style="white-space: normal">
      {{ t.cards.header.depot }} <br /><br />
      {{ depot?.name }} <br />
      {{ depot?.address }} <br /><br />
      {{ t.cards.header.openingHours }} {{ depot?.openingHours }} <br />
      {{ depot?.comment }}
    </v-card-subtitle>
    <v-card-text>
      <p>
        Bitte wähle in den entsprechenden Kategorien die
        Lebensmittel (Gemüse, Eier, Backwaren, Getreide, Lupinenkaffee) aus, die Du in der Saison 
        2024/25 im Rahmen der solidarischen kooperativen Selbstversorgung vom ›Weiten Feld‹ beziehen 
        möchtest. Lege dafür Deine individuelle Menge
        je <u>geplanter</u> Verteilung
        <v-icon>mdi-truck-fast-outline</v-icon> fest. Bitte beachte die
        zusätzlichen Infor&shy;matio&shy;nen für manche Nahrungs&shy;mittel
        (abrufbar über das Information-Symbol
        <v-icon>mdi-information-outline</v-icon> hinter dem Namen des
        Lebensmittels) sowie den
        <a
          style="color: #6750a4; cursor: pointer"
          @click="() => (faqOpen = true)"
        >
          <u>Fragen & Antworten</u> (F&A) 
        </a>
        Bereich.
      </p><br />
      <p>
        Die <strong>infrastrukturelle Basis</strong>, wie Hof, Land, Anlagen und Maschinen, ist eine 
        wichtige Voraussetzung dafür, dass die Mitglieder des ›Weiten Feldes‹ überhaupt in den 
        Genuss von Ernte kommen. 
        Weil die Finanzierung der Infrastruktur eine besondere Herausforderung darstellt, zahlt jedes 
        Mitglied unabhängig vom individuellen Bedarf einen <strong>Sockelbeitrag von €50 im Monat</strong>.
      </p><br />
      <p>
        Wir haben mit dem ›Weiten Feld‹ viel vor und benötigen dafür Deine 
        Unterstützung. Darum haben wir uns entschieden, unser Angebot an das Leisten von 
        <strong>mindestens 24 Feldstunden je Saison</strong> zu knüpfen. Es gibt viele verschiedene 
        Möglichkeiten der Mitarbeit. Für jeden wird etwas passendes dabei sein, davon sind wir überzeugt.
      </p><br />
      <p>
        Sollte es dir nicht möglich sein, das ›Weite Feld‹ durch deine Zeit auf dem Acker, 
        in den verschiedenen Arbeitsgruppen, Ämtern oder Gremien zu unterstützen, kannst du als Ausgleich 
        unseren ideellen Bereich mit einer Spende von €24 je Feldstunde fördern. Der ideelle Bereich 
        umfasst den Natur- und Artenschutz, die Förderung der Biodiversität, die Erhaltung des 
        Kulturerbes, Natur- und Umweltbildung, Inklusion und Klimaschutz. Die Spenden werden 
        ausschließlich im ideellen Bereich verwendet. Sie werden nicht zur Subventionierung des Budgets 
        des ›Weiten Feldes‹ genutzt.
      </p>
    </v-card-text>
  </v-card>

  <v-card class="ma-4">
    <v-card-title>{{ t.cards.products.title }} für <SeasonText /></v-card-title>
    <v-card-subtitle class="text-wrap">
      {{
        interpolate(t.cards.products.msrp, {
          total: msrp.total.toString(),
          selfgrown: msrp.selfgrown.toString(),
          cooperation: msrp.cooperation.toString(),
        })
      }}
      <v-tooltip :text="t.cards.products.msrpTooltip">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information-outline</v-icon>
        </template>
      </v-tooltip>
      <br />
      {{
        interpolate(t.cards.products.offer, {
          offer: orderStore.offer.toString(),
        })
      }}
    </v-card-subtitle>
    <v-card-text>
      <v-expansion-panels class="pa-0">
        <v-expansion-panel
          v-for="category in productCategories"
          class="px-0"
          :key="category.id"
        >
          <v-expansion-panel-title>{{ category.name }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ShopItem
              v-for="product in category.products"
              class="px-0"
              :key="product.id"
              :user-id="userStore.currentUser!.id"
              :product-id="product.id"
            ></ShopItem>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-card-actions>
        <v-btn
          @click="
            requestUserId && orderStore.update(requestUserId, activeConfigId)
          "
          class="text-error"
          variant="outlined"
        >
          {{ language.app.actions.restore }}
        </v-btn>
        <v-btn
          @click="onSave"
          class="text-white bg-success"
          variant="elevated"
          :disabled="!submit"
        >
          {{ language.app.actions.save }}
        </v-btn>
      </v-card-actions>
    </v-card-actions>
  </v-card>
  <ShopDialog :open="open" @close="onClose" />
  <FAQDialog :open="faqOpen" @close="onFaqClose" />
</template>
