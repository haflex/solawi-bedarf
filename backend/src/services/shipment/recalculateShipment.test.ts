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
import { expect, test } from "vitest";
import { subDays } from "date-fns";
import {
  ShipmentType,
  Unit,
  UserCategory,
} from "@lebenswurzel/solawi-bedarf-shared/src/enum";
import {
  getDepotByName,
  getProductByName,
  getRequisitionConfigId,
} from "../../../test/testHelpers";
import {
  createBasicTestCtx,
  setupDatabaseCleanup,
  testAsAdminAndUser,
  testAsUser1,
  TestAdminAndUserData,
  TestUserData,
} from "../../../testSetup";
import { AppDataSource } from "../../database/database";
import { AdditionalShipmentItem } from "../../database/AdditionalShipmentItem";
import { Order } from "../../database/Order";
import { OrderItem } from "../../database/OrderItem";
import { Shipment } from "../../database/Shipment";
import { ShipmentItem } from "../../database/ShipmentItem";
import { recalculateShipment } from "./recalculateShipment";

setupDatabaseCleanup();

const createTestOrderWithItem = async (options: {
  userId: number;
  depotId: number;
  productId: number;
  value: number;
  confirmGTC: boolean;
}) => {
  const configId = await getRequisitionConfigId();
  const now = new Date();
  const order = new Order();
  order.userId = options.userId;
  order.depotId = options.depotId;
  order.requisitionConfigId = configId;
  order.validFrom = subDays(now, 1);
  order.validTo = subDays(now, -365);
  order.confirmGTC = options.confirmGTC;
  order.offer = 0;
  order.offerReason = null;
  order.category = UserCategory.CAT100;
  order.categoryReason = null;
  order.alternateDepotId = null;
  const savedOrder = await AppDataSource.getRepository(Order).save(order);

  const orderItem = new OrderItem();
  orderItem.orderId = savedOrder.id;
  orderItem.productId = options.productId;
  orderItem.value = options.value;
  await AppDataSource.getRepository(OrderItem).save(orderItem);

  return savedOrder;
};

const createTestShipmentWithItem = async (options: {
  active?: boolean;
  validFrom?: Date;
  depotId: number;
  productId: number;
  multiplicator?: number;
  conversionFrom?: number;
  conversionTo?: number;
  initialTotalShipedQuantity?: number;
  unit?: Unit;
}) => {
  const configId = await getRequisitionConfigId();
  const shipment = new Shipment();
  shipment.requisitionConfigId = configId;
  shipment.validFrom = options.validFrom ?? new Date();
  shipment.active = options.active ?? false;
  shipment.type = ShipmentType.NORMAL;
  shipment.description = "Test shipment";
  shipment.revisionMessages = null;
  const savedShipment =
    await AppDataSource.getRepository(Shipment).save(shipment);

  const shipmentItem = new ShipmentItem();
  shipmentItem.shipmentId = savedShipment.id;
  shipmentItem.depotId = options.depotId;
  shipmentItem.productId = options.productId;
  shipmentItem.multiplicator = options.multiplicator ?? 100;
  shipmentItem.conversionFrom = options.conversionFrom ?? 1;
  shipmentItem.conversionTo = options.conversionTo ?? 1;
  shipmentItem.unit = options.unit ?? Unit.PIECE;
  shipmentItem.isBio = false;
  shipmentItem.description = null;
  shipmentItem.totalShipedQuantity = options.initialTotalShipedQuantity ?? 999;
  await AppDataSource.getRepository(ShipmentItem).save(shipmentItem);

  savedShipment.shipmentItems = [shipmentItem];
  return savedShipment;
};

test("prevent unauthorized access", async () => {
  const ctx = createBasicTestCtx({ id: 1 });
  await expect(() => recalculateShipment(ctx)).rejects.toThrowError(
    "Error 401",
  );
});

testAsUser1(
  "prevent access for non-admin/employee",
  async ({ userData }: TestUserData) => {
    const ctx = createBasicTestCtx({ id: 1 }, userData.token, undefined);
    await expect(() => recalculateShipment(ctx)).rejects.toThrowError(
      "Error 403",
    );
  },
);

testAsAdminAndUser(
  "reject missing shipment id",
  async ({ userData }: TestAdminAndUserData) => {
    const ctx = createBasicTestCtx({}, userData.adminToken, undefined);
    await expect(() => recalculateShipment(ctx)).rejects.toThrowError(
      "Error 400: missing shipment id",
    );
  },
);

testAsAdminAndUser(
  "reject unknown shipment id",
  async ({ userData }: TestAdminAndUserData) => {
    const ctx = createBasicTestCtx(
      { id: 123456 },
      userData.adminToken,
      undefined,
    );
    await expect(() => recalculateShipment(ctx)).rejects.toThrowError(
      "Error 400: shipment not found (123456)",
    );
  },
);

