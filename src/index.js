import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
}).on("error", (error) => {
    throw new Error(error.message);
});


