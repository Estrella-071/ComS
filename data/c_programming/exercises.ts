
import type { ProgrammingExercise } from '../../types';
import { exercises as chapter1Exercises } from './chapters/chapter1_exercises';
import { exercises as chapter2Exercises } from './chapters/chapter2_exercises';
import { exercises as chapter3Exercises } from './chapters/chapter3_exercises';
import { exercises as chapter4Exercises } from './chapters/chapter4_exercises';

export const exercises: ProgrammingExercise[] = [
    ...chapter1Exercises,
    ...chapter2Exercises,
    ...chapter3Exercises,
    ...chapter4Exercises,
];
