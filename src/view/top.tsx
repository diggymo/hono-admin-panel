import type { FC } from "hono/jsx";
import { Layout } from "./_layout.js";

export const Top: FC<{}> = () => {
  return (
    <Layout title="トップページ">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          タスク管理システム
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/task/create"
            className="group block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                  タスク作成
                </h3>
                <p className="text-sm text-gray-600">
                  新しいタスクを作成します
                </p>
              </div>
            </div>
          </a>

          <a
            href="/task/list"
            className="group block p-6 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700">
                  タスク一覧
                </h3>
                <p className="text-sm text-gray-600">
                  登録されたタスクの一覧を表示
                </p>
              </div>
            </div>
          </a>

          <a
            href="/download/csv"
            className="group block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">
                  CSVダウンロード
                </h3>
                <p className="text-sm text-gray-600">
                  タスクデータをCSV形式でダウンロード
                </p>
              </div>
            </div>
          </a>

          <a
            href="/download/csv-from-s3"
            className="group block p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-700">
                  S3からCSVダウンロード
                </h3>
                <p className="text-sm text-gray-600">
                  S3に保存されたCSVファイルをダウンロード
                </p>
              </div>
            </div>
          </a>

          <a
            href="/download/csv-from-s3-presignedurl-version"
            className="group block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700">
                  Presigned URL版CSV
                </h3>
                <p className="text-sm text-gray-600">
                  Presigned URLを使用してS3からCSVをダウンロード
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            効率的なタスク管理で生産性を向上させましょう
          </p>
        </div>
      </div>
    </Layout>
  );
};
