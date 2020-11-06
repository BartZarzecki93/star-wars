import fetch from "node-fetch";
import { get } from "lodash";
import { Hero } from "../types/hero";
import * as dotenv from "dotenv";
dotenv.config();

export default class StarWarsService {
  static async getRandomInt(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static async generateHero() {
    const rdmNumber = await this.getRandomInt(10, 1);
    const response = await fetch(
      `${process.env.STARWARS_API}/people/${rdmNumber}`
    );
    const body: Hero = await response.json();

    return { id: rdmNumber, name: body.name };
  }

  static async getResources(id: number, resourceType: string) {
    const response = await fetch(`${process.env.STARWARS_API}/people/${id}`);

    const body: Hero = await response.json();
    const type = get(body, `${resourceType}`);

    if (!type) return "Wrong Resource";
    if (type.length == 0) return "No Resources";

    const promises = type.map(async (url: string) => {
      const response = await fetch(url);
      return response.json();
    });

    return Promise.all(promises);
  }

  static async findResources(
    heroId: number,
    resourceType: string,
    resourceId: string
  ) {
    const response = await fetch(
      `${process.env.STARWARS_API}/people/${heroId}`
    );
    const body: Hero = await response.json();

    const type = get(body, `${resourceType}`);

    const itemToFind = `${process.env
      .STARWARS_API}/${resourceType}/${resourceId}/`;

    if (type.indexOf(itemToFind) > -1) {
      const item = await fetch(itemToFind);
      const body = await item.json();
      return body;
    }

    return "Item do not belong to your hero";
  }
}
