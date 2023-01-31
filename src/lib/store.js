// @ts-nocheck
import { writable} from "svelte/store";

let Surahs = writable([])
let DetailSurat = writable()
let audioQuran = writable('')

export {Surahs, DetailSurat, audioQuran}