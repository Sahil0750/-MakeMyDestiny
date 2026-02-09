// AI Chatbot Controller - Rule-based with intents
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

const intents = {
  greeting: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'],
  booking: ['book', 'booking', 'reserve', 'reservation', 'ticket'],
  cancel: ['cancel', 'cancellation', 'refund'],
  help: ['help', 'support', 'assist'],
  price: ['price', 'cost', 'fare', 'rate'],
  destination: ['destination', 'place', 'location', 'where'],
  jharkhand: ['jharkhand', 'ranchi', 'jamshedpur', 'deoghar', 'netarhat']
};

const responses = {
  greeting: "Hello! Welcome to MakeMyDestiny Travel Agency! 🌍 How can I help you today? You can ask me about:\n- Available destinations\n- Booking process\n- Cancellation policy\n- Prices and packages\n- Jharkhand tourist places",
  
  booking: "To book a trip:\n1. Browse available trips on our website\n2. Select your destination\n3. Choose number of seats\n4. Fill traveller details\n5. Confirm booking\n\nNeed help with a specific destination?",
  
  cancel: "To cancel your booking:\n1. Go to 'My Bookings'\n2. Select the booking you want to cancel\n3. Click 'Cancel Booking'\n4. Refund will be processed within 5-7 business days\n\nNote: Cancellation is free up to 48 hours before travel date.",
  
  help: "I'm here to help! You can ask me about:\n✈️ Available destinations\n💰 Pricing information\n📅 Booking process\n❌ Cancellation policy\n🏔️ Popular tourist places in Jharkhand and India",
  
  price: "Our trip prices vary based on:\n- Destination\n- Duration\n- Season\n- Package inclusions\n\nPrices typically range from ₹5,000 to ₹50,000 per person. Check our trips page for specific pricing!",
  
  jharkhand: "Popular Jharkhand destinations we offer:\n🏔️ Netarhat - Hill Station Queen\n🙏 Baidyanath Dham, Deoghar - Religious\n💧 Hundru Falls, Ranchi\n🦌 Betla National Park\n🏛️ Tagore Hill, Ranchi\n⛰️ Parasnath Hills\n🌊 Jonha Falls\n\nWould you like to know more about any specific place?",
  
  default: "I'm not sure I understand. Could you please rephrase? You can ask me about bookings, destinations, prices, or cancellations. Type 'help' for more options."
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

    const lowerMessage = message.toLowerCase();
    let response = responses.default;
    let intent = 'default';

    // Intent detection
    for (const [key, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        response = responses[key];
        intent = key;
        break;
      }
    }

    // Context-aware responses
    if (lowerMessage.includes('how many') || lowerMessage.includes('available trips')) {
      const count = await Trip.countDocuments({ isActive: true });
      response = `We currently have ${count} amazing trips available across India! Would you like to see them?`;
    }

    if (lowerMessage.includes('popular') || lowerMessage.includes('best')) {
      response = "Our most popular destinations:\n🏔️ Manali, Himachal Pradesh\n🏖️ Goa Beaches\n🙏 Varanasi, Uttar Pradesh\n🏰 Jaipur, Rajasthan\n⛰️ Darjeeling, West Bengal\n🌴 Kerala Backwaters\n🏔️ Netarhat, Jharkhand\n\nWhich one interests you?";
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
    res.status(500).json({ success: false, message: error.message });
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
        answer: "Yes! Groups of 10+ get 15% discount. Contact support for details."
      },
      {
        question: "What's included in the package?",
        answer: "Transportation, accommodation, meals, and guided tours. Check specific trip details."
      }
    ];

    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
