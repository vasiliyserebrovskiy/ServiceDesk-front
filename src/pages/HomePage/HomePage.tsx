export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl px-8 py-8">
        <h1 className="text-gray-500 text-2xl sm:text-3xl font-bold mb-4 whitespace-nowrap text-center">
          Welcome to the Service Desk
        </h1>

        <p className="text-gray-700 mb-4 py-2">
          This application was developed as part of a personal project and
          contains only a basic subset of features typically found in real ITSM
          systems.
        </p>

        <p className="text-gray-700 mb-4 py-2">
          As this project is continuously evolving, new features and
          improvements may be added over time.
        </p>

        <p className="text-gray-700 mb-4 py-2">
          Any resemblance to existing ITSM systems is purely coincidental and
          may be attributed to over 15 years of experience working with such
          platforms.
        </p>

        <p className="text-gray-700 mb-6 italic py-2">
          During development of this system, no existing ITSM platform was
          harmed... probably😊
        </p>

        <div className="mt-4 border-t pt-4 text-sm text-gray-600 text-right">
          <p>For any questions, feel free to contact me:</p>
          <p className="font-medium">vasiliy.serebrovskiy@gmail.com</p>
          <p className="mt-2">— Vasilii Serebrovskii 2026 ©</p>
        </div>
      </div>
    </div>
  );
}
