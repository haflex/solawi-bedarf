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
import { computed, onMounted, ref } from "vue";
import { language } from "@lebenswurzel/solawi-bedarf-shared/src/lang/lang.ts";
import {
  Msrp,
  SavedOrder,
} from "@lebenswurzel/solawi-bedarf-shared/src/types.ts";
import { getAllOrders } from "../../requests/shop.ts";
import { useConfigStore } from "../../store/configStore.ts";
import { useUserStore } from "../../store/userStore.ts";
import { UserCategory } from "@lebenswurzel/solawi-bedarf-shared/src/enum.ts";
import { storeToRefs } from "pinia";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import DistributionPlot, {
  DistributionData,
  DistributionDataItem,
} from "./DistributionPlot.vue";
import SeasonText from "../styled/SeasonText.vue";
import {
  //calculateEffectiveOrderValidMonths,
  getMsrp,
} from "@lebenswurzel/solawi-bedarf-shared/src/msrp.ts";
import { useBIStore } from "../../store/biStore.ts";
import { useVersionInfoStore } from "../../store/versionInfoStore.ts";
import { addWeeks, getWeekNumber, addDays, countCalendarWeeks } from "@lebenswurzel/solawi-bedarf-shared/src/util/dateHelper.ts";

const t = language.pages.statistics;
const userStore = useUserStore();
const configStore = useConfigStore();
const { depots } = storeToRefs(configStore);
const biStore = useBIStore();
const versionInfoStore = useVersionInfoStore();

interface OrderExt extends SavedOrder {
  userName: string;
  depotName: string;
  msrp: Msrp;
  validWeeks: number;
}

interface OrdersGroupedByWeek {
  week: string;
  orders: OrderExt[];
  offerSum: number;
  msrpSum: number;
  differenceSum: number;
  count: number;
  isSumOrAverage: boolean;
}

const orders = ref<OrderExt[]>([]);
const processedOrders = ref<number>(0);
const isProcessing = ref(false);
const search = ref<string>("");

const headers = [
  { title: "Benutzer", key: "userName" },
  { title: "Gewählter Monatsbeitrag", key: "offer" },
  {
    title: "Richtwert",
    key: "msrp",
    sortRaw(a: OrderExt, b: OrderExt) {
      return a.offer / a.msrp.weekly.total - b.offer / b.msrp.weekly.total;
    },
  },
  { title: "Angelegt", key: "createdAt" },
  { title: "Aktualisiert", key: "updatedAt" },
  { title: "Gültig ab", key: "validFrom" },
  { title: "Kategorie", key: "category" },
  { title: "Depot", key: "depotName" },
  { title: "ID", key: "id" },
];

const isEmpty = (obj: SavedOrder): boolean => {
  return obj && Object.keys(obj).length === 0;
};

const prettyDate = (date?: Date | string | null): string => {
  if (date) {
    return format(date, "PPp", { locale: de });
  }
  return "nie";
};

onMounted(async () => {
  processedOrders.value = 0;
  isProcessing.value = true;

  const allOrderExts: OrderExt[] = [];
  await Promise.all(
    userStore.userOptions.map(async (u) => {
      const orders = await getAllOrders(u.value, configStore.activeConfigId);
      processedOrders.value++;
      for (const order of orders) {
        if (isEmpty(order) || !order.orderItems) {
          return undefined;
        }
        const depot = depots.value.filter((d) => d.id == order.depotId);
        /*const validMonths = calculateEffectiveOrderValidMonths(
          configStore.config!,
          order,
          versionInfoStore.versionInfo?.serverTimeZone,
        );*/
        const validWeeks = countCalendarWeeks(configStore.config!.validFrom, configStore.config!.validTo)
        allOrderExts.push({
          ...order,
          msrp: getMsrp(
            order.category,
            order.orderItems,
            biStore.productsById,
            12,
          ),
          validWeeks,
          userName: u.title,
          depotName: depot.length ? depot[0].name : "unbekannt",
        });
      }
    }),
  );

  orders.value = allOrderExts.filter((o) => !!o);
  isProcessing.value = false;
});

/**
 * Group orders by month. Uses all months between validFrom and validTo of the current config.
 */
