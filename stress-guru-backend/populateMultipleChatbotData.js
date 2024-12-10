require("dotenv").config({ path: "./db.env" });
const mongoose = require("mongoose");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define ChatbotData Schema and Model
const chatbotDataSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: { type: Object, required: true }
});

const ChatbotData = mongoose.model("ChatbotData", chatbotDataSchema);

// JSON Data to Insert
const chatbot_data = {
  type: "chatbot_data",
  data: {
    greetings: [
      "Hi! How are you feeling today?",
      "Hey! It's good to chat with you. How's your day going?",
      "Hello! Let's talk a bit. How are things?"
    ],
    greeting_reactions: {
      good: ["That's great to hear!", "Awesome! I'm glad to hear that.", "Fantastic! What made your day good?"],
      okay: ["I see. Sometimes okay is just fine too.", "Thanks for sharing. If you need to talk, I'm here.", "Got it. It's okay to feel neutral sometimes."],
      bad: ["I'm sorry to hear that. Want to talk about it?", "That sounds tough. I'm here if you need someone to listen.", "I'm here for you. You're not alone."]
    },
    small_talk: [
      { text: "That's interesting!", weight: 5 },
      { text: "I see. Go on...", weight: 3 },
      { text: "Thanks for sharing that!", weight: 4 },
      { text: "I'm listening. Take your time.", weight: 2 },
      { text: "You can take your time. I'm here for you.", weight: 1 }
    ],
    exit_prompts: [
      "Do you want to continue, or would you prefer to stop for now?",
      "Would you like to keep going, or should we wrap things up?",
      "Are you ready to move on, or do you need a break?"
    ]
  }
};

const dass_data = {
  type: "dass_data",
  data: {
    questions: [
      "Do you ever find it hard to wind down?",
      "Have you noticed your mouth feeling dry lately?",
      "Do you sometimes struggle to feel any positive emotions?",
      "Have you experienced breathing difficulties, like rapid breathing, even when you're not exerting yourself?",
      "Is it hard for you to find the motivation to get things done?",
      "Do you feel like you overreact to certain situations?",
      "Have you noticed your hands trembling or shaking?",
      "Do you feel like you're burning through a lot of nervous energy?",
      "Do you worry about situations where you might panic or feel embarrassed?",
      "Do you ever feel like there's nothing to look forward to?",
      "Do you find yourself getting easily agitated?",
      "Is it tough for you to relax?",
      "Do you often feel down or low?",
      "Do delays or interruptions easily frustrate you?",
      "Have you felt close to panic recently?",
      "Is it hard for you to feel excited or enthusiastic about things?",
      "Do you sometimes feel like you're not worth much?",
      "Do you feel especially sensitive or touchy lately?",
      "Have you noticed your heart beating fast even when you haven't been physically active?",
      "Do you ever feel scared for no apparent reason?",
      "Have you been feeling like life doesn't have much meaning?"
    ],
    categories: [
      "S", "A", "D", "A", "D", "S", "A", "S", "A", "D",
      "S", "S", "D", "S", "A", "D", "D", "S", "A", "A", "D"
    ]
  }
};

// Insert Both JSON Documents
Promise.all([
  ChatbotData.create(chatbot_data),
  ChatbotData.create(dass_data)
])
  .then(() => {
    console.log("Chatbot data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting chatbot data:", error);
    mongoose.connection.close();
  });
