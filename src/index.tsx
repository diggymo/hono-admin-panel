import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { CreateTask } from "./view/create-task.js";
import z from "zod";
import { basicAuth } from "hono/basic-auth";
import fs from "fs/promises";
import { Top } from "./view/top.js";
import { handle } from "hono/aws-lambda";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListTask } from "./view/list-task.js";
import { buffer } from "node:stream/consumers";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { UpdateTask1 } from "./view/update-task-step1.js";
import { UpdateTask2 } from "./view/update-task-step2.js";
import { UpdateTask3 } from "./view/update-task-step3.js";

const app = new Hono();

app.use(
  basicAuth({
    username: "diggymo",
    password: "diggymo",
  })
);

app.get("/", (c) => {
  return c.html(<Top />);
});

app.get("/task/list", (c) => {
  return c.html(<ListTask tasks={mockTasks} />);
});

app.get("/download/csv", (c) => {
  // @see https://catalog.data.metro.tokyo.lg.jp/dataset/t132071d0000000006/resource/4b1227d5-82fa-4082-86e7-5a6812fd5b49
  const csvData = `都道府県コード又は市区町村コード,地域コード,都道府県名,市区町村名,調査年月日,地域名,総人口,男性,女性,0-4歳の男性,0-4歳の女性,5-9歳の男性,5-9歳の女性,10-14歳の男性,10-14歳の女性,15-19歳の男性,15-19歳の女性,20-24歳の男性,20-24歳の女性,25-29歳の男性,25-29歳の女性,30-34歳の男性,30-34歳の女性,35-39歳の男性,35-39歳の女性,40-44歳の男性,40-44歳の女性,45-49歳の男性,45-49歳の女性,50-54歳の男性,50-54歳の女性,55-59歳の男性,55-59歳の女性,60-64歳の男性,60-64歳の女性,65-69歳の男性,65-69歳の女性,70-74歳の男性,70-74歳の女性,75-79歳の男性,75-79歳の女性,80-84歳の男性,80-84歳の女性,85-89歳の男性,85-89歳の女性,90-94歳の男性,90-94歳の女性,95-99歳の男性,95-99歳の女性,100歳以上の男性,100歳以上の女性,年齢不詳の男性,年齢不詳の女性,世帯数,備考
132071,,東京都,昭島市,2025/1/1,,115632,57486,58146,2093,1969,2387,2332,2487,2431,2537,2431,3024,2719,3363,2956,3440,3229,3734,3430,3973,3706,4485,3931,4739,4623,4308,3924,3488,3419,3097,3232,3298,3583,3182,3771,2171,3067,1179,1964,409,1075,85,291,7,63,0,0,58040,
132071,,東京都,昭島市,2025/2/1,,115610,57464,58146,2076,1984,2403,2319,2485,2433,2525,2429,3004,2724,3377,2942,3461,3253,3733,3422,3961,3708,4474,3929,4735,4617,4329,3930,3494,3416,3066,3237,3294,3570,3209,3792,2159,3047,1166,1955,422,1078,82,299,9,62,0,0,58058,
132071,,東京都,昭島市,2025/3/1,,115626,57459,58167,2070,1968,2397,2320,2495,2434,2522,2436,2984,2741,3384,2938,3461,3258,3735,3433,3935,3705,4493,3921,4720,4620,4342,3932,3501,3420,3050,3238,3294,3560,3239,3791,2153,3052,1164,1961,431,1073,80,307,9,59,0,0,58102,
132071,,東京都,昭島市,2025/4/1,,115728,57564,58164,2086,1948,2401,2315,2465,2450,2538,2421,3048,2756,3402,2957,3496,3254,3726,3441,3937,3690,4463,3927,4731,4615,4325,3945,3529,3418,3046,3241,3288,3543,3239,3796,2147,3052,1168,1954,439,1071,80,311,10,59,0,0,58296,
132071,,東京都,昭島市,2025/5/1,,115847,57638,58209,2038,1904,2418,2298,2462,2450,2559,2445,3031,2769,3406,2965,3495,3266,3732,3416,3947,3675,4468,3943,4700,4598,4331,3962,3580,3439,3038,3226,3270,3537,3271,3826,2170,3033,1180,1990,446,1088,86,317,10,62,0,0,58429,
132071,,東京都,昭島市,2025/6/1,,115867,57645,58222,2073,1935,2419,2298,2462,2449,2561,2444,3027,2772,3397,2966,3501,3284,3739,3414,3952,3678,4477,3944,4699,4600,4338,3963,3574,3437,3032,3229,3267,3534,3267,3821,2159,3030,1171,1981,436,1077,84,309,10,57,0,0,58484,
132071,,東京都,昭島市,2025/7/1,,115882,57641,58241,2058,1937,2424,2290,2477,2443,2565,2448,2990,2770,3400,2986,3508,3278,3740,3416,3949,3675,4467,3938,4694,4598,4345,3978,3588,3443,3039,3240,3252,3506,3284,3843,2156,3025,1164,1986,447,1079,84,307,10,55,0,0,58520,
  `;

  return new Response(csvData, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="data.csv"',
    },
  });
});

