import type { FC } from "hono/jsx";
import type { Task } from "../index.js";
import { Layout } from "./_layout.js";

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityText = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "高";
    case "medium":
      return "中";
    case "low":
      return "低";
    default:
      return "不明";
  }
};

export const ListTask: FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <Layout title="タスク一覧">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">タスク一覧</h1>
          <div className="flex space-x-4">
            <a
              href="/task/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              新規タスク作成
            </a>
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              ホームに戻る
            </a>
          </div>
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">タスクがありません</p>
            <a
              href="/task/create"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              最初のタスクを作成
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

const TaskItem = async ({ task }: { task: Task }) => {
  return (
    <a
      href={`/task/update/${task.id}`}
      key={task.id}
      className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200 cursor-pointer"
    >
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img
            src={`data:${task.image.type};base64,${Buffer.from(
              await task.image.arrayBuffer()
            ).toString("base64")}`}
            alt={task.title}
            className="w-32 h-24 object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                優先度: {getPriorityText(task.priority)}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{task.description}</p>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>期限: {task.dueDate}</span>
            <span>ID: {task.id}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
