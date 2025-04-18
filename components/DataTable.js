import React, { useState } from 'react';

function DataTable({ data, onEdit, onDelete }) {
  const [editedRow, setEditedRow] = useState(null);

  const handleEdit = (row) => {
    setEditedRow(row); // Set the row to edit
  };

  const handleDelete = (row) => {
    onDelete(row); // Call the delete function passed as a prop
  };

  const handleSave = () => {
    if (editedRow) {
      onEdit(editedRow); // Call the edit function passed as a prop
      setEditedRow(null); // Reset the editing state
    }
  };

  const handleChange = (e, field) => {
    setEditedRow({
      ...editedRow,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Date</th>
            <th>Client Direction</th>
            <th>Volume</th>
            <th>Vintage</th>
            <th>Technology</th>
            <th>Country</th>
            <th>Price</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                {editedRow?.clientName === row.clientName ? (
                  <input
                    type="text"
                    value={editedRow.clientName}
                    onChange={(e) => handleChange(e, 'clientName')}
                  />
                ) : (
                  row.clientName
                )}
              </td>
              <td>
                {editedRow?.date === row.date ? (
                  <input
                    type="text"
                    value={editedRow.date}
                    onChange={(e) => handleChange(e, 'date')}
                  />
                ) : (
                  row.date
                )}
              </td>
              <td>
                {editedRow?.clientDirection === row.clientDirection ? (
                  <input
                    type="text"
                    value={editedRow.clientDirection}
                    onChange={(e) => handleChange(e, 'clientDirection')}
                  />
                ) : (
                  row.clientDirection
                )}
              </td>
              <td>
                {editedRow?.volume === row.volume ? (
                  <input
                    type="number"
                    value={editedRow.volume}
                    onChange={(e) => handleChange(e, 'volume')}
                  />
                ) : (
                  row.volume
                )}
              </td>
              <td>
                {editedRow?.vintage === row.vintage ? (
                  <input
                    type="text"
                    value={editedRow.vintage}
                    onChange={(e) => handleChange(e, 'vintage')}
                  />
                ) : (
                  row.vintage
                )}
              </td>
              <td>
                {editedRow?.technology === row.technology ? (
                  <input
                    type="text"
                    value={editedRow.technology}
                    onChange={(e) => handleChange(e, 'technology')}
                  />
                ) : (
                  row.technology
                )}
              </td>
              <td>
                {editedRow?.country === row.country ? (
                  <input
                    type="text"
                    value={editedRow.country}
                    onChange={(e) => handleChange(e, 'country')}
                  />
                ) : (
                  row.country
                )}
              </td>
              <td>
                {editedRow?.price === row.price ? (
                  <input
                    type="number"
                    value={editedRow.price}
                    onChange={(e) => handleChange(e, 'price')}
                  />
                ) : (
                  row.price
                )}
              </td>
              <td>
                {editedRow?.comments === row.comments ? (
                  <input
                    type="text"
                    value={editedRow.comments}
                    onChange={(e) => handleChange(e, 'comments')}
                  />
                ) : (
                  row.comments
                )}
              </td>
              <td>
                {editedRow?.clientName === row.clientName ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
