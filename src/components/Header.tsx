const Header = () => {
  return (
    <header className="m-4 mb-0">
      <div className="bg-gray-700 p-4 rounded-t">
        <h1 className="text-3xl font-bold text-white text-center">Simulate Success - Monte Carlo Retirement Calculator</h1>
      </div>
      <div className="bg-gray-800 p-2 text-center rounded-b">
        <p className="text-white text-sm">
          View the user guide and code on 
          <a 
            href="https://github.com/cole-koryto/simulatesuccess-frontend" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-700 ml-1"
          >
            GitHub
          </a>.
        </p>
      </div>
    </header>
  );
}
export default Header;