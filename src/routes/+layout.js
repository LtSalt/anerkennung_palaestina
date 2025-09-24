import { csvParse } from "d3";
import { toBoolean, toYear } from "$lib/helpers.js";

export const load = async({ fetch }) => {
    const [res1, res2] = await Promise.all([fetch('/data/states.csv'), fetch('/data/counter.csv')])
    const [text1, text2] = await Promise.all([res1.text(), res2.text()])

    const states = csvParse(text1).map((d, i) => ({ 
        ...d, 
        idx: i,
        date: toYear(d.date),
        eu28: toBoolean(d.eu28), 
        recognizes: toBoolean(d.recognizes) 
    }))

    const counter = csvParse(text2, (d) => {
        return {
            date: Number(d.date),
            sum: Number(d.sum)
        }
    });

    return { states, counter }
}