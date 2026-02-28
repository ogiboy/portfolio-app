import Sidebar from './Sidebar';

const SidebarWrapper = () => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 opacity-40 hover:opacity-100 transition-opacity duration-500">
      <Sidebar />
    </div>
  );
};
export default SidebarWrapper;
