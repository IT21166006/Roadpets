import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";

const ProfilePage = () => {
  const [user, setUser] = useState({
    picture: "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg",
    username: "Tharindu Dilshan",
    phone: "123-456-7890",
    location: "New York, USA",
  });

  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "First Post", 
      content: "This is my first post.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      username: "Tharindu Dilshan",
      userAvatar: "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg"
    },
    { 
      id: 2, 
      title: "Second Post", 
      content: "This is my second post.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      username: "Tharindu Dilshan",
      userAvatar: "https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg"
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleEditProfile = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleEditPost = (postId, updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { 
          ...post, 
          title: updatedPost.title,
          content: updatedPost.content,
          image: updatedPost.image
        } : post
      )
    );
    setShowEditModal(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="container mt-5">
      {/* Profile Section */}
      <Card className="mb-4">
        <Card.Body>
          {/* Profile Header Section */}
          <div className="d-flex align-items-center mb-4">
            <img
              src={user.picture}
              alt="User"
              className="rounded-circle me-3"
              style={{ width: "100px", height: "100px" }}
            />
            <h3 className="mb-0">
              {user.username}{" "}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  handleEditProfile("username", prompt("Edit Username", user.username))
                }
              >
                ✏️
              </Button>
            </h3>
          </div>

          {/* User Info Section */}
          <div className="border-top pt-3">
            <h5 className="mb-3">User Information</h5>
            <div className="ms-2">
              <p className="mb-2">
                <strong>Phone:</strong> {user.phone}{" "}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    handleEditProfile("phone", prompt("Edit Phone", user.phone))
                  }
                >
                  ✏️
                </Button>
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {user.location}{" "}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    handleEditProfile("location", prompt("Edit Location", user.location))
                  }
                >
                  ✏️
                </Button>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Posts Section */}
      <h3 className="mb-4">My Posts</h3>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <Card>
              <Card.Header className="bg-white">
                <div className="d-flex align-items-center">
                  <img
                    src={post.userAvatar}
                    alt="User"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="fw-bold">{post.username}</span>
                </div>
              </Card.Header>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={post.image} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => {
                      setCurrentPost(post);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Edit Post Modal */}
      {currentPost && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="editPostTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentPost.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editPostContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={currentPost.content}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, content: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editPostImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currentPost.image}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, image: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEditPost(currentPost.id, currentPost)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
