import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md font-medium transition-colors"
            >
              Snacks
            </Link>
            <Link 
              href="/students"
              className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md font-medium transition-colors"
            >
              Students
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
