import {z} from 'zod'
import { GenerateImages, GenerateImagesFromPack, TrainModel } from './types'

export type GenerateImagesInput = z.infer<typeof GenerateImages>
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>
export type TrainModelInput = z.infer<typeof TrainModel>