import express from "express";
import {
  TrainModel,
  GenerateImages,
  GenerateImagesFromPack,
} from "common/types";
import { prismaClient } from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAiModel";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT || 8080;

const falAiModel = new FalAIModel();

const app = express();

app.use( cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());
const USER_ID = "1";
// accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_KEY,
//     endpoint: process.env.ENDPOINT,
//     bucket: process.env.BUCKET_NAME,
app.get("/pre-signed-url", async (req, res) => {
  
  try {
    const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign(key, {
      method: "PUT",
      accessKeyId: process.env.S3_accessKeyId,
      secretAccessKey: process.env.S3_secretAccessKey,
      endpoint: process.env.endpoint,
      bucket: process.env.S3_bucket,
      expiresIn: 60 * 5,
      type: 'application/zip'
    });

    res.json({
      url,
      key,
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      message: "Error in generating pre-signed URL",
    });
  }
});

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect",
    });
    return;
  }

  const { request_id, response_url } = await falAiModel.trainModel(
    parsedBody.data.zipUrl,
    parsedBody.data.name
  );

  const data = await prismaClient.models.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: USER_ID,
      zipUrl: parsedBody.data.zipUrl,
      falAiRequestId: request_id,
    },
  });

  res.json({
    modelId: data.id,
  });
});

app.post("/ai/generate", async (req, res) => {
  const parsedBody = GenerateImages.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({});
    return;
  }

  const model = await prismaClient.models.findUnique({
    where: {
      id: parsedBody.data.modelId,
    },
  });

  if (!model || !model.tensorPath) {
    res.status(411).json({
      message: "Model not found",
    });
    return;
  }

  const { request_id, response_url } = await falAiModel.generateImage(
    parsedBody.data.prompt,
    model.tensorPath
  );

  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      userId: USER_ID,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
      falAiRequestId: request_id,
    },
  });

  res.json({
    imageId: data.id,
  });
});

app.post("/pack/generate", async (req, res) => {
  const parsedBody = GenerateImagesFromPack.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect",
    });
    return;
  }
  const prompts = await prismaClient.packsPrompts.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });

  let  requestIds: {request_id: string}[] = await Promise.all(prompts.map((prompt)=> falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)))
  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt, index) => ({
      prompt: prompt.prompt,
      userId: USER_ID,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
     falAiRequestId: requestIds[index].request_id
    })),
  });
});

app.get("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.packs.findMany({});

  res.json({
    packs,
  });
});

app.get("/image/bulk", async (req, res) => {
  const ids = req.query.ids as string[];
  const offset = (req.query.offset as string) ?? "0";
  const limit = (req.query.limit as string) ?? "10";

  const imageData = await prismaClient.outputImages.findMany({
    where: {
      id: { in: ids },
      userId: USER_ID,
    },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json({ images: imageData });
});

app.get("/models", async (req, res) => {});

app.post("/fal-ai/webhook/train", async (req, res) => {
  const requestId = req.body.request_id as string;

  await prismaClient.models.updateMany({
    where: {
      falAiRequestId: requestId,
    },
    data: {
      trainingStatus: "completed",
      //@ts-ignore
      tensorPath: result.data.diffusers_lora_file.url,
    },
  });

  res.json({
    message: "Webhook received",
  });
});

app.post("/fal-ai/webhook/image", async (req, res) => {
  console.log("fal-ai/webhook/image");
  console.log(req.body);
  // update the status of the image in the DB
  const requestId = req.body.request_id;

  if (req.body.status === "ERROR") {
    res.status(411).json({});
    prismaClient.outputImages.updateMany({
      where: {
        falAiRequestId: requestId,
      },
      data: {
        status: "failed",
        imageUrl: req.body.payload.images[0].url,
      },
    });
    return;
  }

  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId: requestId,
    },
    data: {
      status: "generated",
      imageUrl: req.body.payload.images[0].url,
    },
  });

  res.json({
    message: "Webhook received",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
