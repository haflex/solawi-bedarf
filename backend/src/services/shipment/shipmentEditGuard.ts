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
import { http } from "../../consts/http";
import {
  ShipmentType,
  UserRole,
} from "@lebenswurzel/solawi-bedarf-shared/src/enum";

/**
 * Throws if a shipment that is already active and in the past is being
 * modified without a revision message from an admin. Forecast shipments are
 * always editable.
 */
export const assertShipmentEditable = (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  shipment: { active: boolean; validFrom: Date },
  type: ShipmentType,
  role: UserRole,
  revisionMessage: string | undefined,
) => {
  if (
    type != ShipmentType.FORECAST &&
    shipment.active &&
    shipment.validFrom < new Date()
  ) {
    // allow to update active shipment but only if a revision message is provided
    if (
      role !== UserRole.ADMIN ||
      !revisionMessage ||
      revisionMessage.trim() === ""
    ) {
      ctx.throw(http.bad_request, "shipment is active");
    }
  }
};
