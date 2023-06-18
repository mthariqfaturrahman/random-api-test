app.post('/register', (req, res) => {
  const { email, password, fullname, gaji, alamat, nomor } = req.body;

  if (!email || !password || !fullname || !gaji || !alamat || !nomor) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const id = nanoid(10);

  const newData = {
    id,
    email,
    password,
    fullname,
    gaji,
    alamat,
    nomor
  };

  data.push(newData);
  res.json(newData);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = data.find(user => user.email === email);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else if (user.password !== password) {
    res.status(401).json({ error: 'Invalid password' });
  } else {
    res.json({ id: user.id });
  }
});

app.get('/user', (req, res) => {
  const users = data.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  res.json(users);
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { email, password, fullname, gaji, alamat, nomor } = req.body;
  const user = data.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  user.email = email || user.email;
  user.password = password || user.password;
  user.fullname = fullname || user.fullname;
  user.gaji = gaji || user.gaji;
  user.alamat = alamat || user.alamat;
  user.nomor = nomor || user.nomor;

  res.json(user);
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = data.findIndex(user => user.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const deletedUser = data.splice(index, 1);
  res.json(deletedUser[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
