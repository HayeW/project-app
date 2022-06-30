import { Trainingschema } from "./Trainingschema"

export class Oefening {
    id: number = 0
    naam: string = ''
    sets: number = 1
    herhalingen: number = 1
    trainingschema!: Trainingschema;
}
