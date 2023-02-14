import './App.css';
import Portfolio from './components/folio.js';



function App() {
  return (
      <div className= 'h-full w-full m-0 p-[0.05px] bg_cover'>
        <Portfolio />
      </div>
  );
}

export default App;




//import './test.css';
// import Test from './components/test.js'
// import Header from './components/header.js'
// import Footer from './components/footer.js'
// import MainContent from './components/maincontent.js'


// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
// } from "react-router-dom";


// function Page() {
//   return (
//       <div>
//         <Header />
//         <div className=''>
//         <Routes>
//           <Route path ='/' element={<MainContent />} />            
//           <Route path ='/test' element={<Test />} />
//           <Route path ='/login' element={<Login />} />
//         </Routes> 
//         </div>       
//       </div>
//   )
// }

