import AskForm from '@components/AskForm';

const Main = () => {
  return (
    <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col min-h-0">
        <AskForm />
      </div>
    </main>
  );
};

export default Main;
