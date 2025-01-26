import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  Container,
  Badge,
} from "reactstrap";
import { FaTrash, FaSort, FaEdit, FaSave } from "react-icons/fa";

const InventoryTable = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 15, isEditing: false },
    { id: 2, name: "Notebook", category: "Stationery", quantity: 8, isEditing: false },
    { id: 3, name: "Mouse", category: "Electronics", quantity: 5, isEditing: false },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  const uniqueCategories = [...new Set(items.map((item) => item.category))];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      alert("Please fill in all fields!");
      return;
    }
    setItems([
      ...items,
      { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity), isEditing: false },
    ]);
    setNewItem({ name: "", category: "", quantity: "" });
  };

 
  const toggleEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const saveEdit = (id, updatedItem) => {
    if (!updatedItem.name || !updatedItem.category || isNaN(updatedItem.quantity)) {
      alert("Invalid input. Please check your values.");
      return;
    }
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updatedItem, isEditing: false } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSort = () => {
    const sortedItems = [...items].sort((a, b) =>
      sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
    );
    setItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items;

  return (
    <Container style={{ marginTop: "30px" }}>
      <h1 className="text-center mb-5">Inventory Management</h1>

    
      <Row className="mb-4">
        <Col sm="3">
          <Input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Col>
        <Col sm="3">
          <Input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, category: e.target.value }))
            }
          />
        </Col>
        <Col sm="3">
          <Input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, quantity: e.target.value }))
            }
          />
        </Col>
        <Col sm="3">
          <Button color="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Col>
      </Row>

    
      <Row className="mb-3">
        <Col sm="6">
          <FormGroup>
            <Label for="categoryFilter">Filter by Category</Label>
            <Input
              id="categoryFilter"
              type="select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col sm="6" className="d-flex align-items-end">
          <Button color="info" onClick={handleSort}>
            Sort by Quantity <FaSort />
          </Button>
        </Col>
      </Row>

    
      <Table bordered hover responsive className="table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? "table-danger" : ""}
            >
              <td>
                {item.isEditing ? (
                  <Input
                    type="text"
                    defaultValue={item.name}
                    onChange={(e) =>
                      (item.name = e.target.value)
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {item.isEditing ? (
                  <Input
                    type="text"
                    defaultValue={item.category}
                    onChange={(e) =>
                      (item.category = e.target.value)
                    }
                  />
                ) : (
                  item.category
                )}
              </td>
              <td>
                {item.isEditing ? (
                  <Input
                    type="number"
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      (item.quantity = parseInt(e.target.value))
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {item.isEditing ? (
                  <Button
                    color="success"
                    size="sm"
                    onClick={() =>
                      saveEdit(item.id, item)
                    }
                  >
                    <FaSave />
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => toggleEdit(item.id)}
                  >
                    <FaEdit />
                  </Button>
                )}
                <Button
                  color="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    
      <div className="text-center mt-3">
        <Badge color="danger">Low Stock (Quantity Below 10)</Badge>
      </div>
    </Container>
  );
};

export default InventoryTable;
