import { csvParse } from "d3";
import { toBoolean, toYear } from "$lib/helpers.js";

export const load = async({ fetch }) => {
    const res = await fetch('/data/states.csv');
    const text = await res.text();

    const states = csvParse(text).map((d, i) => ({ 
        ...d, 
        idx: i,
        date: toYear(d.date),
        eu28: toBoolean(d.eu28), 
        recognizes: 
        toBoolean(d.recognizes) 
    }))

    const res2 = await fetch('/data/recognition_time.csv');
    const text2 = await res2.text();

    const recognitionTime = csvParse(text2);

    // const recognitionTime = csvParse(text2, (d) => {
    //     return {
    //         date: Number(d.date),
    //         sum: Number(d.sum)
    //     }
    // });

    const res3 = await fetch('/data/aapl.csv');
    const text3 = await res3.text();

    return { states: states, recognitionTime, aapl: csvParse(text3) }
}