import Navbar from "../src/components/Navbar"
import Gallery from "../src/components/Gallery"
import Banner from './components/Banner'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Protected from './pages/Protected';
import Profile from './pages/Profile'


function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create" element={<Postform />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/banner" element={<Banner />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/profile" element={<Profile />} />

         

            
        </Routes>
    </Router>
);
}

export default App
