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
import { appConfig } from "@lebenswurzel/solawi-bedarf-shared/src/config";
import { UserRole } from "@lebenswurzel/solawi-bedarf-shared/src/enum";
import { valueToDelivered } from "@lebenswurzel/solawi-bedarf-shared/src/shipment/shipmentUtil";
import { http } from "../../consts/http";
import { AppDataSource } from "../../database/database";
import { Shipment } from "../../database/Shipment";
import { ShipmentItem } from "../../database/ShipmentItem";
import { bi } from "../bi/bi";
import { getUserFromContext } from "../getUserFromContext";
import { assertShipmentEditable } from "./shipmentEditGuard";

interface RecalculateShipmentRequest {
  id: number;
  revisionMessage?: string;
}

/**
 * Recalculates the totalShipedQuantity of every (non-additional) shipment
 * item of an existing shipment from the currently confirmed orders
 * (confirmGTC = true), without requiring the shipment to be recreated from
 * scratch. additionalShipmentItems are left untouched as they are not
 * derived from orders.
 */
export const recalculateShipment = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
) => {
  const { role, userName } = await getUserFromContext(ctx);
  if (![UserRole.ADMIN, UserRole.EMPLOYEE].includes(role)) {
    ctx.throw(http.forbidden);
  }

  const body = ctx.request.body as RecalculateShipmentRequest;
  if (!body.id) {
    ctx.throw(http.bad_request, "missing shipment id");
  }

  const shipment = await AppDataSource.getRepository(Shipment).findOne({
    where: { id: body.id },
    relations: { shipmentItems: true },
  });
  if (!shipment) {
    ctx.throw(http.bad_request, `shipment not found (${body.id})`);
  }

  assertShipmentEditable(
    ctx,
    shipment,
    shipment.type,
    role,
    body.revisionMessage,
  );

  const { requiredByProductIdDepotId } = await bi(
    shipment.requisitionConfigId,
    undefined,
    false,
    shipment.validFrom,
  );

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    for (const item of shipment.shipmentItems) {
      const requiredValue =
        requiredByProductIdDepotId[item.productId]?.[item.depotId]
          ?.valueForShipment || 0;
      const rawTotal = valueToDelivered({
        value: requiredValue,
        multiplicator: item.multiplicator,
        conversionFrom: item.conversionFrom,
        conversionTo: item.conversionTo,
      });
      const roundTo = appConfig.shipment.totalQuantityRound[item.unit];
      item.totalShipedQuantity = Math.round(rawTotal / roundTo) * roundTo;
      await transactionalEntityManager.getRepository(ShipmentItem).save(item);
    }

    if (body.revisionMessage && body.revisionMessage.trim() !== "") {
      if (!shipment.revisionMessages) {
        shipment.revisionMessages = [];
      }
      shipment.revisionMessages.push({
        message: body.revisionMessage,
        createdAt: new Date().toISOString(),
        userName,
      });
      await transactionalEntityManager.getRepository(Shipment).save(shipment);
    }
  });

  ctx.status = http.no_content;
};
