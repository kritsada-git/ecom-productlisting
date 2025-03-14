export const getUsers = (req, res) => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ];
    res.json(users);
  };
  
  export const getUserById = (req, res) => {
    const { id } = req.params;
    res.json({ id, name: `User ${id}` });
  };
  