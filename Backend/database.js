import mongoose from 'mongoose'
 const mongodbUri = 'mongodb+srv://huzaifa:0nzNBXppf69J9in2@lms.fdumy.mongodb.net/?retryWrites=true&w=majority&appName=LMS'


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(mongodbUri , {
            dbName : "todo-db"
        });

        console.log(`\n🌿 MongoDB connected ! 🍃\n`);

        mongoose.connection.on(
            "error",
            console.error.bind(console, "Connection error:"),
        );

        process.on("SIGINT", () => {
            // Cleanup code
            mongoose.connection.close();

            console.log("Mongoose connection closed due to application termination");
            process.exit(0);
        });
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1); // Exited with error
    }
};

connectDB()