const ordersGroupedByWeek = computed((): OrdersGroupedByWeek[] => {
  if (!configStore.config?.validFrom || !configStore.config?.validTo) {
    return [];
  }
  const weeks: { middleOfWeek: Date; name: string }[] = [];
  for (
    let i = new Date(configStore.config?.validFrom);
    i <= configStore.config?.validTo;
    i = addWeeks(i, 1)
  ) {
    weeks.push({
      middleOfWeek: addDays(i, 3 - i.getDay()),
      name: "KW" + getWeekNumber(i).join("/"),
    });
  }
  const result = Object.values(
    relevantOrders.value.reduce(
      (acc, o) => {
        weeks.forEach((week) => {
          if (o.validFrom && o.validFrom > week.middleOfWeek) {
            return;
          }
          if (o.validTo && o.validTo < week.middleOfWeek) {
            return;
          }
          acc[week.name] = acc[week.name] || {
            orders: [],
            offerSum: 0,
            msrpSum: 0,
            differenceSum: 0,
            count: 0,
            week: week.name,
          };
          acc[week.name] = {
            orders: [...acc[week.name].orders, o],
            offerSum: o.offer + acc[week.name].offerSum,
            msrpSum: o.msrp.weekly.total + acc[week.name].msrpSum,
            differenceSum:
              o.offer - o.msrp.weekly.total + acc[week.name].differenceSum,
            count: 1 + acc[week.name].count,
            week: week.name,
            isSumOrAverage: false,
          };
        });
        return acc;
      },
      {} as {
        [key: string]: {
          orders: OrderExt[];
          offerSum: number;
          msrpSum: number;
          differenceSum: number;
          count: number;
          week: string;
          isSumOrAverage: boolean;
        };
      },
    ),
  );

  const count = result.filter((r) => !r.isSumOrAverage).length;

  // add sum row
  const sumRow = {
    orders: result.map((r) => r.orders).flat(),
    offerSum: result.reduce((acc, r) => acc + r.offerSum, 0),
    msrpSum: result.reduce((acc, r) => acc + r.msrpSum, 0),
    differenceSum: result.reduce((acc, r) => acc + r.differenceSum, 0),
    count: result.reduce((acc, r) => acc + r.count, 0) / count,
    week: "Summe",
    isSumOrAverage: true,
  };

  // add average row
  const averageRow = {
    orders: sumRow.orders,
    offerSum: sumRow.offerSum / count,
    msrpSum: sumRow.msrpSum / count,
    differenceSum: sumRow.differenceSum / count,
    count: sumRow.count,
    week: "Durchschnitt",
    isSumOrAverage: true,
  };

  return [...result, sumRow, averageRow];
});

const relevantOrders = computed(() => {
  return orders.value.filter((o) => o.offer > 0);
});

const categoriesDistribution = computed((): DistributionData => {
  const items = relevantOrders.value.reduce(
    (acc, cur) => {
      return acc.map((c) => {
        if (c.label == cur.category) {
          return { ...c, value: c.value + cur.validWeeks / 10 }; //FIXME dunno what is happening: validMonth / 12
        } else {
          return c;
        }
      });
    },
    [
      { label: UserCategory.CAT100, value: 0 },
      { label: UserCategory.CAT115, value: 0 },
      { label: UserCategory.CAT130, value: 0 },
    ],
  );
  return {
    items: items.map((i) => ({
      ...i,
      label:
        language.app.options.orderUserCategories[i.label].title +
        ` (${i.label})`,
    })),
  };
});

const offerRanges = computed(
  (): { data: DistributionData; offersSum: number; offersMean: number } => {
    const items = relevantOrders.value.reduce(
      (acc, cur) => {
        return acc.map((c) => {
          if (cur.offer >= c.offerMin && cur.offer < c.offerMax) {
            return { ...c, count: c.count + cur.validWeeks / 10 }; //FIXME dunno what is happening: validMonth / 12
          } else {
            return c;
          }
        });
      },
      [
        { offerMin: 1, offerMax: 50, count: 0 },
        { offerMin: 50, offerMax: 100, count: 0 },
        { offerMin: 100, offerMax: 150, count: 0 },
        { offerMin: 150, offerMax: 200, count: 0 },
        { offerMin: 200, offerMax: 250, count: 0 },
        { offerMin: 250, offerMax: 500, count: 0 },
        { offerMin: 500, offerMax: 1000, count: 0 },
      ],
    );
    return {
      data: {
        items: items.map((i) => ({
          label: `${i.offerMin} € ≤ x < ${i.offerMax} €`,
          value: i.count,
        })),
      },
      offersSum: relevantOrders.value.reduce(
        (acc, cur) => acc + (cur.offer * cur.validWeeks) / 10,
        0,
      ),
      offersMean:
        relevantOrders.value.reduce(
          (acc, cur) => acc + (cur.offer * cur.validWeeks) / 10,
          0,
        ) / relevantOrders.value.length,
    };
  },
);