app.get("/download/csv-from-s3", async (c) => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || "ap-northeast-1",
  });
  const command = new GetObjectCommand({
    Bucket: "hono-survey-csv-data",
    Key: "ratings.csv",
  });
  const response = await s3Client.send(command);
  return new Response(response.Body?.transformToWebStream(), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="data.csv"',
    },
  });
});

app.get("/download/csv-from-s3-presignedurl-version", async (c) => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || "ap-northeast-1",
  });

  const command = new GetObjectCommand({
    Bucket: "hono-survey-csv-data",
    Key: "ratings.csv",
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  return c.redirect(presignedUrl);
});

const mockTasks: Task[] = [
  {
    id: "1",
    title: "プロジェクトの要件定義",
    description: "新しいWebアプリケーションの要件を整理し、仕様書を作成する",
    priority: "high",
    dueDate: "2025-08-15",
    image: new File([await fs.readFile("assets/800x300.jpg")], "800x300.jpg"),
  },
  {
    id: "2",
    title: "データベース設計",
    description: "ユーザー管理とタスク管理のためのテーブル設計を行う",
    priority: "medium",
    dueDate: "2025-08-20",
    image: new File([await fs.readFile("assets/800x550.png")], "800x550.png"),
  },
  {
    id: "3",
    title: "UIデザイン作成",
    description:
      "ユーザーインターフェースのモックアップとワイヤーフレームを作成",
    priority: "low",
    dueDate: "2025-08-25",
    image: new File([await fs.readFile("assets/900x900.png")], "900x900.png"),
  },
];

export const priorities = [
  { id: "low", name: "低" },
  { id: "medium", name: "中" },
  { id: "high", name: "高" },
] as const;

export const TaskFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(priorities.map((p) => p.id)),
  dueDate: z.iso.date(),
  image: z
    .file()
    .mime(["image/jpeg", "image/gif", "image/jpeg", "image/webp", "image/png"])
    .max(10_000_000), //10MB
});

export type Task = z.infer<typeof TaskFormSchema> & {
  id: string;
};

app.get("/task/create", (c) => {
  return c.html(<CreateTask />);
});
app.post("/task/create", async (c) => {
  const body = await c.req.parseBody();
  const parsedResult = TaskFormSchema.safeParse(body);
  if (!parsedResult.success) {
    return c.html(<CreateTask inputValue={body} error={parsedResult.error} />);
  }

  const imageFile = parsedResult.data.image; // webの[Fileインタフェース](https://developer.mozilla.org/ja/docs/Web/API/File)を満たしている
  const ab = await imageFile.arrayBuffer();
  const buffer = Buffer.from(ab);
  return c.html(<CreateTask image={{ file: imageFile, buffer }} />);
});

app.get("/task/update/:id", async (c) => {
  return c.html(<UpdateTask1 />);
});

export const TaskUpdateStep1Schema = TaskFormSchema.omit({
  image: true,
}).extend({
  step: z.string(),
});
export const TaskUpdateStep2Schema = z.object({
  changeNote: z.string().min(1).max(500),
  step: z.string(),
});
export const TaskUpdateStep3Schema = z.object({
  confirm: z.literal("on"), // チェックボックスが選択されると`on`になる
  step: z.string(),
});
app.post("/task/update/:id", async (c) => {
  const body = await c.req.parseBody();
  const parsedResultStep1 = TaskUpdateStep1Schema.safeParse(body);
  if (!parsedResultStep1.success) {
    return c.html(
      <UpdateTask1 inputValue={body} error={parsedResultStep1.error} />
    );
  }

  if (parsedResultStep1.data.step === "1") {
    return c.html(<UpdateTask2 taskData={parsedResultStep1.data} />);
  }

  const parsedResultStep2 = TaskUpdateStep2Schema.safeParse(body);
  if (!parsedResultStep2.success) {
    return c.html(
      <UpdateTask2
        taskData={parsedResultStep1.data}
        inputValue={body}
        error={parsedResultStep2.error}
      />
    );
  }

  if (parsedResultStep1.data.step === "2") {
    return c.html(
      <UpdateTask3
        taskData={parsedResultStep1.data}
        changeNote={parsedResultStep2.data.changeNote}
      />
    );
  }

  const parsedResultStep3 = TaskUpdateStep3Schema.safeParse(body);
  if (!parsedResultStep3.success) {
    return c.html(
      <UpdateTask3
        taskData={parsedResultStep1.data}
        changeNote={parsedResultStep2.data.changeNote}
        inputValue={body}
        error={parsedResultStep3.error}
      />
    );
  }

  console.log(
    "更新完了",
    parsedResultStep1.data,
    parsedResultStep2.data,
    parsedResultStep3.data
  );
  return c.redirect("/task/list");
});

// 静的アセットの配信
app.use(
  "/assets/*",
  // `"./assets/"` ではないので注意
  serveStatic({ root: "." })
);

// ローカル起動
// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   }
// );

// AWS Lambdaのハンドラー
export const handler = handle(app);
