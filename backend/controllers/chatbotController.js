// AI Chatbot Controller - Optimized with quick responses
const Trip = require('../models/Trip');

const quickResponses = {
  greeting: "Hello! Welcome to MakeMyDestiny! 🌍\n\nI can help you with:\n1️⃣ View Destinations\n2️⃣ Booking Process\n3️⃣ Cancellation Policy\n4️⃣ Pricing Info\n5️⃣ Jharkhand Places\n6️⃣ Group Discounts\n\nJust type the number or ask your question!",
  
  booking: "📅 How to Book a Trip:\n\n1️⃣ Browse trips on our website\n2️⃣ Select your destination\n3️⃣ Choose number of seats\n4️⃣ Fill traveller details\n5️⃣ Confirm booking\n\nNeed help with a specific destination?",
  
  cancel: "❌ Cancellation Policy:\n\n✅ Free cancellation up to 48 hours before travel\n✅ Full refund within 5-7 business days\n✅ No questions asked\n\nTo cancel: Go to 'My Bookings' → Select booking → Click 'Cancel'",
  
  price: "💰 Our Pricing:\n\n🏔️ Hill Stations: ₹8,000 - ₹15,000\n🏖️ Beach Destinations: ₹10,000 - ₹25,000\n🙏 Religious Places: ₹5,000 - ₹12,000\n🏛️ Heritage Sites: ₹7,000 - ₹18,000\n\nPrices include transport, accommodation & meals!\nCheck our trips page for exact pricing.",
  
  jharkhand: "🏔️ Jharkhand Destinations:\n\n1️⃣ Netarhat - Hill Station Queen (₹8,500)\n2️⃣ Baidyanath Dham, Deoghar (₹6,000)\n3️⃣ Hundru Falls, Ranchi (₹5,500)\n4️⃣ Betla National Park (₹9,000)\n5️⃣ Tagore Hill, Ranchi (₹5,000)\n6️⃣ Parasnath Hills (₹7,500)\n\nWhich one interests you?",
  
  destinations: "🗺️ Popular Destinations:\n\n1️⃣ Manali, Himachal (₹15,000)\n2️⃣ Goa Beaches (₹12,000)\n3️⃣ Kerala Backwaters (₹18,000)\n4️⃣ Varanasi (₹8,000)\n5️⃣ Jaipur, Rajasthan (₹10,000)\n6️⃣ Darjeeling (₹11,000)\n\nType the number to know more!",
  
  discount: "🎫 Group Discounts:\n\n✅ 10-15 people: 10% OFF\n✅ 16-25 people: 15% OFF\n✅ 25+ people: 20% OFF\n\nContact us for custom group packages!\n📞 +91 9523176285",
  
  contact: "📞 Contact Us:\n\n📧 Email: mdsahilansari831@gmail.com\n📱 Phone: +91 9523176285\n📍 Location: Ranchi, Jharkhand\n🕐 Hours: Mon-Sat, 9AM-6PM\n\nWe're here to help! 😊",
  
  help: "🤖 I'm your Travel Assistant!\n\nQuick Commands:\n1️⃣ - View all destinations\n2️⃣ - How to book\n3️⃣ - Cancellation policy\n4️⃣ - Pricing information\n5️⃣ - Jharkhand places\n6️⃣ - Group discounts\n\nOr just ask me anything about travel!",
  
  default: "I'm here to help! Try:\n\n• Type 1-6 for quick info\n• Ask about destinations\n• Inquire about bookings\n• Check prices\n• Learn about cancellations\n\nWhat would you like to know?"
};

const detectIntent = (message) => {
  const msg = message.toLowerCase();
  
  // Number commands
  if (msg.match(/^[1-6]$/)) {
    const commands = ['destinations', 'booking', 'cancel', 'price', 'jharkhand', 'discount'];
    return commands[parseInt(msg) - 1];
  }
  
  // Keywords
  if (msg.match(/hi|hello|hey|namaste|good morning|good evening/)) return 'greeting';
  if (msg.match(/book|booking|reserve|reservation|how to book/)) return 'booking';
  if (msg.match(/cancel|cancellation|refund/)) return 'cancel';
  if (msg.match(/price|cost|fare|rate|how much/)) return 'price';
  if (msg.match(/jharkhand|ranchi|netarhat|deoghar|betla/)) return 'jharkhand';
  if (msg.match(/destination|place|location|where|show|available trips/)) return 'destinations';
  if (msg.match(/discount|group|offer/)) return 'discount';
  if (msg.match(/contact|phone|email|call/)) return 'contact';
  if (msg.match(/help|assist|support/)) return 'help';
  
  return 'default';
};

// @desc    Chat with AI bot
// @route   POST /api/chatbot
// @access  Public
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: 'Please provide a message' });
    }

    const intent = detectIntent(message);
    let response = quickResponses[intent] || quickResponses.default;

    // Dynamic responses
    if (message.toLowerCase().includes('how many')) {
      try {
        const count = await Trip.countDocuments({ isActive: true });
        response = `We currently have ${count} amazing trips available! 🎉\n\nType '1' to see all destinations!`;
      } catch (error) {
        response = quickResponses.destinations;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        userMessage: message,
        botResponse: response,
        intent,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, something went wrong. Please try again.' 
    });
  }
};

// @desc    Get chatbot FAQs
// @route   GET /api/chatbot/faqs
// @access  Public
exports.getFAQs = async (req, res) => {
  try {
    const faqs = [
      {
        question: "How do I book a trip?",
        answer: "Browse trips, select destination, choose seats, fill details, and confirm booking."
      },
      {
        question: "What is the cancellation policy?",
        answer: "Free cancellation up to 48 hours before travel. Full refund within 5-7 days."
      },
      {
        question: "Which places in Jharkhand do you cover?",
        answer: "Netarhat, Deoghar, Betla National Park, Hundru Falls, Ranchi, and more!"
      },
      {
        question: "Are group discounts available?",
        answer: "Yes! Groups of 10+ get 10-20% discount based on size."
      },
      {
        question: "What's included in the package?",
        answer: "Transportation, accommodation, meals, and guided tours."
      }
    ];

    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