const depotDistribution = computed((): DistributionData => {
  return {
    items: relevantOrders.value
      .reduce(
        (acc, order) => {
          return acc.map((c) => {
            if (c.label == order.depotName) {
              return { ...c, value: c.value + order.validWeeks / 10 };
            } else {
              return c;
            }
          });
        },
        depots.value.map((d) => ({
          label: d.name,
          value: 0,
        })),
      )
      .sort((a, b) => (a.label < b.label ? -1 : 1)),
  };
});

// A reusable helper function that computes a distribution from orders
function computeDistribution(
  orders: SavedOrder[],
  dateSelector: (order: SavedOrder) => Date | string | undefined,
): DistributionData {
  // Helper to create a label from a date
  const makeLabel = (date: Date | string | undefined): string => {
    const month = date ? new Date(date).getMonth() : 0;
    const kw = date ? format(new Date(date), "ww") : "?"; // ensure date is a Date object
    let year = date ? new Date(date).getFullYear() : 2000;
    // Adjust for week 01 at end of year
    if (kw === "01" && month === 11) {
      year += 1;
    }
    return `${year} KW${kw}`;
  };

  // Create and reduce the items array
  const items: DistributionDataItem[] = orders
    .map((order) => ({
      label: makeLabel(dateSelector(order)),
      value: 1,
    }))
    .reduce((acc, cur) => {
      // Find if there's already an item with the same label
      const foundIndex = acc.findIndex((a) => a.label === cur.label);
      if (foundIndex !== -1) {
        // Update the existing item
        acc[foundIndex] = {
          ...acc[foundIndex],
          value: acc[foundIndex].value + 1,
        };
      } else {
        // Add new item
        acc.push(cur);
      }
      return acc;
    }, [] as DistributionDataItem[])
    .sort((a, b) => (a.label < b.label ? -1 : 1));

  return { items };
}

// For createdAt distribution
const createdAtDistribution = computed(
  (): DistributionData =>
    computeDistribution(relevantOrders.value, (order) => order.createdAt),
);

// For updatedAt distribution
const updatedAtDistribution = computed(
  (): DistributionData =>
    computeDistribution(relevantOrders.value, (order) => order.updatedAt),
);
</script>

