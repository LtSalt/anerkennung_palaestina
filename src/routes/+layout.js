import { csvParse } from "d3";

export const load = async({ fetch }) => {

    const res = await fetch('/data/counter.csv');
    const text = await res.text();

    const counter = csvParse(text, (d) => {
        return {
            date: Number(d.date),
            sum: Number(d.sum)
        }
    });

    return { counter}
}