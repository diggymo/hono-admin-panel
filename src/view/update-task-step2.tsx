import type { FC } from "hono/jsx";
import { priorities, TaskUpdateStep2Schema } from "../index.js";
import { Layout } from "./_layout.js";
import type { z, ZodError } from "zod";

export const UpdateTask2 = ({
  taskData,
  inputValue,
  error,
}: {
  taskData: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  };
  inputValue?: { [x: string]: string | File };
  error?: ZodError<z.infer<typeof TaskUpdateStep2Schema>>;
}) => {
  const getPriorityName = (priorityId: string) => {
    const priority = priorities.find((p) => p.id === priorityId);
    return priority ? priority.name : "不明";
  };

  return (
    <Layout title="タスク更新確認">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          更新内容の確認
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

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">タスク名</h3>
            <p className="text-gray-900">{taskData?.title || "未入力"}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">説明</h3>
            <p className="text-gray-900 whitespace-pre-wrap">
              {taskData?.description || "未入力"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">優先度</h3>
            <p className="text-gray-900">
              {taskData?.priority
                ? getPriorityName(taskData.priority)
                : "未設定"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">期限</h3>
            <p className="text-gray-900">{taskData?.dueDate || "設定なし"}</p>
          </div>
        </div>

        <form method="post" className="space-y-4">
          <input type="hidden" name="step" value="2" />
          <input type="hidden" name="title" value={taskData.title} />
          <input
            type="hidden"
            name="description"
            value={taskData.description}
          />
          <input type="hidden" name="priority" value={taskData.priority} />
          <input type="hidden" name="dueDate" value={taskData.dueDate} />
          {/* <input
            type="hidden"
            name="image"
            value={`data:${image.file.type};base64,${image.buffer.toString(
              "base64"
            )}`}
          /> */}
          <div>
            <label
              htmlFor="changeNote"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              変更内容のメモ（任意）
            </label>
            <textarea
              id="changeNote"
              name="changeNote"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="変更理由や詳細を記録してください..."
            >
              {inputValue?.changeNote}
            </textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              更新を実行
            </button>
            <a
              href="javascript:history.back();"
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 text-center"
            >
              戻る
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};
