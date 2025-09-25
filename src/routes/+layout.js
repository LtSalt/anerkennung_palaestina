import { csvParse } from "d3";
import { toBoolean, toYear } from "$lib/helpers.js";

export const load = async({ fetch }) => {
    const [res1, res2, res3] = await Promise.all([fetch('/data/states.csv'), fetch('/data/counter.csv'), fetch('data/by_continent.csv')]);
    const [text1, text2, text3] = await Promise.all([res1.text(), res2.text(), res3.text()])

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

    const byContinent = csvParse(text3, (d) => {
       return {
           ...d,
        date: Number(d.date),
        total: Number(d.total),
        pro: Number(d.pro),
        share: Number(d.share),
       } 
    });

    return { states, counter, byContinent }
}