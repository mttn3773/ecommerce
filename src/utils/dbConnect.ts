import { connect, models } from "mongoose";

const connection: {
  isConnected?: number;
} = {};

export const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("CONNECTION ALREADY EXISTS");
    return;
  }
  console.log("CONNECTING TO DATABASE");

  const db = await connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected ? "CONNECTED" : "SOMETHING WENT WRONG");
};