<template>
  <v-card-title> {{ t.ordersCard.title }} <SeasonText /> </v-card-title>
  <v-card-text>
    <p class="mb-4">
      {{ t.ordersCard.text }}
    </p>
    <v-progress-linear
      height="12"
      :max="userStore.userOptions.length"
      :model-value="processedOrders"
      v-if="isProcessing"
      color="primary"
    ></v-progress-linear>

    <template v-if="!isProcessing">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        variant="outlined"
        density="compact"
        label="Suche"
        single-line
        clearable
        hint="Volltextsuche in allen Spalten"
      />
      <v-data-table :items="relevantOrders" :headers="headers" :search="search">
        <template v-slot:item.userName="{ item }">
          {{ item.userName }}
          <v-btn
            icon="mdi-eye"
            variant="plain"
            :to="{ path: `/shop/${item.userId}` }"
          ></v-btn>
        </template>
        <template v-slot:item.offer="{ item }">
          {{ item.offer }} €<br />
          <span class="opacity-70"> {{ item.validWeeks }} Wochen </span>

          <v-tooltip
            :text="item.offerReason"
            open-on-click
            v-if="item.offerReason"
          >
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-information-outline</v-icon>
            </template>
          </v-tooltip>
        </template>
        <template v-slot:item.msrp="{ item }">
          {{ item.msrp.weekly.total }} €
          <!-- =
          <span class="opacity-70">
            <v-icon style="font-size: 0.7rem">mdi-sprout-outline</v-icon
            >{{ item.msrp.weekly.selfgrown }} € +

            <v-icon style="font-size: 0.7rem">mdi-truck-delivery-outline</v-icon
            >{{ item.msrp.monthly.cooperation }} €
          </span>-->
          <br />
          <v-tooltip
            text="Der Richtwert kann hier nicht korrekt berechnet werden, wenn der Ernteteiler nicht die vollen 12 Monate teilnimmt. Der genaue Richtwert kann auf der Bedarfsanmeldung des Ernteteilers eingesehen werden (Button in der Benutzer-Spalte)"
            open-on-click
            v-if="item.validWeeks != 10"
          >
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="orange">mdi-alert</v-icon>
            </template>
          </v-tooltip>
          <span class="text-bold" v-else>
            {{ item.offer >= item.msrp.weekly.total ? "+" : "-" }}
            {{
              Math.abs(
                Math.round(
                  (1000 * item.offer) / item.msrp.weekly.total - 1000,
                ) / 10,
              )
            }}%
          </span>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ prettyDate(item.createdAt) }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ prettyDate(item.updatedAt) }}
        </template>
        <template v-slot:item.validFrom="{ item }">
          {{ prettyDate(item.validFrom) }}
        </template>
        <template v-slot:item.category="{ item }">
          {{
            language.app.options.orderUserCategories[
              item.category as UserCategory
            ].title
          }}
          <v-tooltip
            :text="item.categoryReason"
            open-on-click
            v-if="item.categoryReason"
          >
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-information-outline</v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
      <div class="text-h6">Zusammenfassung</div>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <div class="text-subtitle-1">
              Monatliche Aufschlüsselung der Beiträge
            </div>
            <v-table>
              <thead>
                <tr>
                  <th>Monat</th>
                  <th>Beiträge (Durchschnitt)</th>
                  <th>Richtwerte (Durchschnitt)</th>
                  <th>Differenz</th>
                  <th>Anzahl</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="weekly in ordersGroupedByWeek"
                  :key="weekly.week"
                >
                  <td :class="{ 'font-weight-bold': weekly.isSumOrAverage }">
                    {{ weekly.week }}
                  </td>
                  <td :class="{ 'font-weight-bold': weekly.isSumOrAverage }">
                    {{ weekly.offerSum.toFixed(0) }} € (⌀{{
                      (weekly.offerSum / weekly.count).toFixed(0)
                    }}
                    €)
                  </td>
                  <td :class="{ 'font-weight-bold': weekly.isSumOrAverage }">
                    {{ weekly.msrpSum.toFixed(0) }} € (⌀{{
                      (weekly.msrpSum / weekly.count).toFixed(0)
                    }}
                    €)
                  </td>
                  <td :class="{ 'font-weight-bold': weekly.isSumOrAverage }">
                    {{ (weekly.offerSum - weekly.msrpSum).toFixed(0) }} €
                  </td>
                  <td :class="{ 'font-weight-bold': weekly.isSumOrAverage }">
                    {{ weekly.count.toFixed(0) }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <div class="text-subtitle-1">Mitgliedschaftsmodell</div>
            <DistributionPlot
              :distribution-data="categoriesDistribution"
              :fixed-digits="1"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <div class="text-subtitle-1">Gewählter Monatsbeitrag</div>
            <DistributionPlot
              :distribution-data="offerRanges.data"
              :fixed-digits="1"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <div class="text-subtitle-1">Depot-Belegung</div>
            <DistributionPlot
              :distribution-data="depotDistribution"
              :fixed-digits="1"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <div class="text-subtitle-1">
              Erstmaliges Anlegen der Bedarfsanmeldung
            </div>
            <div class="text-subtitle-2 opacity-60">
              Kalenderwoche in der erstmalig eine Bedarfsanmeldung angelegt
              wurde
            </div>
            <DistributionPlot :distribution-data="createdAtDistribution" />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <div class="text-subtitle-1">
              Letztmalige Aktualisierung der Bedarfsanmeldung
            </div>
            <div class="text-subtitle-2 opacity-60">
              Kalenderwoche in der zuletzt die Bedarfsanmeldung aktualisiert
              wurde
            </div>
            <DistributionPlot :distribution-data="updatedAtDistribution" />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card-text>
</template>
