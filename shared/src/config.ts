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
import { Unit, UserCategory } from "./enum";

export const appConfig = {
  appUrl: "https://plantage.weites-feld.org",
  address: {
    name: "Weites Feld gGmbH",
    street: "Hauptstraße 62a",
    postalcode: "01796",
    city: "Struppen",
    email: "hallo@weites-feld.org",
    forumContact: "noForum"
  },
  msrp: {
    [UserCategory.CAT100]: {
      absolute: 50.0, // 0.0
      relative: 1.0, // 1.0
    },
    [UserCategory.CAT115]: {
      absolute: 50.0, // 0.0
      relative: 1.0, // 1.15
    },
    [UserCategory.CAT130]: {
      absolute: 50.0, // 0.0
      relative: 1.0, // 1.3
    },
  },
  offerLimit: 0.75, // 0.6
  offerReasonLimit: 0.7, // 0.9
  needsCategoryReason: [UserCategory.CAT100], //[UserCategory.CAT115, UserCategory.CAT100]
  availableCategories: [
    UserCategory.CAT130,
    UserCategory.CAT115,
  ], // [UserCategory.CAT130, UserCategory.CAT115, UserCategory.CAT100]
  defaultCategory: UserCategory.CAT115, // UserCategory.CAT130
  showAlternateDepot: false, // true
  externalAuthProvider: true, // false
  shipment: {
    totalQuantityRound: {
      [Unit.PIECE]: 1,
      [Unit.WEIGHT]: 10,
      [Unit.VOLUME]: 10,
    },
  },
  meta: {
    sourceCodeUrl: "https://github.com/lebenswurzel/solawi-bedarf"
  }
};

