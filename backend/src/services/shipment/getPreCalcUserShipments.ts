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
import Koa from "koa";
import Router from "koa-router";
import { getRequestUserId } from "../getUserFromContext";
import { AppDataSource } from "../../database/database";
import { Shipment } from "../../database/Shipment";
import { Order } from "../../database/Order";
import { getConfigIdFromQuery } from "../../util/requestUtil";
import { ShipmentType } from "@lebenswurzel/solawi-bedarf-shared/src/enum";
import { ShipmentItem } from "../../database/ShipmentItem";
import { AdditionalShipmentItem } from "../../database/AdditionalShipmentItem";

export const getPreCalcUserShipments = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
) => {
  const requestUserId = await getRequestUserId(ctx);

  const configId = getConfigIdFromQuery(ctx);

  const order = (
    await AppDataSource.getRepository(Order).findOne({
      where: {
        userId: requestUserId,
        requisitionConfigId: configId,
      },
      select: {
        depotId: true,
        orderItems: true
      },
    })
  );   // unklar warum es mehrere Orders per User und Saison geben sollte -> daher hier findOne
  if (!order) {
    ctx.body = "no order found"
    return
  }
  const depotId = order.depotId
  
  const shipments = await AppDataSource.getRepository(Shipment).find({
    relations: {
      shipmentItems: true,
      additionalShipmentItems: true,
    },
    where: [
      {
        requisitionConfigId: configId,
        shipmentItems: {
          depotId: depotId,
        },
        active: true,
        type: ShipmentType.NORMAL,
      },
      {
        requisitionConfigId: configId,
        additionalShipmentItems: {
          depotId: depotId,
        },
        active: true,
        type: ShipmentType.NORMAL,
      },
    ],
    order: {
      validFrom: "DESC",
    },
  });

  const filteredShipments: Shipment[] = shipments.map((shipment) => {
    const shipmentItems: ShipmentItem[] = shipment.shipmentItems
      .map((shipmentItem) => {
        const orderItem = order.orderItems.find(
          (o) => o.productId === shipmentItem.productId
        );

        if (!orderItem) return null;

        const totalShipedQuantity =
          (orderItem.value *
            shipmentItem.multiplicator *
            shipmentItem.conversionTo) /
          (100 * shipmentItem.conversionFrom);

        return { ...shipmentItem, totalShipedQuantity };
      })
      .filter((item): item is ShipmentItem => item !== null);

    const additionalShipmentItems: AdditionalShipmentItem[] =
      shipment.additionalShipmentItems.map((item) => ({ ...item }));

    return {
      ...shipment,
      shipmentItems,
      additionalShipmentItems,
    };
  });

  ctx.body = { shipments: filteredShipments };
};