testAsAdminAndUser(
  "recalculates totalShipedQuantity from confirmed orders",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 7,
      confirmGTC: true,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      initialTotalShipedQuantity: 999,
    });

    const ctx = createBasicTestCtx(
      { id: shipment.id },
      userData.adminToken,
      undefined,
    );
    await recalculateShipment(ctx);
    expect(ctx.status).toBe(204);

    const updatedItem = await AppDataSource.getRepository(
      ShipmentItem,
    ).findOneOrFail({ where: { shipmentId: shipment.id } });
    expect(updatedItem.totalShipedQuantity).toBe(7);
  },
);

testAsAdminAndUser(
  "excludes orders with confirmGTC=false from the recalculation",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 7,
      confirmGTC: false,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      initialTotalShipedQuantity: 999,
    });

    const ctx = createBasicTestCtx(
      { id: shipment.id },
      userData.adminToken,
      undefined,
    );
    await recalculateShipment(ctx);
    expect(ctx.status).toBe(204);

    const updatedItem = await AppDataSource.getRepository(
      ShipmentItem,
    ).findOneOrFail({ where: { shipmentId: shipment.id } });
    expect(updatedItem.totalShipedQuantity).toBe(0);
  },
);

testAsAdminAndUser(
  "applies multiplicator and unit conversion",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 10,
      confirmGTC: true,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      multiplicator: 50,
      conversionFrom: 1,
      conversionTo: 2,
      initialTotalShipedQuantity: 999,
    });

    const ctx = createBasicTestCtx(
      { id: shipment.id },
      userData.adminToken,
      undefined,
    );
    await recalculateShipment(ctx);

    const updatedItem = await AppDataSource.getRepository(
      ShipmentItem,
    ).findOneOrFail({ where: { shipmentId: shipment.id } });
    // (10 * 50 * 2) / (100 * 1) = 10
    expect(updatedItem.totalShipedQuantity).toBe(10);
  },
);

testAsAdminAndUser(
  "blocks recalculation of an active past shipment without revision message",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 7,
      confirmGTC: true,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      active: true,
      validFrom: subDays(new Date(), 1),
    });

    const ctx = createBasicTestCtx(
      { id: shipment.id },
      userData.adminToken,
      undefined,
    );
    await expect(() => recalculateShipment(ctx)).rejects.toThrowError(
      "Error 400: shipment is active",
    );
  },
);

testAsAdminAndUser(
  "allows admin to recalculate an active past shipment with a revision message",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 7,
      confirmGTC: true,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      active: true,
      validFrom: subDays(new Date(), 1),
      initialTotalShipedQuantity: 999,
    });

    const ctx = createBasicTestCtx(
      { id: shipment.id, revisionMessage: "Bestellung 476 wurde storniert" },
      userData.adminToken,
      undefined,
    );
    await recalculateShipment(ctx);
    expect(ctx.status).toBe(204);

    const updatedItem = await AppDataSource.getRepository(
      ShipmentItem,
    ).findOneOrFail({ where: { shipmentId: shipment.id } });
    expect(updatedItem.totalShipedQuantity).toBe(7);

    const updatedShipment = await AppDataSource.getRepository(
      Shipment,
    ).findOneOrFail({ where: { id: shipment.id } });
    expect(updatedShipment.revisionMessages).toHaveLength(1);
    expect(updatedShipment.revisionMessages?.[0].message).toBe(
      "Bestellung 476 wurde storniert",
    );
  },
);

testAsAdminAndUser(
  "does not modify additionalShipmentItems",
  async ({ userData }: TestAdminAndUserData) => {
    const depot = await getDepotByName("d1");
    const product = await getProductByName("p1");

    await createTestOrderWithItem({
      userId: userData.userId,
      depotId: depot.id,
      productId: product.id,
      value: 7,
      confirmGTC: true,
    });

    const shipment = await createTestShipmentWithItem({
      depotId: depot.id,
      productId: product.id,
      initialTotalShipedQuantity: 999,
    });

    const additionalItem = new AdditionalShipmentItem();
    additionalItem.shipmentId = shipment.id;
    additionalItem.depotId = depot.id;
    additionalItem.product = "Handmade jam";
    additionalItem.description = null;
    additionalItem.unit = Unit.PIECE;
    additionalItem.quantity = 1;
    additionalItem.totalShipedQuantity = 42;
    additionalItem.isBio = false;
    await AppDataSource.getRepository(AdditionalShipmentItem).save(
      additionalItem,
    );

    const ctx = createBasicTestCtx(
      { id: shipment.id },
      userData.adminToken,
      undefined,
    );
    await recalculateShipment(ctx);

    const updatedAdditionalItem = await AppDataSource.getRepository(
      AdditionalShipmentItem,
    ).findOneOrFail({ where: { id: additionalItem.id } });
    expect(updatedAdditionalItem.totalShipedQuantity).toBe(42);
  },
);
