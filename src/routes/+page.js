import { csvParse } from "d3";

export const load = async({ fetch }) => {
    const res = await fetch('/data/cars.csv')
    const text = await res.text()

    return { cars: csvParse(text) }
}