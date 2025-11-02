import Link from "next/link";

export function AuthHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">
              Shop<span className="text-purple-800">Easy</span>
            </h1>
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Back to Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}