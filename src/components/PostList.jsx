import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from './Slider';
import Footer from './Footer'
import Projects from './Projects';
import Banner from './Banner'
import '../CSS/postlist.css'

//icons
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postsPerPage = 8;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const validateImageAspectRatio = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      if (aspectRatio !== (4 / 5)) { // Check for 4:5 aspect ratio
        alert('Please upload an image with a 4:5 aspect ratio.');
      } else {
        // Proceed with the upload
      }
    };
  };

  const handleSearch = () => {
    if (searchQuery) {
      const results = posts.filter(post =>
        post.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts);
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="container-fluid">
      <Slider />
      <Banner />
      <hr />
      <h2 className="mt-4">Community Posts</h2>
      
      <br></br>



      {/* Search Bar */}
      <div className="mb-5 text-center d-flex justify-content-center "> {/* Centering the search bar and button */}
        <input
          type="text"
          className="form-control w-50 " // Reduced width
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ backgroundColor: 'transparent', borderColor: 'lightgray' }} // Made transparent
        />
        <div className='px-3'> </div>
        <button className="btn btn-lg" onClick={handleSearch} style={{ backgroundColor: '#ff914d', borderColor: '#ff914d' }}>Search</button> {/* Changed button color to #ff914d */}
      </div>



      <div className="row">
        {currentPosts.map((post) => (
          <div key={post._id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title"><PersonIcon/>{post.name}</h5>
                <br></br>
                
                {/* Bootstrap Carousel for Images */}
                <div 
                  id={`carousel-${post._id}`} 
                  className="carousel slide" 
                  data-bs-ride="false"
                  data-bs-interval="false"
                >
                  {post.images.length > 1 && (
                    <div className="carousel-indicators">
                      {post.images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target={`#carousel-${post._id}`}
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  )}

                  <div className="carousel-inner">
                    {post.images.map((img, index) => (
                      <div 
                        key={index} 
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                      >
                        <div className="image-wrapper">
                          <img
                            src={`http://localhost:5000/${img}`}
                            alt={`Post image ${index + 1}`}
                            className="d-block w-100 rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {post.images.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carousel-${post._id}`}
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carousel-${post._id}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Post Details - Moved outside of carousel */}
                <br></br>
                <p className="card-text"><strong><PhoneIcon/> Phone: </strong> {post.phoneNumber}</p>
                <p className="card-text"><strong><LocationOnIcon/> Location: </strong> {post.location}</p>
                <p className="card-text"><strong><LightbulbCircleIcon/> Description:</strong> {post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}

<div className="container-fluid">
      <h2 className="mt-4">Projects</h2>
      <hr />
      <br></br>
      <Projects />

      </div>


      {/* Footer section */}
      <br></br>
      <br></br>
      <Footer />
    </div>
    
  );
};

export default PostList;
