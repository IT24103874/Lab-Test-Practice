import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  const fetchItems = async () => {
    try {
      const res = await axios.get('https://lab-test-practice-1.onrender.com/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lab-test-practice-1.onrender.com/api/items', formData);
      fetchItems(); // Refresh the list
      setFormData({
        name: '',
        price: '',
        description: ''
      });
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  const handleDelete = async (id) => {
    // TODO (Student): Implement the delete functionality here
    // Hint: Use axios.delete() and then call fetchItems()
    try {
        await axios.delete('https://lab-test-practice-1.onrender.com/api/items/$id');
        fetchItems();
    } catch (err){
        console.error("Cannot delete item with ID: ${id}");
    }
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>

      <div className="form-section">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
                      <label>description:</label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

          {/* TODO (Student): Add input fields for 'description' and 'category' here */}

          <button type="submit" className="btn-primary">Add Item</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Items List</h2>
        {items.length === 0 ? (
          <p>No items found. Add some!</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item._id} className="item-card">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  {/* TODO (Student): Display 'description' and 'category' here */}
                </div>
                <div className="item-actions">
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
