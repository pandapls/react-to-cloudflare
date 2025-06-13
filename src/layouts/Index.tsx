import Header from './Header';
import Main from './Main';

const Layouts = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 头部 */}
      <Header />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Main />
      </div>
    </div>
  );
};

export default Layouts;
