const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle GET request for profile edit
app.get('/user/:id/edit', (req, res) => {
    res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML" class="p-3 border rounded">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea class="form-control" id="bio" name="bio">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <button type="button" hx-get="/" class="btn btn-secondary">Cancel</button>
        </form>58
    `);
});

// Handle PUT request for editing profile
app.put('/user/:id', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;

    res.send(`
        <div class="card" style="width: 18rem;"
            hx-target="this"
            hx-swap="outerHTML"
        >
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    ${bio}
                </p>
                <button href="#" class="btn btn-primary"
                    hx-get="/user/1/edit">
                    Click To Edit
                </button>
            </div>
        </div>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

