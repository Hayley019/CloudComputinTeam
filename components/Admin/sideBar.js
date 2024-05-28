import { useState } from 'react';

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        className={`fixed inset-y-0 right-0 z-50 flex items-center justify-center w-10 h-10 bg-gray-500 text-white hover:bg-gray-600 transition-all rounded-full shadow-md ${isVisible ? 'mr-80' : ''}`}
        onClick={toggleVisibility}
      >
        {isVisible ? '<' : '>'}
      </button>
      <div className={`fixed inset-y-0 right-0 flex items-center justify-center transition-transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <article className="w-80 rounded-xl px-6 py-12 shadow-xl bg-white">
          <h2 className="mb-8 text-lg font-bold">Sidebar</h2>
          <section className="grid place-items-start gap-2 text-gray-500">
            <button className="w-full text-left flex gap-4 rounded-md px-2 py-2 hover:bg-gray-200 hover:text-gray-700 transition-all">
              <span>:)</span>
              <span>DashBoard</span>
            </button>
            <button className="flex w-full gap-4 rounded-md px-2 py-2 hover:bg-gray-200 hover:text-gray-700 transition-all">
              <span>:(</span>
              <span>Config</span>
            </button>
            <button className="flex w-full gap-4 rounded-md px-2 py-2 hover:bg-gray-200 hover:text-gray-700 transition-all">
              <span>-_-</span>
              <span>Profile</span>
            </button>
            <button className="flex w-full gap-4 rounded-md px-2 py-2 hover:bg-gray-200 hover:text-gray-700 transition-all">
              <div className="flex gap-4">
                <span>si</span>
                <span>Notifications</span>
              </div>
              <span className="animate-bounce rounded-full bg-gray-300 px-2 py-1 text-xs font-bold text-gray-500">14</span>
            </button>
          </section>
        </article>
      </div>
    </div>
  );
};
