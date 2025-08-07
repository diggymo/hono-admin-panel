import type { FC } from "hono/jsx";
import type { z, ZodError } from "zod";
import { priorities, TaskFormSchema } from "../index.js";
import { Layout } from "./_layout.js";

export const CreateTask: FC = ({
  inputValue,
  image,
  error,
}: {
  inputValue?: { [x: string]: string | File };
  image?: { file: File; buffer: Buffer };
  error?: ZodError<z.infer<typeof TaskFormSchema>>;
}) => {
  return (
    <Layout title="タスク登録">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          新しいタスクを作成
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              入力エラーがあります
            </h3>
            <ul className="text-sm text-red-600 space-y-1">
              {error.issues.map((err: any, index: number) => (
                <li key={index}>
                  • {err.path.join(".")}: {err.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form method="post" encType="multipart/form-data" className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              タスク名
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputValue?.title.toString() ?? "無題のタスク"}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="タスク名を入力してください"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              説明
            </label>
            <textarea
              id="description"
              name="description"
              value={inputValue?.description.toString()}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="タスクの詳細を入力してください"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              優先度
            </label>
            <select
              id="priority"
              name="priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map((p, i) => (
                <option value={p.id} selected={p.id === inputValue?.priority}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              期限
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              画像を選択
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPG、PNG、GIF形式の画像ファイルを選択できます
            </p>

            {/* 渡された画像を表示 */}
            {image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">選択された画像:</p>
                <img
                  src={`data:${image.file.type};base64,${image.buffer.toString(
                    "base64"
                  )}`}
                  alt="選択された画像"
                  className="w-full max-w-xs mx-auto rounded-lg shadow-md border border-gray-200"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              作成
            </button>
            <a
              href="/"
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 text-center"
            >
              キャンセル
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};
