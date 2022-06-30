import { Oefening } from "./oefening";
import { Workout } from "./workout";

export class Result {
    id: number = 0;

    behaaldeHerhalingen: number[] = []
    gewicht: number[] = []

    oefening!: Oefening;
    workout!: Workout;
}
