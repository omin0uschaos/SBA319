import express from 'express';
import Songs from '../models/songsSchema.mjs';
import Playlists from '../models/playlistsSchema.mjs'
const router = express.Router();

router.get('/api', async (req, res) => {
    try {
      const allSongs = await Songs.find({});
      res.json(allSongs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  });

  router.get('/add', (req, res)=>{
    const options = {
        title: "MoodAMP",
        subTitle: `Add New Song`,
        content: `
            <form action="/songs/add" method="post">
                <input type="text" name="title" placeholder="Song Title" id="song-title" required>
                <input type="text" name="artist" placeholder="Artist" id="song-artist" required>
                <input type="number" name="duration" min="0" placeholder="Song Duration(Seconds)" id="song-duration" required>
                <select name="mood" id="song-mood" required>
                    <option value="">Choose Mood</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Energetic">Energetic</option>
                    <option value="Chill">Chill</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Melancholic">Melancholic</option>
                    <option value="Motivational">Motivational</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Angry">Angry</option>
                    <option value="Hopeful">Hopeful</option>
                    <option value="Nostalgic">Nostalgic</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Excited">Excited</option>
                    <option value="Dreamy">Dreamy</option>
                    <option value="Reflective">Reflective</option>
                </select>
                <input type="url" name="link" id="song-link" placeholder="Youtube URL(Include Http(s):" required>
                <input type="submit" value="Submit">
            </form> `
    };
    res.render("index", options);
})

router.post('/add', async (req, res) => {
    try {
        const { title, artist, duration, mood, link } = req.body;
        // Create and save the new song
        const newSong = new Songs({ title, artist, duration, mood, link });
        await newSong.save();

        // Find playlists with a matching mood and update them
        const playlistsToUpdate = await Playlists.find({ mood: mood });
        const updatePromises = playlistsToUpdate.map(async (playlist) => {
            playlist.songIDs.push(newSong._id); // Add the new song's _id
            return playlist.save(); // Save the updated playlist
        });
        await Promise.all(updatePromises); // Wait for all updates to complete

        // Prepare options for the response rendering
        const options = {
            title: "MoodAMP",
            subTitle: `Song Added Successfully`,
            content: `<h1>Song Added Successfully</h1>`
        };

        // Render response with success message
        res.render('index', options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding the song');
    }
});

router.get('/edit', async (req, res) => {
    try {
        const allSongs = await Songs.find({});
        let contentHtml = '<ul>';

        allSongs.forEach(song => {
            contentHtml += `<li><a href="/songs/edit/${song._id}">${song.artist} - ${song.title}</a> - <button onclick="confirmDelete('${song._id}')" style="background-color:red; color:white; cursor:pointer;">DELETE</button></li>`;
        });

        contentHtml += '</ul>';
        contentHtml += `
            <script>
            function confirmDelete(songId) {
                const isConfirmed = window.prompt('Type "delete" to confirm:');
                if (isConfirmed.toLowerCase() === 'delete') {
                    fetch('/songs/delete/' + songId, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            window.location.href = '/songs/edit'; // Redirect to the edit page
                        } else {
                            alert('Error deleting song');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }
            }
            </script>`

        const options = {
            title: "MoodAMP",
            subTitle: `Choose a song to edit`,
            content: contentHtml
        };

        res.render("index", options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching songs');
    }
});


router.get('/edit/:songId', async (req, res) => {
    try {
        const songId = req.params.songId;
        const song = await Songs.findById(songId);
        if (!song) {
            return res.status(404).send('Song not found');
        }

        // Define all possible moods
        const moods = ["Happy", "Sad", "Energetic", "Chill", "Romantic", "Melancholic", "Motivational", "Relaxed", "Angry", "Hopeful", "Nostalgic", "Peaceful", "Excited", "Dreamy", "Reflective"];

        const moodOptions = moods.map(mood => {
            return `<option value="${mood}"${mood === song.mood ? ' selected' : ''}>${mood}</option>`;
        }).join('\n');

        const options = {
            title: "MoodAMP - Edit Song",
            subTitle: `Editing ${song.title}`,
            content: `
                <form action="/songs/update/${songId}?_method=PATCH" method="POST">

                    <input type="text" name="title" value="${song.title}" placeholder="Song Title" id="song-title" required>
                    <input type="text" name="artist" value="${song.artist}" placeholder="Artist" id="song-artist" required>
                    <input type="number" name="duration" value="${song.duration}" min="0" placeholder="Song Duration(Seconds)" id="song-duration" required>
                    <select name="mood" id="song-mood" required>
                        <option value="">Choose Mood</option>
                        ${moodOptions}
                    </select>
                    <input type="url" name="link" value="${song.link}" id="song-link" placeholder="Youtube URL(Include Http(s):" required>
                    <input type="hidden" name="_method" value="PUT">
                    <input type="submit" value="Update">
                </form>
            `
        };

        res.render('index', options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching song');
    }
});


router.patch('/update/:songId', async (req, res) => {
    try {
        const { title, artist, duration, mood, link } = req.body;
        const songId = req.params.songId;

        // Update the song
        const updatedSong = await Songs.findByIdAndUpdate(songId, { title, artist, duration, mood, link }, { new: true });
        if (!updatedSong) {
            return res.status(404).send('Song not found');
        }

        // Remove the song from all playlists where it no longer matches the mood
        await Playlists.updateMany(
            { songIDs: songId },
            { $pull: { songIDs: songId } }
        );

        // Add the song to playlists that match its new mood
        const matchingPlaylists = await Playlists.find({ mood: mood });
        const updatePlaylistPromises = matchingPlaylists.map(async playlist => {
            if (!playlist.songIDs.includes(songId)) {
                playlist.songIDs.push(songId); // Add the song's ID if it doesn't already exist
            }
            return playlist.save();
        });
        await Promise.all(updatePlaylistPromises);

        res.redirect('/songs/edit');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating song');
    }
});

router.delete('/delete/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        
        // Delete the song from the Songs collection
        await Songs.findByIdAndDelete(songId);

        //remove the song from all Playlists' songIDs arrays
        await Playlists.updateMany({}, { $pull: { songIDs: songId } });

        res.status(200).send('Song deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting song');
    }
});
//test validation rules route
router.get('/validationtest', async (req, res) => {
    const invalidSong = {
        title: "Invalid Song Title",
        artist: "Invalid Artist",
        duration: -10, 
        mood: "Invalid Mood",
        link: "http://invalidlink.com"
    };

    try {
        await Songs.create(invalidSong);
        res.send("Validation Test Passed");
    } catch (error) {
        console.error("Validation Error:", error);
        res.status(400).send("Validation Test Failed: " + error.message);
    }
});




export default router;