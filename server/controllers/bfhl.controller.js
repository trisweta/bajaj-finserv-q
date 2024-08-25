import User from "../models/user.model.js";
export const handlePostRequest = async (req, res) => {
    const { data, full_name, dob, email, roll_number } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }
    try {
        const user = new User({ full_name, dob, email, roll_number });
        await user.save();
        const response = processRequest(data, user);
        res.json(response);
    } catch (err) {
        console.error("Error saving user:", err.message);
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
};

export const handleGetRequest = (req, res) => {
    res.json({ operation_code: 1 });
};

const processRequest = (data, user) => {
    const numbers = data.filter(item => !isNaN(item)).map(Number);
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop();

    return {
        is_success: true,
        user_id: `${user.full_name.toLowerCase().replace(/ /g, "_")}_${user.dob}`,
        email: user.email,
        roll_number: user.roll_number,
        numbers: numbers.map(String),
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
};
